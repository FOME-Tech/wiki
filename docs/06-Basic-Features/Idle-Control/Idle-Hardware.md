# Idle Control Hardware

The idle controller works out an idle position from 0 to 100 %. These settings tell the ECU what kind of idle air valve you have and how to drive it, so that position turns into airflow. FOME supports PWM solenoid valves (one or two coils), stepper motor valves and electronic throttle idle.

Settings are under **Idle > Idle hardware**. The dialog notes that an ECU reboot is needed to apply them. How the position itself is worked out is covered in [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings).

## How it works

The same idle position goes to every idle actuator that's configured:

- **Solenoid valve**: the position is the PWM duty cycle. 0 % is off and 100 % is fully on.
- **Stepper valve**: the position is a fraction of **Stepper total steps**. 0 % is the parked end of the valve's travel, and 100 % is the full number of steps from it.
- **Electronic throttle**: the position opens the throttle by up to **Electronic throttle idle range**.

The **Idle: Position** log channel shows the position being sent. For a stepper, **Idle: Stepper target position** shows the target in steps.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Use Stepper | - | The idle valve is a stepper motor. Off means a PWM solenoid valve |
| Double Solenoid Mode | - | The solenoid valve has separate opening and closing coils. Hidden when **Use Stepper** is on |
| Electronic throttle idle range | % | Throttle opening at 100 % idle position. Only shown when an H-bridge is set up as a throttle |

The **Idle Valve Hardware** panel below these has a **Solenoid** section and a **Stepper** section. Only the fields for the selected valve type are active.

### Solenoid

| Setting | Units | Description |
| --- | --- | --- |
| Idle Solenoid Primary output | - | Output pin for the valve, or its opening coil in double solenoid mode |
| Idle Solenoid Secondary output | - | Output pin for the closing coil. Only used in double solenoid mode |
| Idle Solenoid output(s) Mode | - | Output mode for both solenoid outputs: default, inverted, or open collector |
| Idle Solenoid Frequency | Hz | PWM frequency for the solenoid outputs |

### Stepper

| Setting | Units | Description |
| --- | --- | --- |
| Drive stepper with dual H bridges | - | Drive the stepper's two coils from two H-bridges |
| Drive stepper with PushPull outputs | - | Drive the stepper's coils directly from four outputs. Hidden when dual H-bridges are selected |
| Stepper reaction time | ms | Pause for each step. Minimum 1 ms |
| Stepper total steps | count | Number of steps from the parked position to 100 % |
| Stepper parking extra steps, % | % | Extra steps to drive past the end when parking, as a % of **Stepper total steps** |
| Force parking every restart | - | Park the stepper every time the ECU starts, not only when its position is unknown |

The pin settings below these depend on how the stepper is driven. See [Stepper driver hardware](#stepper-driver-hardware).

## Solenoid valves

A solenoid idle valve opens further the higher its PWM duty cycle. A single-coil valve has one coil, normally with 12 V on one pin and the ECU output switching the other to ground. Leave **Double Solenoid Mode** off and set **Idle Solenoid Primary output**.

Some valves, often fitted to Subaru, BMW and some Mazda engines, have two coils: one pulls the valve open, the other pulls it closed, and with neither powered it sits part way open. Turn on **Double Solenoid Mode** and set both outputs. The ECU drives the two coils in opposition. At 50 % both get 50 % duty. At 100 % the opening coil gets nearly full duty and the closing coil nearly none. Neither output goes fully to 0 or 100 %, they stay between 1 % and 99 %. If **Double Solenoid Mode** is on without a secondary output, the ECU raises a configuration error.

A solenoid valve is switched off whenever the engine isn't turning, to save power and keep it quiet. The **Idle Air Valve** button under **Bench test** overrides this for 3 seconds, at the position the idle controller is currently asking for (with the engine stopped, that's the cranking position).

### Idle Solenoid Frequency

Use the frequency the factory ECU used if you know it, or the valve maker's figure. Too low a frequency can make the valve buzz or flutter instead of holding a steady position.

## Stepper valves

A stepper valve moves a fixed amount for each step the ECU sends. The ECU has no way of reading the valve's position, so it counts the steps it has made and remembers the position between restarts.

### Parking

If the ECU doesn't have a valid stored position, it parks the valve when it starts: it drives the valve **Stepper total steps** plus **Stepper parking extra steps, %** towards position 0, so it's sure to have reached the end stop, then counts from there. The extra steps make up for any steps an old motor misses. It also parks:

- every time it starts, if **Force parking every restart** is on,
- if the accelerator (or TPS) is pressed more than 90 % when the ECU starts with the engine stopped. Use this to re-park a valve that has lost its position.

After parking, the valve moves to the cranking position (see [Cranking IAC](/Basic-Features/Cranking-Control/Cranking-IAC)), so it's ready before you crank.

### Stepper total steps

Set this to the number of steps from fully closed to fully open (or from the parked end to the useful end of the travel). If it's too small, the valve can never fully open. If it's too large, most of the idle position range is past the end of the valve's travel. The position only moves the stepper when it changes by at least one step.

### Stepper reaction time

How long the ECU pauses for each step. A step/direction driver holds the step pin high for this long and then low for this long. If it's too short, the motor misses steps and loses track of its position. If it's too long, the valve is slow to respond. Start with the value from the valve's data or the factory ECU if you have it, and check that the valve still returns to the same place after a lot of movement.

### Stepper driver hardware

**Stepper controller (step/direction driver)**: used when neither **Drive stepper with dual H bridges** nor **Drive stepper with PushPull outputs** is on. A separate stepper driver chip makes the coil currents, and the ECU sends it step and direction signals.

| Setting | Units | Description |
| --- | --- | --- |
| Idle Stepper Step Pin | - | Output for step pulses |
| Idle Stepper Dir Pin | - | Output for direction. High (in default mode) moves towards 100 % |
| Idle Stepper Dir Pin Mode | - | Output mode for the direction pin. Inverting it reverses the valve |
| Idle Stepper Enable Pin | - | Optional driver enable output. Active low in default mode. It enables the driver only while a step is being made |
| Idle Stepper Enable Pin Mode | - | Output mode for the enable pin |
| Minimum stepper voltage | V | The stepper isn't moved while battery voltage is below this. Applies to every stepper driver type, though it's only shown here |

**Dual H-bridge**: with **Drive stepper with dual H bridges** on, each of the stepper's two coils is driven by its own H-bridge.

| Setting | Units | Description |
| --- | --- | --- |
| Inverted driver pins | - | For H-bridge chips with inverted inputs. This also applies to the electronic throttle H-bridges |
| No1 Direction #1, No1 Direction #2, No1 Disable | - | Pins for the H-bridge driving the first coil |
| No2 Direction #1, No2 Direction #2, No2 Disable | - | Pins for the H-bridge driving the second coil |
| Stepping Mode | - | Full step, half step, 1/4 or 1/8 micro-stepping |
| Min. Duty Cycle | % | Coil drive while the stepper is holding still, to limit current. Micro-stepping only |
| Max. Duty Cycle | % | Coil drive while stepping, to limit current. Micro-stepping only |

The H-bridges use the **PWM Frequency** from the electronic throttle settings. For micro-stepping, make sure it's high enough. In full-step mode the coils are always fully driven, both while stepping and while holding, and the duty cycle limits don't apply.

:::note
TunerStudio only shows the pins for each bridge while the matching **H-Bridge #1 function** or **H-Bridge #2 function** in the electronic throttle settings isn't **None**.
:::

**Push-pull outputs**: with **Drive stepper with PushPull outputs** on, the stepper's coils are driven directly from four ECU outputs, set as **Stepper A+**, **Stepper A-**, **Stepper B+** and **Stepper B-**. Each coil is driven by a pair of outputs, and these also use the electronic throttle **PWM Frequency**.

If the valve moves the wrong way, with less air as the position goes up, reverse it: swap the two wires of one coil, or invert the direction pin on a step/direction driver.

## Electronic throttle idle

With an electronic throttle, no separate idle valve is needed. The throttle itself is opened slightly to control idle air. **Electronic throttle idle range** sets how far: at 100 % idle position the throttle opens by this much. The pedal target table is squeezed into the range above it, so 0 % pedal gives the idle opening and 100 % pedal still gives 100 %.

Set it so that a warm engine idles well below 100 % idle position, leaving room for a cold idle and the A/C and fan adders. With the torque model enabled, the throttle is controlled differently and this range isn't used. The same setting appears as **ETB idle maximum angle** in the electronic throttle settings. See [ETB Idle](/Advanced-Features/ETB/ETB-Idle) and [ETB Pedal Target](/Advanced-Features/ETB/ETB-Pedal-Target).

## Setup

1. Pick the valve type: **Use Stepper** for a stepper, otherwise a solenoid. Turn on **Double Solenoid Mode** for a two-coil valve.
2. Set the output pins from your board's pinout, and the frequency or stepper settings.
3. Burn and reboot the ECU.
4. With the engine off, check the valve moves. For a solenoid, use the **Idle Air Valve** bench test and listen for it. For a stepper, watch or listen for it parking at power-up.
5. Start the engine and change **Open loop base position**. RPM should rise when it goes up and fall when it goes down.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Solenoid never moves, even on the bench test | Wrong output pin, wrong output mode, or no 12 V feed to the valve |
| Configuration error mentioning the second idle pin | **Double Solenoid Mode** on without **Idle Solenoid Secondary output** set |
| Stepper doesn't move at all | Wrong pins, battery below **Minimum stepper voltage**, or the H-bridge pins hidden and never set |
| Idle gets more air as the position goes down | Stepper direction reversed. Swap one coil's wires or invert the direction pin |
| Stepper idle drifts higher or lower over time, or after a lot of movement | Missed steps. Increase **Stepper reaction time** and park the valve again |
| Stepper idle is wrong after the ECU loses power | Stored position lost or wrong. Hold the pedal down at power-up to park it, or turn on **Force parking every restart** |
| Valve buzzes or the idle is unsteady at a fixed position | Solenoid frequency unsuitable for the valve |

## Related

- [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings)
- [Cranking IAC](/Basic-Features/Cranking-Control/Cranking-IAC)
- [ETB Idle](/Advanced-Features/ETB/ETB-Idle)
- [Electronic Throttle Settings](/Advanced-Features/ETB/ETB-settings)
- [Bench Test](/Basic-Features/Bench-Test)

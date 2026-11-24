# Electronic Throttle Body

An electronic throttle body (ETB, drive-by-wire) replaces the throttle cable with a DC motor. FOME reads the accelerator pedal, works out where the throttle should be, and drives the motor through an H-bridge until the throttle position sensors agree with that target. The throttle also takes over the job of the idle valve. FOME can run two throttles, for engines with a throttle body per bank.

Settings are under **Advanced > Electronic throttle body**. This page covers the hardware, the main dialog and what the ECU does when something goes wrong. The rest of the setup is on the pages listed under [Setup](#setup).

## How it works

The throttle is updated 500 times a second. On every update, for each throttle:

1. **Target.** The pedal position is looked up in the [pedal target](/Advanced-Features/ETB/ETB-Pedal-Target) table, then adjusted for idle, Lua, the [ETB #2 trim](/Advanced-Features/ETB/ETB-2-Trim) and the ETB rev limiter, and held between **Minimum ETB position** and **Maximum ETB position**.
2. **Feed-forward.** The [bias curve](/Advanced-Features/ETB/ETB-Bias-Table) gives the duty needed to hold the throttle at the target against its return spring.
3. **Closed loop.** The [PID](/Advanced-Features/ETB/ETB-PID) corrects for the difference between the target and the measured throttle position.
4. **Output.** The feed-forward and PID outputs are added. Positive duty opens the throttle and negative duty closes it. The result is limited to 90 % in either direction, then corrected for battery voltage (relative to 14 V), so the motor gets the same drive whatever the charging voltage.

Both throttles share the pedal table, the bias curve and the PID gains. Throttle 2 follows its own position sensor (TPS 2) and gets the ETB #2 trim on top.

### H-bridge functions

The ECU has two H-bridge channels for DC motors. Each one is given a function:

| Function | What the bridge drives |
| --- | --- |
| None | Nothing. The ECU doesn't touch the bridge's pins, so a Lua script can drive them directly |
| Throttle 1 | The main throttle, measured by TPS 1 |
| Throttle 2 | A second throttle on a twin-throttle engine, measured by TPS 2 |
| Wastegate | An electric wastegate actuator. It has its own PID and settings, see [Boost Control](/Basic-Features/Boost-Control) |

There is no DC idle valve function. Use the throttle itself for idle (see [ETB Idle](/Advanced-Features/ETB/ETB-Idle)), or, for a separate idle stepper driven from H-bridges, see [Idle Hardware](/Basic-Features/Idle-Control/Idle-Hardware).

A throttle function only starts if an accelerator pedal is configured, and both the throttle and the pedal have two sensor tracks. See [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS) and [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP).

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Disable ETB if engine is stopped | - | Turn the throttle motor off while the engine isn't turning |
| Disable ETB Motor | - | Never drive the throttle motors. For testing the sensors |
| H-Bridge #1 function, H-Bridge #2 function | - | What each H-bridge drives (see above). Restart the ECU after changing |
| PWM Frequency | Hz | PWM frequency of the H-bridges. Restart the ECU after changing |
| Minimum ETB position | % | Lowest target the throttle is ever sent to |
| Maximum ETB position | % | Highest target the throttle is ever sent to |
| Jam detection error max | % | Position error that starts the jam timer. 0 turns jam detection off |
| Jam detection timeout period | sec | How long the error has to last before the throttle counts as jammed. 0 turns jam detection off |
| Temporarily disable jam detection | - | Button. Keeps the throttle working after a jam until the next power cycle |
| Two-wire mode | - | H-bridge control scheme (see below). Restart the ECU after changing |
| No1 / No2 Direction #1, Direction #2, Control, Disable | - | ECU pins for each H-bridge |

The right-hand side of the dialog has the **ETB Idle**, **PID settings** and **PID Autotune** panels. They appear once a bridge is set to a throttle function, and are covered on [ETB Idle](/Advanced-Features/ETB/ETB-Idle) and [ETB PID](/Advanced-Features/ETB/ETB-PID).

On boards with built-in H-bridges, the pins are set for you and the pin fields are hidden.

### Two-wire mode and the H-bridge pins

This must match the H-bridge chip:

- **Off** (for example VNH2SP30, or a TLE9201 driven by PWM and direction): **Control** carries the PWM, and **Direction #1** and **Direction #2** are switched on or off to set which way the motor turns. A driver with a single direction input uses **Direction #1** only.
- **On** (for example TLE7209): **Direction #1** and **Direction #2** carry the PWM, one to open and one to close, and **Control** is a plain enable.

**Disable** is optional. It is driven high whenever the motor is switched off, and low while the throttle is being controlled.

Some H-bridges invert their inputs. **Inverted driver pins** applies to the throttle bridges too, but TunerStudio only shows it in the idle stepper settings, when the stepper is driven from H-bridges.

### PWM Frequency

Values below 100 Hz are raised to 100 Hz, and the maximum is 3000 Hz. The same frequency is used by an idle stepper driven from H-bridges. If you aren't sure, keep your board's default.

### Minimum and maximum position

**Minimum ETB position** keeps the target just off the throttle's closed stop, so the motor doesn't keep driving the plate into it. **Maximum ETB position** is for throttles that can travel past fully open. The target is limited by both, whatever the pedal table, idle, Lua or trim ask for.

### Disable ETB if engine is stopped

With this on, the motor is off until the ECU sees the crank turning, and the throttle sits at its spring rest position. This saves power and stops motor whine with the key on. It also stops the pedal moving the throttle with the engine off, and **PID autotune** can't run while it's on. Auto calibrate still works.

### Disable ETB Motor

This stops the ECU driving the throttle motors at all, so you can move the throttle by hand and check the sensors. It doesn't affect an electric wastegate. **Auto calibrate** still moves the throttle while it's on.

## Setup

1. Wire the throttle motor to the H-bridge outputs and the two position sensors to analog inputs. Check your board's pinout. On boards without built-in H-bridges, set the pins and **Two-wire mode**.
2. Set **H-Bridge #1 function** to **Throttle 1** (and **H-Bridge #2 function** to **Throttle 2** for a second throttle). Burn and restart the ECU.
3. Set up the [accelerator pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP), with both tracks.
4. Set up and calibrate the [throttle position sensors](/Advanced-Features/ETB/ETB-TPS). If your throttle's second sensor only covers part of the range, see [Redundant Sensors](/Advanced-Features/ETB/Redundant-Sensors).
5. Check the direction: with the engine off, press the pedal gently. The throttle should open and **Throttle position** should go up.
6. Set the [bias curve](/Advanced-Features/ETB/ETB-Bias-Table), then tune the [PID](/Advanced-Features/ETB/ETB-PID), starting with autotune.
7. Shape the [pedal target](/Advanced-Features/ETB/ETB-Pedal-Target) table.
8. Set the [idle range](/Advanced-Features/ETB/ETB-Idle).
9. Leave jam detection on.

:::warning
Keep your fingers away from the throttle plate whenever the ignition is on. Auto calibrate and autotune move the throttle with no warning, and with the engine off the throttle follows the pedal.
:::

## Checking it works

Watch the **ETB: position target**, **Throttle position**, **ETB: position error** and **ETB: Duty** gauges. In logs, the channels are **ETB 1: Target**, **TPS**, **ETB 1: Error** (target minus measured position) and **ETB 1: Duty cycle**, plus **ETB 1: Feed forward**. The second throttle's channels start with **ETB 2:**, and its position is **TPS2**.

- With the pedal held steady, the throttle position should sit within a percent or so of the target.
- After a quick pedal movement, the error should go back to near zero quickly, without the throttle oscillating.
- The duty shouldn't be pinned at its limit while the throttle is holding position.
- The **ETB 1 OK** indicator shows why a throttle isn't being driven, for example **engine stopped** when **Disable ETB if engine is stopped** is in effect.

## If it fails

In most faults the ECU stops driving the motor, and the throttle's return spring pulls it to its rest position, which on most throttles is slightly open.

| Condition | What the ECU does |
| --- | --- |
| Throttle position sensor failed: a track out of range, or the two tracks disagree | The motor is switched off. Control resumes as soon as the sensor reads correctly again. The **TPS error** (or **TPS 2 error**) indicator comes on and a code is set (see [Fault Codes](/Limits-And-Protections/Fault-Codes)). Only the affected throttle stops |
| Pedal failed | The throttle keeps running with the pedal read as 0 %, so it goes to the idle position. See [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP) |
| Throttle jammed: the position error stays above **Jam detection error max** for **Jam detection timeout period**, with the ignition on | Both throttle motors are switched off, and fuel is cut above 1500 RPM. Both last until the ECU is restarted |
| **Disable ETB if engine is stopped** on, and the engine isn't turning | The motor is switched off. The indicator shows **engine stopped** |
| A Lua script disables the throttle | The motor is switched off. The indicator shows **Lua** |
| Throttle configured without a second TPS track, or without a second pedal track | Fatal configuration error at startup. The throttle isn't driven |
| Pedal configured, but no H-bridge set to a throttle function | Fatal configuration error at startup |
| No pedal configured | The throttle functions aren't started |
| No primary sensor set for a throttle | That throttle isn't started, and its indicator shows **TPS error**. If that leaves no throttle running while a pedal is configured, you get the fatal error above |
| Any fatal error at startup | The throttle isn't driven at all |

The ECU also counts how often each sensor drops out (**ETB 1: TPS error counter**, **ETB 1: Pedal error counter**). Intermittent faults don't shut the throttle down by themselves. Each drop-out is handled as above, and control carries on once the sensor is back.

### Jam detection

A jam is hard to spot after the event. The throttle simply stops responding, the **ETB 1 OK** indicator doesn't change, and **ETB 1: Jam detected** is only set for an instant. Above 1500 RPM, the fuel cut reason shows **fault RPM limit**. **ETB 1: Jam timer** shows how long the current error has lasted.

An electric wastegate on one of the H-bridges is watched by the same jam detection, with the same thresholds, and a wastegate jam has the same effect on the throttle and the RPM limit.

Anything that stops the throttle reaching its target with the ignition on counts as a jam, including holding the throttle plate by hand, a target the throttle can't physically reach, or very poor PID tuning. While testing, the **Temporarily disable jam detection** button keeps the throttle working even after a jam, until the next power cycle. Jams are still detected while it's on, and the 1500 RPM fuel limit still applies.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Throttle never moves, no errors | **Disable ETB Motor** on, **Disable ETB if engine is stopped** on with the engine off, no pedal configured, or the wrong H-bridge pins |
| Fatal error at startup about the throttle or pedal needing to be redundant | Second TPS or pedal track not configured |
| Fatal error about a pedal configured without electronic throttles | Neither H-bridge is set to a throttle function |
| Throttle drives the wrong way, or slams open | Motor wired backwards, or the TPS calibration reversed. See [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS) |
| Throttle stops working while driving, and the engine won't rev past 1500 RPM | Jam detected. Fix the cause and restart the ECU |
| Throttle stops working while driving and **TPS error** is on | TPS fault or tracks disagreeing |
| Throttle buzzes or oscillates | PID gains too high, or bias curve wrong near the rest position |
| Throttle whines with the key on | Normal PWM noise. **Disable ETB if engine is stopped** turns it off |

## Related

- [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS)
- [Redundant Sensors](/Advanced-Features/ETB/Redundant-Sensors)
- [ETB Bias Curve](/Advanced-Features/ETB/ETB-Bias-Table)
- [ETB PID and Autotune](/Advanced-Features/ETB/ETB-PID)
- [ETB Pedal Target](/Advanced-Features/ETB/ETB-Pedal-Target)
- [ETB Idle](/Advanced-Features/ETB/ETB-Idle)
- [ETB #2 Trim](/Advanced-Features/ETB/ETB-2-Trim)
- [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP)
- [RPM Limit](/Limits-And-Protections/RPM-Limit) (ETB soft rev limiter)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

# Variable Cam Timing (VVT)

FOME can drive the oil control solenoid of a cam phaser to hold each cam at a target position set by RPM and load. It controls up to four cams: intake and exhaust on two banks. FOME measures the cam positions with the cam sensors set up on [Cam Sync](/Base-Engine/Trigger/Cam-Sync), and that has to be working before VVT control can do anything.

Settings are under **Advanced > VVT outputs and PID**. The targets are in **Advanced > VVT intake target** and **VVT exhaust target**, and the hold duty curves in **VVT intake hold duty** and **VVT exhaust hold duty**. The intake menus, including **VVT outputs and PID**, appear once **Cam trigger type (intake)** is set on the trigger page, and the exhaust menus once **Cam trigger type (exhaust)** is set.

## How it works

For each cam that has a solenoid pin, FOME continuously:

1. Looks up the **target** in that cam's target table, from RPM and load. Load is the fuel load (MAP for speed density, TPS for alpha-N) unless you choose a different axis. The target uses the same scale as the **VVT** position gauges: degrees from the cam's rest position, with positive meaning advanced.
2. Reads the measured cam **position**.
3. Works out the solenoid **duty** as the sum of:
   - the **hold duty curve** value at the current oil temperature, and
   - the PID output: the **Hold duty** setting plus the P, I and D terms acting on the difference between target and position, limited to **PID min** and **PID max**.
4. Corrects that duty for battery voltage by multiplying it by 14 V divided by the battery voltage (taken as at least 10 V and at most 24 V). The duties you enter are therefore the duties needed at 14 V, and FOME raises them when the battery voltage is lower.
5. Limits the result to **Output min** and **Output max**, and sends it to the solenoid.

The hold duty is the duty at which the solenoid's spool valve is centred, so the cam stays where it is. Above it the cam moves one way, below it the other way. With a good hold duty the PID only has to make small corrections.

The control direction setting tells FOME which way the cam moves when duty increases. With **advance**, more duty makes the reading rise. With **retard**, more duty makes it fall, and the targets for that cam must be negative.

As a rule, **intake cams advance and exhaust cams retard**. A phaser moves its cam away from the rest position, which is fully retarded for an intake cam and fully advanced for an exhaust cam. So set the intake direction to **advance** with positive targets, and the exhaust direction to **retard** with negative targets. A few engines are the other way round. If a cam runs to one end and stays there, the direction is probably set wrong (see [Troubleshooting](#troubleshooting)).

### Rest position

When the target is close to the rest position, FOME doesn't control the cam at all. It switches the solenoid off and lets the phaser sit at its stop. This stops the integral term winding up while it pushes the cam against the stop, and avoids trouble with the lock pin that many phasers have at rest.

For an **advance** cam, control switches on when the target rises above 3° and off again when it falls below 1°. For a **retard** cam the thresholds are -3° and -1°. So a 0 in the target table means "leave the cam at rest". On an **advance** cam, any negative target also means rest.

### When control is active

The solenoid is held at 0 % and the PID reset unless all of these are true:

- The engine is running: it has passed the cranking RPM since it started.
- **Activation Delay** has passed since the engine started.
- RPM is above **Do not control below RPM**.
- Coolant temperature is above **Do not control below CLT**.
- The cam has a valid position.
- The target is away from the rest position, as above.

Once the activation delay has passed, the target ramps from 0 up to the table value over 2 seconds, so the cam moves smoothly after a start.

### Banks

Bank 2 shares bank 1's settings for the same cam: the target table, the PID, the hold duty, the control direction and the output limits. Only the solenoid pin and the measured position are separate. All four outputs run at the same **PWM frequency**.

### Switched (on/off) cams

VVT control is for continuously variable phasers. FOME has no on/off VVT mode for cams that switch between two positions, such as two-position phasers or VTEC-style cam changeover. Drive those from a [GPPWM](/Basic-Features/GPPWM) channel in on-off mode (PWM frequency 0), with its table set by RPM and load and its on and off thresholds giving some hysteresis. For more complex logic, use [Lua](/Advanced-Features/Lua-Scripting).

## Settings

### VVT outputs and PID: Configuration

| Setting | Units | Description |
| --- | --- | --- |
| Activation Delay | ms | Time after the engine starts before VVT control begins, to let oil pressure build |
| Do not control below RPM | RPM | VVT control stays off at or below this RPM |
| Do not control below CLT | C | VVT control stays off at or below this coolant temperature |
| VVT solenoid bank 1 intake, bank 1 exhaust, bank 2 intake, bank 2 exhaust | - | Output pin for each cam's solenoid. Power-cycle the ECU after changing |
| PWM frequency | Hz | PWM frequency for all VVT solenoids. Power-cycle the ECU after changing |
| VVT solenoid intake cams control direction | - | **advance** or **retard**: which way the intake cams move as duty increases. Usually **advance** |
| VVT solenoid exhaust cams control direction | - | The same for the exhaust cams. Usually **retard**, with negative targets |
| Intake target Y axis override (set Zero for no override) | - | Load axis for the intake target table. **Zero** uses fuel load |
| Exhaust target Y axis override (set Zero for no override) | - | The same for the exhaust target table |
| Target bump amount | deg | Degrees added to the target for 2 seconds by the bump buttons (see below) |

### Intake PID and Exhaust PID

The intake PID is used for both intake cams, and the exhaust PID for both exhaust cams.

| Setting | Units | Description |
| --- | --- | --- |
| Hold duty | % | Fixed duty added inside the PID (see below) |
| P factor | - | Proportional gain, in % duty per degree of error |
| I factor | - | Integral gain, in % duty per degree of error per second |
| D factor | - | Derivative gain, in % duty per degree per second of change in error |
| Iterm min, Iterm max | % | Limits on the integral term |
| PID min, PID max | % | Limits on the PID output, which includes **Hold duty** |
| Output min, Output max | % | Limits on the final solenoid duty, applied after the hold duty curve and battery correction |

### Target tables and hold duty curves

| Setting | Units | Description |
| --- | --- | --- |
| VVT intake target, VVT exhaust target | deg | 8 x 8 tables of cam target by RPM and load, in whole degrees from rest |
| VVT intake hold duty, VVT exhaust hold duty | C / % | Duty added to the PID output, by oil temperature |

### Hold duty setting and curve

There are two places to put the hold duty, and they add together. The **Hold duty** setting is a fixed value inside the PID, so **PID min** and **PID max** limit it together with the P, I and D terms. The hold duty curve is added after the PID limits, and varies with oil temperature. Oil gets thinner as it warms, so the hold duty often changes with temperature.

Use one of them and leave the other at 0:

- **Hold duty setting only.** Leave the curve at 0. **PID min** and **PID max** then limit the total duty, for example 0 and 100.
- **Curve only.** Set **Hold duty** to 0 and fill in the curve. **PID min** and **PID max** then limit how far the PID can move away from the hold duty, for example -30 and 30.

The curve uses the oil temperature sensor if you have one, otherwise coolant temperature. Its axis is labelled CLT and its live marker follows coolant temperature either way.

### Target bump

The **VVT Testing** panel in the configuration dialog has a **VVT target bump** button for each cam. Pressing one adds **Target bump amount** to that cam's target for 2 seconds, which gives a clean step to tune the PID against. It only has an effect while VVT control is active. The amount can be negative, which moves the target the other way. This is useful for exhaust cams that retard.

## Setup

1. **Set the cam offset first.** With no solenoid pin set, VVT control is off and the cam sits at rest. Zero its **VVT offset** as described on [Cam Sync](/Base-Engine/Trigger/Cam-Sync), so that the **VVT** gauge reads about 0 at idle.
2. **Set the outputs.** Choose the solenoid pin for each VVT cam and the **PWM frequency**. Use the factory ECU's frequency if you know it. Most cam solenoids run at a few hundred hertz. Set the control direction: most intake cams are **advance** and most exhaust cams **retard**. Set **Activation Delay** to a few seconds. If cam movement upsets your idle, set **Do not control below RPM** a little above idle speed. Burn, then power-cycle the ECU.
3. **Find the hold duty.** Fill the target table with one value well clear of rest, for example 15° (-15° for a **retard** cam). Set P, I and D to 0, so that only the hold duty drives the solenoid. Make sure **PID min** and **PID max** don't clip the value you're trying. Warm the engine up, hold it above **Do not control below RPM**, and raise the hold duty in small steps while watching the **VVT** gauge. Below the hold duty the cam stays at rest, and well above it the cam runs to the far end of its travel. The hold duty is where the cam moves only slowly. If you use the curve, repeat this at a few oil temperatures.
4. **Tune the PID.** Start with a small P, around 1, and I and D at 0. Use the target bump buttons, or switch the table between two values, and watch position follow target. Raise P until the cam responds quickly without much overshoot. Then add I until it settles on the target instead of short of it, and add a little D if it overshoots. See the [PID tuning guide](/Intro-Start-Here/HT-PID-ETB-And-VVT), and the [Miata VVT](/Vehicle-Specific/Mazda-MX5-Miata/Miata-VVT) page for a worked example.
5. **Fill the targets.** Put 0 wherever you want the cam at rest, typically idle and light load. Fill the rest of the table with the timing that gives the best torque at each RPM and load, ideally found on a dyno. Keep targets within the phaser's mechanical travel.

## Checking it works

For each cam, the gauges are **VVT: bank 1 intake** (position), **VVT: bank 1 intake target** and **VVT: bank 1 intake output**, with matching ones for bank 1 exhaust and bank 2. In logs, the channels are **VVT: bank 1 intake**, **VVT B1I: Target** and **VVT B1I: Output duty**, and similarly for **B1E**, **B2I** and **B2E**. **VVT_B1I_pidState_iTerm** shows the integral term.

- At steady RPM and load, position should sit within a degree or two of target.
- After a target change, position should reach the new target quickly with little overshoot.
- Output duty should settle near the hold duty, with the integral term well inside its limits.
- The target reads 0 while the cam is meant to be at rest, and during the activation delay.

A non-zero target with an output duty of 0 means control is being held off. Check RPM, coolant temperature and the cam position.

## If it fails

- **No valid cam position.** If the engine isn't fully synced, or the cam signal has stopped for more than a second, the solenoid is switched off and the PID reset. The cam returns to rest. The related fault codes are described on [Cam Sync](/Base-Engine/Trigger/Cam-Sync).
- **Failed coolant sensor.** For **Do not control below CLT**, a failed sensor counts as 0 °C, so VVT stays off unless that setting is below 0 °C.
- **No temperature for the hold duty curve.** Without a working oil or coolant temperature sensor, the curve uses its 80 °C value.
- **Failed battery voltage reading.** The battery correction assumes 14 V.
- **Failed Y axis override input.** The target table is read at load 0.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| **VVT outputs and PID** menu missing | **Cam trigger type (intake)** is **Inactive**. This menu only appears once the intake cam type is set |
| Target non-zero but output duty stays 0 | Below **Do not control below RPM** or **Do not control below CLT**, or no valid cam position |
| Target reads 0 although the table has values | Targets under 3° on an **advance** cam, or above -3° on a **retard** cam, are treated as rest |
| Cam runs to one end and stays there, away from target | Control direction set the wrong way |
| Position oscillates around target | P or D too high, or hold duty far from the true value |
| Position settles short of target | I too low, the integral term at its **Iterm** limit, or the duty clipped by the **PID** or **Output** limits |
| Good when warm, slow or overshooting when cold | Hold duty changes with oil temperature. Use the hold duty curve |
| Position not near 0 at rest | **VVT offset** not set. See [Cam Sync](/Base-Engine/Trigger/Cam-Sync) |

## Related

- [Cam Sync](/Base-Engine/Trigger/Cam-Sync)
- [Guide to Tuning the ETB and VVT PIDs](/Intro-Start-Here/HT-PID-ETB-And-VVT)
- [Miata VVT Setup and Tuning](/Vehicle-Specific/Mazda-MX5-Miata/Miata-VVT)
- [General Purpose PWM (GPPWM)](/Basic-Features/GPPWM)
- [Lua Scripting](/Advanced-Features/Lua-Scripting)

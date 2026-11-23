# Closed Loop Fuel Correction

Closed loop fuel correction, also called short term fuel trim (STFT), compares the lambda measured by your wideband with the lambda the ECU is targeting, and trims the fuel to close the gap. It keeps the mixture on target as conditions change, but it is not a substitute for a tuned VE table: it can only correct by a limited amount, and it forgets everything when the ECU powers off. See [Air Fuel Ratio](/Fundamentals-Of-Tuning/AFR) for the theory and [Wideband](/Sensors-And-Gauges/Fuel-Sensors/Wideband) for setting up the sensor.

Settings are under **Fuel > Closed loop fuel correction**.

## How it works

The ECU works out how far lambda is from target, as a fraction: a measured lambda of 1.05 against a target of 1.00 is a 5% lean error. That error is integrated into a trim. While the mixture stays lean, the trim keeps adding fuel, and while it stays rich, the trim keeps removing fuel, at a rate set by **Time const**. The trim multiplies the fuel for every cylinder in that bank.

### Banks

There is one trim per lambda sensor, up to four. Bank 1 uses lambda sensor 1, bank 2 uses sensor 2, and so on. Cylinders are assigned to banks under **Fuel > Cylinder bank selection**. With a single sensor, every cylinder should be in bank 1. Analog wideband inputs provide sensors 1 and 2, and CAN widebands provide up to four.

### Regions

Each bank has four regions. Each region keeps its own trim and has its own **Time const**, **Max add** and **Max remove**. There are no RPM boundaries. The region is picked in this order, and the first match wins:

1. **Idle**: the idle controller considers the engine to be idling. This uses the idle detection thresholds from [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings) and has no setting of its own here. If **Use idle tables for cranking taper** is on, the after-start taper counts as idle too.
2. **Overrun**: fuel load is below **Overrun region load**.
3. **Power**: fuel load is above **Power region load**.
4. **Main**: everything else.

Fuel load is the **Fuel: Load** channel: MAP in kPa with speed density, TPS in % with alpha-N. Both load boundaries have 2 load units of hysteresis. For example, with **Power region load** at 80 kPa, the power region starts above 82 kPa and ends below 78 kPa. If the two load values overlap, overrun wins.

Moving to another region switches to that region's stored trim, so the trim can step when the region changes. That is normal.

### When it corrects

Correction is **disabled**, and no trim is applied, when any of these is true:

- **Enabled** is off.
- The engine is cranking or stopped.
- Less than **Startup delay** has passed since cranking ended.
- Coolant is below **Minimum CLT for correction**, or the CLT sensor has failed.

Correction is **paused** when any of these is true. The trim stops changing, but the value it had reached is still applied:

- The lambda sensor for that bank has no valid reading.
- Measured lambda is below **Minimum lambda for correction** or above **Maximum lambda for correction**.
- DFCO is active, or ended less than **Inhibit closed loop fuel after cut** ago. That setting is in the [DFCO](/Fuel/Fuel-Settings/DFCO) dialog and only shows when DFCO is enabled.
- Any other fuel or spark cut was active in the last 2 seconds, for example the rev limiter, launch control, boost cut, lambda protection or injector duty cut.

There is no separate pause for acceleration enrichment or fast throttle changes. The lambda window is the only thing that keeps transients out, so set it tight enough to reject the excursions your acceleration enrichment causes.

### No long-term trim

FOME has no long-term fuel trim. Trims are not written into the VE table, and they are not saved when you burn. They live in the ECU's memory: they survive a stall or restart while the ECU stays powered, and reset to zero when it powers off. Every fresh key-on starts from your VE table alone. Use the trims as a guide for correcting the VE table, as described in [Checking it works](#checking-it-works).

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Enabled | - | Turns closed loop fuel correction on |
| Startup delay | seconds | Wait after cranking ends before correcting |
| Minimum CLT for correction | C | Below this coolant temperature, correction is disabled |
| Minimum lambda for correction | lambda | Below this measured lambda, correction is paused |
| Maximum lambda for correction | lambda | Above this measured lambda, correction is paused |
| Ignore error magnitude | - | Correct at a constant rate instead of in proportion to the error (see below) |
| Overrun region load | load | Below this fuel load, the overrun region is used |
| Power region load | load | Above this fuel load, the power region is used |
| Time const | sec | Per region. How quickly the trim responds |
| Max add | % | Per region. Most fuel the trim can add |
| Max remove | % | Per region. Most fuel the trim can remove, entered as a negative number |

The last three settings appear in each of the **Main Region**, **Idle Region**, **Power Region** and **Overrun Region** panels.

### Time const

With a steady error, the trim changes by the error divided by **Time const**, every second. A 10% lean error with a 2 second time constant starts the trim adding fuel at 5% per second. As the extra fuel shrinks the error, the trim slows down, and it gets roughly two thirds of the way to the right value in one time constant.

Exhaust takes time to reach the sensor, and longest at idle and low load. If **Time const** is too short for that delay, the trim overshoots and the mixture swings rich and lean. The range is 0.1 to 100 seconds.

### Max add and Max remove

These are percentages of the fuel the ECU calculated. A **Max add** of 10 lets the trim inject up to 10% more fuel than the rest of the fuel model asks for. Neither can go beyond 25%. Set both to 0 to turn correction off in that region.

### Ignore error magnitude

When this is off, the trim moves faster the further lambda is from target. When it is on, only the direction of the error is used: the trim adds or removes fuel at a fixed 10% per **Time const**, so a 5 second time constant moves it 2% per second however large the error is. It never settles, because exactly on target counts as rich, so the trim hunts slightly around the target. It copes better with a noisy signal, but needs a longer time constant than proportional mode. Leave it off with a working wideband.

## Setup

Tune the VE table first, until lambda is within about 5 to 10% of target in steady driving. Closed loop correction is there to tidy up the last few percent, not to make a rough table drivable.

1. Check that **Lambda 1** reads sensibly, and that your target lambda table is what you want.
2. If you have more than one lambda sensor, assign cylinders under **Fuel > Cylinder bank selection**.
3. Set **Startup delay** to around 30 s with an analog wideband. A CAN wideband reports when it is ready, so a shorter delay is fine.
4. Set **Minimum CLT for correction** near normal running temperature, for example 60 to 70 °C, so the trim doesn't hide warm-up enrichment errors.
5. Set the lambda window to cover every target in your table with some margin, for example 0.7 to 1.2.
6. For a typical naturally aspirated engine on speed density, start with **Overrun region load** around 30 kPa and **Power region load** around 80 kPa. Check against your logs: overrun should sit below your cruise MAP, and power should only catch heavy throttle.
7. Set each region from the starting values below.
8. Turn on **Enabled**, burn, and drive.
9. Once the VE table is corrected, reduce **Max add** and **Max remove** to around 5% so a sensor fault can't move the mixture far.

| Region | Time const | Max add | Max remove |
| --- | --- | --- | --- |
| Main | 2 to 3 s | 10% | -10% |
| Idle | 5 s | 10% | -10% |
| Power | 2 s | 10% | 0 to -3% |
| Overrun | any | 0 | 0 |

:::warning
Keep **Max remove** small in the power region. A wideband that reads rich, for example a failing sensor, makes the trim pull fuel exactly where a lean mixture can damage the engine. Adding fuel is the safe direction. Consider setting up [Lambda Protection](/Limits-And-Protections/Lambda-Protection) as well.
:::

:::tip
Lambda readings on overrun are often unreliable, because exhaust flow is low and fuel may be cutting in and out. Leaving the overrun region at 0 and 0 is a good start. Turn it on later if your logs show it is useful.
:::

## Checking it works

Log these channels:

- **Fuel: Trim bank 1** to **Fuel: Trim bank 4**: the trim per bank in %. 0 is no correction, +5 is 5% more fuel. The dashboard gauges for banks 1 and 2 are **Fuel: fuel trim** and **Fuel: fuel trim 2**.
- **fuelClosedLoopBinIdx**: the active region. 0 is idle, 1 overrun, 2 power, 3 main. It only updates while correction is enabled, and holds its last value otherwise.
- **Lambda 1** and **Fuel: target lambda**, plus **RPM** and **Fuel: Load**.
- **Gego**: bank 1's correction as a multiplier in %, where 100 means no correction.

The trims for banks 1 and 2 are also reported over OBD-II as short term fuel trim.

With a good VE table, the trim stays within a few percent and drifts slowly. Signs that it is fighting the VE table:

- **Trim sits at Max add or Max remove.** The VE table is off by more than the limit there, and lambda will be off target too.
- **Trim settles at a steady value in one area.** The VE table is off by about that much. A trim of +6% means VE is about 6% too low there, so raise those cells by about 6%.
- **Trim swings one way at low RPM and the other way at high RPM, all within the main region.** A region holds a single trim, so it is chasing a VE table with the wrong shape. Fix the shape. A shorter time constant only hides it.

TunerStudio's VE Analyze is set up to read bank 1's trim, so it takes the trim into account when suggesting VE changes.

## If it fails

- **Lambda sensor not valid**: correction for that bank pauses, and the trim it had reached stays applied until the sensor recovers or the ECU powers off. A CAN wideband (FOME or AEM X-Series) is invalid while it warms up, when it reports a fault, or when its messages stop arriving. An analog wideband is only rejected if it reads outside 0 to 5 lambda. The ECU can't tell that an analog controller is still warming up, which is why **Startup delay** matters most with analog sensors.
- **CLT sensor failed**: correction is disabled and no trim is applied.
- **TPS failed**: the idle controller treats the engine as not idling, so the idle region is never used. The overrun, main or power region is used instead.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Trim always reads 0 | **Enabled** off, still inside **Startup delay**, coolant below **Minimum CLT for correction**, failed CLT sensor, or both limits set to 0 in that region |
| Trim frozen at a non-zero value | Lambda outside the lambda window, sensor not valid, or a recent DFCO or other cut. The trim holds while paused |
| Mixture oscillates rich and lean at steady speed | **Time const** too short, most often at idle |
| Trim jumps when lifting off or touching the throttle | Normal. Each region has its own trim |
| Trim pinned at its limit | VE table wrong there, or the wideband reads wrong. Check the sensor before raising the limit |
| Idle region never used | TPS failed, or the idle detection thresholds don't match how the engine idles |
| Trims gone after key-off | Expected. There is no long-term trim |

## Related

- [Wideband](/Sensors-And-Gauges/Fuel-Sensors/Wideband)
- [Air Fuel Ratio](/Fundamentals-Of-Tuning/AFR)
- [DFCO](/Fuel/Fuel-Settings/DFCO)
- [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings)
- [Lambda Protection](/Limits-And-Protections/Lambda-Protection)
- [Individual Cylinder Trim](/Fuel/Fuel-Settings/Cylinder-Fuel-Trim)

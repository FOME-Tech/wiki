# MAP Sampling Angle

An engine's intake manifold pressure pulses as each intake valve opens and closes. Reading the sensor at an arbitrary moment gives a number that depends on where the engine happens to be in its cycle, not on the load. FOME avoids this by sampling MAP inside a crank-angle window for each cylinder. This page explains how to place those windows. The sensor itself is covered on the [MAP](/Sensors-And-Gauges/Pressure-Sensors/MAP) page.

Settings are under **Sensors > MAP sampling**, with a few more under **Sensors > MAP sensor**.

## How it works

For each cylinder, FOME opens a window at the **MAP Sampling Start Angle** for that cylinder, collects every valid reading while the window is open, and averages them when it closes. The start angle is measured in crank degrees after each cylinder's top dead centre on its compression stroke, the same zero that ignition timing uses. Each cylinder's window is therefore offset by its position in the firing order, including any odd-fire [cylinder angle offset](/Advanced-Features/Cylinder-Angle-Offset), so the windows follow the firing order. Each average is then passed to the "fast MAP":

- The fast MAP is the lowest of the last few window averages. How many is set by **Cylinder count to sample MAP**.
- Readings outside the sensor's valid range (the MAP low and high thresholds) are left out of the average. If a window ends with no valid readings, it produces no result.
- The window length is limited to between 10 degrees and one cylinder's share of the engine cycle less 10 degrees. Windows therefore never overlap the next cylinder's window, even if the table asks for more.
- The windows are positioned by crank angle, so they move with RPM. The two curves are looked up by RPM, so you can shift the window as the engine's pulsation changes.

Taking the lowest of several windows rejects the pressure peaks and reversion pulses that make the average read high. It also biases the reading slightly low, which is the intended trade.

### Why it matters

- **Individual throttle bodies and low cylinder counts.** There is little plenum volume to smooth the pulses, so a single instant reading depends strongly on timing. A window placed on the intake stroke, with the lowest of one window per cylinder taken, gives a stable load signal.
- **Large plenum, many cylinders.** The pulses are small and the windows matter less, but a badly placed window still adds noise.

### Cylinder balance

Above **MAP cylinder balance min RPM**, each cylinder's window average is corrected by how far that cylinder's average sits from the average of all cylinders. This removes a fixed offset caused by runner differences. The correction is limited to 25 kPa either way, and it is switched off for a moment if the cylinders disagree by more than 50 kPa, for instance during a throttle transient.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| isMapAveragingEnabled | - | Turns the sampling on or off. When off, MAP is always the slow value |
| MAP Sampling Start Angle | deg | Crank degrees after each cylinder's top dead centre at which its window opens, by RPM |
| MAP Sampling Duration | deg | Length of each window in crank degrees, by RPM |
| Measure Map Only In One Cylinder | - | Take one window per engine cycle, at the first cylinder, instead of one per cylinder |
| Cylinder count to sample MAP | count | How many recent windows are compared. The lowest is used |
| MAP cylinder balance min RPM | rpm | Above this speed, the cylinder balance correction is applied |

### Measure Map Only In One Cylinder

With this on, only the window of the first cylinder is used. The cylinder balance correction has nothing to compare against, so don't rely on it in this mode. Leave it off unless you have a reason.

### Cylinder count to sample MAP

Use 1 on a single-throttle engine. On individual throttle bodies, use your number of cylinders so that every cylinder's window is considered. A larger number gives a lower, steadier reading and a slower response.

## Setup

These are starting points. The right values depend on the manifold, cam and cylinder count, so confirm them in a log.

1. Leave **isMapAveragingEnabled** on.
2. Start with a flat start angle curve and a window of roughly 50 degrees at all RPM. A start angle of 100 to 130 degrees, close to the firmware's default curve, is a reasonable first guess. Then use the log comparison below to find where the reading is steadiest.
3. Set **Cylinder count to sample MAP** as described above.
4. Log the engine at a steady part-throttle point, then at several RPM points, and compare as described below.
5. Move the start angle in steps of 10 to 20 degrees. Make the window longer if the reading is noisy and the sample count is low. Make it shorter if the reading looks biased by the window reaching into a different part of the cycle.

## Checking it works

Log **MAP**, mapFast, **Instant MAP** and mapAveragingSamples. The per-cylinder values are in the channels named mapPerCylinder1, mapPerCylinder2 and so on. **MAP** and mapFast are described on the [MAP](/Sensors-And-Gauges/Pressure-Sensors/MAP) page.

- **Instant MAP** is the latest single reading. It shows the pulsation. mapFast should be much steadier than it.
- At a steady throttle and RPM, mapFast should be nearly flat. If it still wobbles from sample to sample, the window is placed badly or is too short.
- mapAveragingSamples is the number of readings in the most recent window. If it's very small at high RPM, the window is too short for that speed.
- On a multi-cylinder engine, the mapPerCylinder channels should be close to each other. Differences of a few kPa are normal. Large differences suggest the windows are landing in different parts of the cycle for different cylinders.
- Repeat at several RPM and load points. The window that works at one RPM may not work at another, which is why both curves are indexed by RPM.

## If it fails

- If **isMapAveragingEnabled** is off, or the engine isn't turning, no fast MAP is produced. After 200 ms, **MAP** uses the slow reading instead. See [MAP](/Sensors-And-Gauges/Pressure-Sensors/MAP) for what that means for fuelling and faults.
- If a window ends with no valid readings, the ECU raises a warning ("No MAP values") and keeps the previous fast value until another window completes.
- The slow MAP is used for the engine-off reading and as a fallback, so it is not affected by these settings.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| MAP noisy at steady throttle and RPM | Window too short, or placed during a pressure peak |
| MAP reads lower than expected, so VE and fuelling need unusual values | **Cylinder count to sample MAP** larger than needed, since the lowest window always wins |
| Fuelling wanders at a steady point, or MAP and fuelling are bumpy at some RPM only | Window position correct at one RPM but not at others. Adjust the curve at the affected RPM |
| mapFast stays at 0 | **isMapAveragingEnabled** is off, or the engine isn't running |
| mapAveragingSamples is 0 or very small | Window too short, or all readings outside the MAP thresholds |

## Related

- [MAP](/Sensors-And-Gauges/Pressure-Sensors/MAP)
- [Barometric Pressure](/Sensors-And-Gauges/Pressure-Sensors/Barometric)
- [Speed Density](/Fuel/Fuel-Algorithms/SD)

# Manifold Absolute Pressure

The manifold absolute pressure (MAP) sensor measures the pressure in the intake manifold. With the speed density fuel algorithm it is the primary load input: fuel is calculated from MAP, RPM and the VE table. It is also used for boost control, boost cut, DFCO and several other features, so get it right before tuning anything else.

Settings are under **Sensors > MAP sensor** and **Sensors > MAP sampling**.

## How it works

A MAP sensor outputs a voltage proportional to absolute pressure. FOME converts the voltage to kPa with a straight line between two calibration points. Most sensors have a preset. If yours doesn't, choose **Custom** and enter two points from the datasheet.

FOME keeps two versions of the reading and combines them into the **MAP** value that everything else uses:

- **Slow MAP** is the ordinary continuous reading of the input.
- **Fast MAP** samples the input many times inside a crank-angle window for each cylinder, averages each window, and keeps the lowest of the last few windows. It only exists while the engine is turning, and only if MAP sampling is enabled.

**MAP** is the fast value whenever there is one, and the slow value otherwise. With the engine stopped you are always reading the slow value. The position and length of the sampling windows are set by the curves under **Sensors > MAP sampling**.

A second MAP sensor can be wired to **MAP 2 ADC input**. It uses the same calibration, and is only available for logging and Lua scripts. Nothing in the engine control uses it.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| MAP ADC input | - | Analog input the sensor is wired to |
| MAP 2 ADC input | - | Optional second sensor, shown once the first input is set. Logging and Lua only |
| MAP type | - | Sensor preset, or **Custom** |
| MAP value low point / MAP voltage low point | kPa / V | First calibration point. Shown for **Custom** only |
| MAP value high point / MAP voltage high value | kPa / V | Second calibration point. Shown for **Custom** only |
| Low value threshold | kPa | A reading below this is treated as a sensor fault |
| High value threshold | kPa | A reading above this is treated as a sensor fault |
| DTC P0107 severity | - | What to do when the reading is below the low threshold (see [Fault Codes](/Limits-And-Protections/Fault-Codes)) |
| DTC P0108 severity | - | What to do when the reading is above the high threshold |
| Measure Map Only In One Cylinder | - | Take one sampling window per engine cycle instead of one per cylinder |
| Cylinder count to sample MAP | count | How many recent windows the fast MAP looks at. The lowest is used |
| MAP cylinder balance min RPM | rpm | Above this speed, each cylinder's window is corrected by how far that cylinder reads from the average of all cylinders |
| isMapAveragingEnabled | - | Turns the fast MAP sampling on or off. When off, MAP is always the slow value |

### Thresholds

The two thresholds define which pressures the ECU believes, not what the sensor is rated for. Set them just outside the real output range of your sensor and engine. A reading outside them counts as a fault, so a high threshold below your peak boost, or a low threshold above your deepest vacuum, will trip on valid readings. The same two thresholds also apply to the baro sensor.

### Cylinder count to sample MAP

Use 1 on a single-throttle engine, and the number of cylinders on individual throttle bodies.

## Setup

1. Set **MAP ADC input** to the pin the sensor is wired to.
2. Choose **MAP type**. If your sensor isn't listed, choose **Custom** and enter two points from its datasheet, one near each end of its range.
3. Set the two thresholds just outside the sensor's range.
4. Leave **isMapAveragingEnabled** on unless you have a reason to turn it off.
5. Burn, then check the reading (below).

## Checking it works

The gauge is **MAP** and the raw input voltage is **Raw MAP**. In logs the channels are **MAP**, **Raw: MAP** and mapFast (the fast value on its own, 0 when there isn't one).

- With the engine off at key-on, MAP should equal the local barometric pressure, around 100 kPa at sea level.
- With the engine running, MAP and mapFast should agree closely. If mapFast stays at 0 while the engine runs, sampling is disabled or isn't producing readings.
- A raw voltage stuck near 0 V or 5 V means a wiring fault, not a calibration problem.

## If it fails

The slow MAP is the one that is checked. It is a fault if the converted reading is below **Low value threshold** (P0107), above **High value threshold** (P0108), or if no reading has arrived for 50 ms (P0106). The code is logged once the fault has persisted for a short time. P0107 and P0108 follow their severity settings, and P0106 is a warning only. The fast MAP is not monitored separately.

**Fast MAP fails, slow MAP is fine.** The fast value stops updating if sampling is off, the engine isn't turning, or no sample in the window is inside the thresholds. After 200 ms it counts as missing and **MAP** quietly uses the slow value. No fault code is set.

**Slow MAP fails, fast MAP is fine.** **MAP** keeps using the fast value, so fuelling carries on, but the fault code is still set. Both come from the same input with the same calibration, so a real wiring fault normally takes out both.

**MAP fails completely, or no MAP input is configured.** **MAP** is invalid, and each feature that uses it does something different:

| Feature | With no valid MAP |
| --- | --- |
| Speed density fuelling | Uses the value from the **MAP estimate table** (RPM against TPS) in place of MAP. A missing TPS reads as 0% for this lookup |
| Alpha-N fuelling | Not affected |
| VE table load axis override set to MAP | Uses 0 kPa |
| Target AFR load axis set to MAP | Uses 200 kPa, so the target goes rich |
| DFCO | Inhibited, if a MAP input is configured |
| Complex wall wetting model | Looks up the MAP-based tau and beta corrections at 60 kPa |
| Boost control | Output goes to the safe duty cycle, in both open loop and closed loop |
| Boost cut | Reads 0 kPa, so it will not cut. Overboost protection is not active |
| Fixed rail pressure injector compensation | Assumes 101.325 kPa |
| Sensed rail pressure compensation (gauge or absolute sensor) | No compensation is calculated |
| General purpose PWM outputs using MAP as an axis | Use their error duty |
| CAN dash and OBD output | Report 0 kPa |

:::warning
With a failed MAP sensor the engine runs on the MAP estimate table, which is only as good as the values in it, and boost cut does not work. Fix MAP faults before boosting the engine.
:::

**Second MAP sensor.** Its faults use the same codes and severity settings as the first sensor. It is never compared with the main MAP, and nothing reacts if the two disagree. It has no fast value, so it is always the slow reading.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 and **Raw MAP** is near 0 V, P0107 | Signal shorted to ground, sensor unpowered, or wrong input channel |
| Reads 0 and **Raw MAP** is near 5 V, P0108 | Signal open circuit or shorted to 5 V |
| Key-on MAP differs from the local barometric pressure by more than a few kPa | Wrong **MAP type** or calibration points |
| Correct at low load, faults at high boost | **High value threshold** below your peak boost, or a sensor with too small a range |
| mapFast stays at 0 | **isMapAveragingEnabled** is off, or the engine isn't running |

## Related

- [Fault Codes](/Limits-And-Protections/Fault-Codes)
- [Barometric Pressure](/Sensors-And-Gauges/Pressure-Sensors/Barometric)
- [Speed Density](/Fuel/Fuel-Algorithms/SD)
- [Boost Control](/Air-Path/Boost-Control)
- [DFCO](/Fuel/Fuel-Settings/DFCO)

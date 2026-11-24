# Oil Pressure

The oil pressure sensor measures engine oil pressure. FOME logs it and sends it over CAN. It is also what the [oil pressure protection](/Limits-And-Protections/Min-Oil-Pressure) uses to cut fuel when pressure is lost, so a working sensor is worth having on any engine you care about.

Settings are under **Sensors > Oil pressure**.

## How it works

The sensor outputs a voltage proportional to pressure. FOME converts the voltage to kPa with a straight line between two calibration points that you enter. The reading is filtered with a 10 Hz low-pass.

The reading is a gauge pressure (zero at atmosphere). A reading down to -5 kPa is accepted so that a sensor sitting at zero with the engine off doesn't register as a fault.

The calibration points can be in either order, so a sensor whose voltage falls as pressure rises works. Check the datasheet for the voltage and pressure at each end of the sensor's range.

The reading is used by:

- The oil pressure protection, covered on its own page.
- The CAN dash and verbose CAN outputs.
- General purpose PWM outputs and Lua scripts, which can read it.
- Logging.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Oil Pressure ADC input | - | Analog input the sensor is wired to. Leave unset if you have no sensor |
| low voltage | volts | Sensor output at the first calibration point |
| low pressure | kPa | Pressure at the first calibration point |
| high voltage | volts | Sensor output at the second calibration point |
| high pressure | kPa | Pressure at the second calibration point |
| DTC P0522 severity | - | What to do when the reading is too low (see [Fault Codes](/Limits-And-Protections/Fault-Codes)) |
| DTC P0523 severity | - | What to do when the reading is too high |

The four calibration fields only show once an input is selected.

## Setup

1. Set **Oil Pressure ADC input** to the pin the sensor is wired to.
2. Enter the two calibration points from the sensor's datasheet. A common 0.5 V to 4.5 V sensor gives 0.5 V at 0 and 4.5 V at its full-scale pressure, for example 0 kPa and 1000 kPa for a 10 bar sensor. Use your own sensor's numbers.
3. Burn, then check the reading (below).
4. Set up the [oil pressure protection](/Limits-And-Protections/Min-Oil-Pressure) once the readings look right.

## Checking it works

The dialog shows **Oil Pressure** (kPa) and **Raw Oil Pressure** (the input voltage). In logs the channels are **Oil Pressure** and **Raw: OilP**.

- With the engine off, oil pressure should read close to 0 kPa.
- At idle on a warm engine you should see a plausible pressure for your engine, rising with RPM. Compare it with a mechanical gauge once.
- A raw voltage stuck near 0 V or 5 V means a wiring fault, not a calibration problem.

## If it fails

The sensor is failed when no reading has arrived for 50 ms (P0521), the converted pressure is below -5 kPa (P0522), or it is above the larger of the two calibration pressures (P0523). A sensor wired to fall with rising pressure swaps the two codes, so the code always describes the input voltage. P0521 is a warning only. P0522 and P0523 follow their severity settings. If no input is selected, nothing is checked.

When the sensor is failed:

| Feature | Behaviour |
| --- | --- |
| Low oil pressure protection (pressure vs RPM table) | Assumes pressure is fine, so it will not cut fuel |
| Minimum pressure after start | Doesn't cut fuel. The check only cuts when a working sensor shows no pressure 5 seconds after the engine starts |
| CAN dash | Reports 0 |
| Verbose CAN | Reports -1 |
| General purpose PWM using oil pressure as an axis | Uses its error duty |
| Lua | The reading is nil |
| **Oil Pressure** gauge and log | Reads 0 |

:::warning
Neither oil pressure protection can act without a working sensor. A dead sensor leaves the engine unprotected, so watch for the sensor's fault codes.
:::

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 and **Raw Oil Pressure** near 0 V, P0522 | Signal shorted to ground, sensor unpowered, or wrong input channel |
| Reads 0 and **Raw Oil Pressure** near 5 V, P0523 | Signal open circuit or shorted to 5 V |
| Pressure reads correctly at idle but faults at high pressure | Calibration pressures are lower than the pressure the engine produces |
| Engine stops 5 seconds after starting | **Minimum pressure after start** set above what the engine makes, or real low oil pressure |
| Reads a constant offset | Calibration points don't match the sensor |

## Related

- [Oil Pressure Protection](/Limits-And-Protections/Min-Oil-Pressure)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

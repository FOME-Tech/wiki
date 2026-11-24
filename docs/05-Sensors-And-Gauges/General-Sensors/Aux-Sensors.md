# Aux Sensors

FOME has four general-purpose linear sensor inputs. Use them for any sensor with a voltage output that is proportional to what it measures (a pressure sensor, a position sensor, a load cell) when FOME has no dedicated input for it. The result can be logged, shown on a gauge, used as an axis of a [General purpose PWM](/Outputs/GPPWM) table, or read from a [Lua script](/Lua/Lua-Scripting).

Settings are under **Sensors > Aux sensors**.

## How it works

Each input reads a voltage and converts it to a value with a straight line through two calibration points: the value the sensor reads at a low voltage, and the value it reads at a high voltage. The ECU doesn't know or care what the value means, so the units are whatever you enter. The sensor's own datasheet gives the two points, for example 0.5 V at 0 and 4.5 V at 1000.

The sensor can be wired backwards (higher voltage for a lower value). Enter the points as the sensor gives them and the line is simply sloped the other way.

## Settings

Each of the four sensors has its own panel with the same fields. Only **ADC input** is shown until you choose an input.

| Setting | Units | Description |
| --- | --- | --- |
| ADC input | - | Analog input the sensor is wired to. Leave unset to disable this sensor |
| Low voltage | volts | Sensor output voltage at the first calibration point |
| Low value | - | Value the sensor reads at the low voltage, in whatever units you want to see |
| High voltage | volts | Sensor output voltage at the second calibration point |
| High value | - | Value the sensor reads at the high voltage |

The same dialog also has the two **auxSpeedSensorInputPin** selectors for frequency inputs, which are separate from the linear sensors described here.

### Output range

The result is limited to between -5 and the larger of **Low value** and **High value**. Anything outside that range is treated as a failed reading rather than clamped, so set the two values to cover the full span of the sensor, not just the range you expect to see. The small negative allowance stops a sensor that reads slightly below zero from failing.

The logged value has a resolution of 0.1 and can't exceed about 3276.7, so choose units that fit. For example, use bar instead of Pa.

## Setup

1. Pick the **ADC input** the sensor is wired to (see your board's pinout).
2. Enter the sensor's two calibration points as voltage and value pairs.
3. Burn, then compare the reading to a known reference (below).

## Checking it works

Each sensor has a gauge and a log channel named **Aux linear 1** to **Aux linear 4**.

- With the sensor at rest or at a known state (for example, a pressure sensor open to atmosphere), the value should match what you expect.
- Move the sensor through its range if you can and check the other end of the scale.

## If it fails

The sensor is treated as failed if no input is selected, if the reading isn't being updated, or if the converted value falls outside the range above, for example from a disconnected or shorted sensor. What happens then:

- The gauge and log channel read 0.
- A General purpose PWM using it as an axis uses its **Duty if error** value.
- A Lua script reading it gets `nil` instead of a number.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 and never changes | No **ADC input** set, sensor unplugged, or a reading outside the allowed range |
| Reads 0 only at the top or bottom of the sensor's travel | **Low value** or **High value** doesn't cover the full sensor range |
| Reads high when it should read low | Voltage and value pairs entered the wrong way round |
| Reading is offset or scaled wrongly | Calibration points don't match the sensor's datasheet |

## Related

- [General purpose PWM](/Outputs/GPPWM)
- [Lua Scripting](/Lua/Lua-Scripting)
- [Aux Temp Sensors](/Sensors-And-Gauges/Temperature-Sensors/Aux-Temp)

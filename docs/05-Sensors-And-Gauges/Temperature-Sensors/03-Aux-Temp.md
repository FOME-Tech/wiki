# Auxiliary Temperature Inputs

FOME has six extra thermistor inputs beyond CLT and IAT: **AuxTemp1**, **AuxTemp2**, oil temperature, fuel temperature, ambient temperature and compressor discharge temperature. They all work like the CLT sensor, so see [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT) for how the three-point calibration and pull-up resistor work. Unlike CLT and IAT they only support a thermistor: there is no linear option.

Each is configured under **Sensors**, in the dialog with the matching name.

## What each one does

| Input | Dialog | Used for |
| --- | --- | --- |
| AuxTemp1 / AuxTemp2 | **AuxTemp1 sensor** / **AuxTemp2 sensor** | Logging and gauges, as a General purpose PWM axis, CAN output, and Lua scripts |
| Oil temperature | **Oil temp sensor** | VVT open-loop hold duty, General purpose PWM axis, CAN and OBD output, DTCs, logging, Lua scripts |
| Fuel temperature | **Fuel temp sensor** | General purpose PWM axis, CAN output, logging, Lua scripts |
| Ambient temperature | **Ambient temp sensor** | CAN output, logging, Lua scripts |
| Compressor discharge temperature | **Compressor discharge temp** | Logging and Lua scripts |

Nothing in the base fuel or ignition tables uses these directly. To act on one, use it as a General purpose PWM axis (see [General Purpose PWM](/Outputs/GPPWM)) or read it from a [Lua script](/Lua/Lua-Scripting).

A flex fuel sensor also reports fuel temperature. If you have one and leave the **Fuel temp sensor** input unset, fuel temperature comes from the flex sensor. If both are fitted, the thermistor input is used.

The **Ambient temp sensor** should sit before any turbocharger or supercharger, near the air filter. The **Compressor discharge temp** sensor goes after the compressor but before the intercooler.

## Settings

Every dialog has the same fields as CLT, minus the linear and DTC options:

| Setting | Units | Description |
| --- | --- | --- |
| Input channel | - | Analog input the sensor is wired to. Leave unset if the sensor isn't fitted |
| Pullup resistor | Ohm | Value of the pull-up resistor on the ECU board |
| Lowest / Middle / Highest temperature | C | Calibration temperatures, in ascending order |
| Resistance @ LT / MT / HT | Ohm | Sensor resistance at each calibration temperature |

The oil temp dialog also has **DTC P0197 severity** and **DTC P0198 severity**, for a shorted or open input (see [Fault Codes](/Limits-And-Protections/Fault-Codes)). The calibration temperatures must be ascending, or the ECU raises a fatal configuration error (P0111) at start-up.

The AuxTemp inputs can also be assigned from the **Aux Temperature #1** and **Aux Temperature #2** fields in the pin assignment dialog.

## Setup

1. Set **Input channel** to the pin the sensor is wired to.
2. Enter the pull-up resistor and three calibration points from the sensor's data.
3. Burn, and compare the reading with a known temperature.

## Checking it works

Gauges and log channels are named after the input, for example **AuxTemp1** and **Oil temp**. Check them against a reference thermometer, or against CLT and IAT on a cold, soaked engine.

## If it fails

For all six inputs, a failed or unconfigured sensor reads 0 in the gauges and logs.

Only the oil temp input raises fault codes (P0196 timeout, P0197 shorted, P0198 open). The others fail silently.

- **Oil temp:** the VVT open-loop hold duty falls back to using CLT, and to 80 °C if CLT has also failed. A General purpose PWM using it as an axis uses its **Duty if error** value.
- **Fuel temp:** a General purpose PWM using it as an axis uses its **Duty if error** value.
- **AuxTemp1, AuxTemp2:** a General purpose PWM using them as an axis uses its **Duty if error** value.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 and won't change | Sensor unplugged, shorted, or wrong input channel |
| Reads sensibly but a few degrees off | Wrong calibration points or pull-up value |
| P0111 critical error at power-up | Calibration temperatures not in ascending order |

## Related

- [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT)
- [Intake Air Temperature](/Sensors-And-Gauges/Temperature-Sensors/IAT)
- [General Purpose PWM](/Outputs/GPPWM)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

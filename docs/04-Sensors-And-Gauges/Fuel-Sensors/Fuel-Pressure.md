# Fuel Pressure

FOME supports two fuel pressure sensors: a low pressure sensor (the normal fuel rail) and a high pressure sensor (the rail of a direct injection engine). Either can be logged and sent over CAN. The low pressure sensor is also the way to correct injector fuelling for changing rail pressure, and the high pressure sensor feeds the high pressure fuel pump control.

Settings are under **Sensors > Fuel pressure**.

## How it works

Each sensor outputs a voltage proportional to pressure. FOME converts the voltage to kPa with a straight line between two calibration points that you enter. The low pressure sensor is filtered with a 10 Hz low-pass, and the high pressure sensor with a 100 Hz low-pass so it can follow pump pulses.

A reading down to -5 kPa is accepted, so that a sensor sitting at zero with the engine off doesn't register as a fault. The calibration points can be in either order.

### Sensor type

**sensor type** says what the pressure reading is measured against, and is needed so the ECU can work out the pressure across the injectors:

- **Absolute**: measured against a vacuum. The ECU subtracts MAP to get the pressure across the injector.
- **Gauge**: measured against the atmosphere. The ECU adds barometric pressure and subtracts MAP.
- **Differential**: the sensor already measures the pressure relative to the intake manifold, so it is used as it is.

It is shown with the low pressure sensor, but applies to whichever sensor is chosen for injector compensation. Only injector compensation reads it.

### What uses the sensors

- **Injector compensation.** With **Injector flow compensation mode** set to sensed rail pressure, the ECU scales the injector flow by the pressure across the injector. **Fuel rail pressure sensor** (Low or High) picks which sensor is used. See [Injector configuration](/Fuel/Injectors/Injector-configuration).
- **High pressure fuel pump control.** The high pressure sensor is the feedback for the pump's pressure control.
- **Logging, CAN and Lua.** The two readings are logged. The low pressure reading goes out on the CAN dash and verbose CAN. The CAN verbose output also sends the high pressure reading. Lua scripts can read both.
- **General purpose PWM.** The low pressure sensor can be an axis.

Nothing else uses the sensors. There are no fuel pressure protections, such as a low pressure fuel cut.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Fuel low pressure ADC input | - | Analog input for the low pressure sensor |
| low voltage / low pressure | volts / kPa | First calibration point |
| high voltage / high pressure | volts / kPa | Second calibration point |
| sensor type | - | Absolute, Gauge or Differential (see above) |
| Fuel high pressure ADC input | - | Analog input for the high pressure sensor |
| low voltage / low pressure | volts / kPa | First calibration point |
| high voltage / high pressure | volts / kPa | Second calibration point |

The calibration fields only show once an input is selected. The first group of calibration fields is the low pressure sensor, and the second is the high pressure sensor. **Fuel rail pressure sensor** and **Injector flow compensation mode** are in the injector dialog, not here.

## Setup

1. Set the ADC input for each sensor you have.
2. Enter the two calibration points from the datasheet. Pressures are in kPa, so a 5 bar sensor reading 0.5 V to 4.5 V is 0 kPa at 0.5 V and 500 kPa at 4.5 V. For a gauge sensor use kPa above atmosphere.
3. Set **sensor type** to match the sensor.
4. To use the sensor for injector compensation, set up the injector dialog as described in [Injector configuration](/Fuel/Injectors/Injector-configuration).

## Checking it works

The dialog shows **Fuel pressure (low)** in kPa, **Fuel pressure (high)** in bar, and the matching raw voltage gauges. In logs the channels are **Fuel pressure (low)**, **Fuel pressure (high)**, **Raw: Fuel press low** and **Raw: Fuel press high**. Note the units differ between the two.

- With the pump off, a gauge sensor should read about 0 kPa.
- With the pump on, the reading should match your regulator or a mechanical gauge.

## If it fails

Neither fuel pressure sensor is monitored, so no DTCs are set and the readings just go invalid. The sensor is invalid if no reading arrives for 50 ms, or if the converted pressure is below -5 kPa or above the larger of the two calibration pressures. Gauges and logs read 0 while it is invalid.

| Feature | With an invalid sensor |
| --- | --- |
| Injector compensation (sensed rail pressure) | No correction is applied. Injectors are treated as flowing at their rated value. If no sensor is configured at all, a warning is also raised |
| Injector compensation with gauge or absolute sensor | Also uncorrected if MAP is invalid |
| Injector compensation | Also uncorrected if the calculated pressure across the injector is zero or negative |
| High pressure fuel pump control | No pressure feedback correction is applied |
| General purpose PWM using fuel pressure as an axis | Uses its error duty |
| CAN dash | Reports 0 |
| Lua | The reading is nil |

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 constantly | No input selected, sensor unplugged or unpowered |
| Constant offset equal to atmospheric pressure | **sensor type** doesn't match the sensor |
| Fuelling wrong at high boost with sensed rail pressure | Wrong **sensor type**, or the wrong sensor chosen as **Fuel rail pressure sensor** |
| Reads 0 at high pressure | The highest calibration pressure is lower than the pressure the pump makes |

## Related

- [Injector configuration](/Fuel/Injectors/Injector-configuration)
- [Manifold Absolute Pressure](/Sensors-And-Gauges/Pressure-Sensors/MAP)

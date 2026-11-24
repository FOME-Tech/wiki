# Barometric Pressure

The barometric (baro) sensor measures atmospheric pressure. FOME uses it to correct fuelling for altitude and weather, and as the reference for a few other calculations. It is optional: without it, FOME assumes a standard atmosphere where it needs a number and applies no fuel correction.

Settings are under **Sensors > Baro sensor**. The correction table is under **Fuel > Barometric pressure correction**.

## How it works

There are three ways to get a baro value:

- **An analog sensor** on **Baro ADC input**, converted to kPa the same way as the [MAP sensor](/Sensors-And-Gauges/Pressure-Sensors/MAP). It uses the same presets and the same fault thresholds.
- **An onboard LPS2x chip**, on boards that have one. Set **LPS2x Baro SCL** and **LPS2x Baro SDA** to its pins. It is only used if no analog baro input is set.
- **Use fixed baro corr from MAP**: the ECU takes the first valid MAP reading after power-up and uses it as the baro value until the next restart, replacing the value from any baro sensor. The reading is only taken if the engine isn't turning, and is only used if it is between 60 and 110 kPa. Otherwise a warning is logged, and baro comes from any fitted baro sensor or falls back to a standard atmosphere. Switch the ignition on and wait a moment before cranking, so that the manifold is at atmospheric pressure when the reading is taken.

The baro value is shown on the **Barometric pressure** gauge (log channel baroPressure). The **Barometric pressure correction** table gives a fuel multiplier for the current baro pressure and RPM, shown on the **Fuel: Barometric pressure mult** gauge. The multiplier is applied to the fuel calculation with every fuel algorithm. See [Barometric Pressure Compensation](/Fuel/Fuel-Settings/Barometric-Pressure-Compensation) for when to use it.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Baro ADC input | - | Analog input for an external baro sensor |
| Type | - | Sensor preset, or **Custom** |
| Low Value / High Value | kPa | Calibration points for **Custom**. Their voltages are the MAP sensor's custom voltage points. Not used by the onboard chip |
| LPS2x Baro SCL / LPS2x Baro SDA | - | Pins for the onboard pressure chip. Shown only when no analog input is set |
| Use fixed baro corr from MAP | - | Take the baro value from MAP once at power-up |

### Custom calibration

A custom baro sensor shares the two voltage points entered for the MAP sensor under **Sensors > MAP sensor**. Only the kPa values are set here. If the baro sensor has a different output range to the MAP sensor, use a preset instead.

## Setup

1. To use an external sensor, set **Baro ADC input** and **Type**.
2. To use an onboard chip, leave **Baro ADC input** unset and set **LPS2x Baro SCL** and **LPS2x Baro SDA** to the chip's pins. See your board's documentation.
3. Check the reading with the engine off. It should match the local weather station pressure, corrected to station level, within a couple of kPa.
4. Leave the correction table flat unless you have log data showing a real difference across your pressure range.

## Checking it works

Watch **Barometric pressure** with the engine off. It should be steady and close to the local pressure, roughly 101 kPa at sea level.

## If it fails

A failed baro sensor does not set a fault code of its own. Everything falls back to a standard atmosphere, 101.325 kPa:

| Feature | With no baro, or a failed baro sensor |
| --- | --- |
| Baro fuel correction | No sensor configured at all: no correction (1.0). Sensor configured but failed: the table is read at 101.325 kPa |
| MAF load limit | Uses 101.325 kPa |
| Injector fuel pressure compensation | Uses 101.325 kPa. A reading below 50 kPa or above 120 kPa is also replaced by 101.325 kPa |
| Torque model | Uses 101.325 kPa as the pressure before the throttle, if there is no throttle inlet pressure sensor |
| Electronic throttle flow model | No sensor configured: uses 101.325 kPa. Sensor configured but failed: the model produces no result |
| General purpose PWM outputs using baro as an axis | Use their error duty |
| CAN dash and OBD output | Report 0 kPa |

If the correction table returns a value outside its valid range, the correction is set to 1.0 and a warning (P2227) is logged.

The onboard chip only accepts readings between 50 and 120 kPa. If it stops giving readings, the baro value is lost after one second.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| No baro reading and no correction | No input set, and the ECU has no onboard chip or its pins are not set |
| Baro is wrong with a custom sensor | The custom voltage points belong to the MAP sensor |
| Baro doesn't change when you change the input | **Use fixed baro corr from MAP** is on and overriding it |

## Related

- [Manifold Absolute Pressure](/Sensors-And-Gauges/Pressure-Sensors/MAP)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

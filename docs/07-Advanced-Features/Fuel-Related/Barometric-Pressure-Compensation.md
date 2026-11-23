# Barometric Pressure Compensation

Barometric pressure compensation adjusts fuelling for changes in atmospheric pressure, from altitude or weather. It is a fuel multiplier looked up from a table of barometric pressure against RPM. It needs a baro value, which is described on the [Barometric Pressure](/Sensors-And-Gauges/Pressure-Sensors/Barometric) page.

Settings are under **Fuel > Barometric pressure correction**.

## How it works

The ECU reads the barometric pressure and the engine speed, and looks up a multiplier in the table. The result is multiplied into the base fuel mass together with the CLT multiplier, the IAT multiplier and the post-cranking enrichment. A value of 1.00 leaves fuel unchanged. It is applied while running and not while cranking.

The correction is applied whenever a baro source is available, whatever the fuel algorithm, and the table is in the menu for every algorithm.

Speed density measures manifold pressure and so already sees most of the effect of altitude on the intake. If you don't know you need this table, leave it at 1.00.

:::warning
Don't use this table to double-correct. MAF measures air mass directly, so it should stay at 1.00. Alpha-N assumes a standard atmosphere for its air mass calculation, so with Alpha-N this table is the only barometric correction. In either case, make sure the same correction isn't made twice.
:::

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Baro Correction table (RPM and pressure axes) | ratio | Fuel multiplier for each barometric pressure and RPM. 1.00 means no correction |

The table's axes are barometric pressure in kPa and RPM. Between cells the ECU interpolates.

## Setup

1. Make sure a baro value is available. See [Barometric Pressure](/Sensors-And-Gauges/Pressure-Sensors/Barometric).
2. Leave the table at 1.00 until you have logs from different altitudes or weather.
3. Compare air-fuel ratio against barometric pressure at the same load and RPM, and add corrections where it shifts.

## Checking it works

Watch the **Fuel: Barometric pressure mult** gauge together with the **Barometric pressure** gauge. At 1.00 in the table, the multiplier should read 1.00 everywhere.

## If it fails

- With no baro source configured, the multiplier is 1.00.
- With a baro source configured but failing, the table is read at 101.325 kPa.
- If the looked-up value is not a number or is below 0.01, the ECU uses 1.00 and raises a warning for an invalid baro correction.

See [Barometric Pressure](/Sensors-And-Gauges/Pressure-Sensors/Barometric) for the sensor side.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Multiplier stuck at 1.00 | No baro source configured, or the table is all 1.00 |
| Warning for invalid baro correction | A table cell is below 0.01 |
| Table is not in the menu | Injection is disabled |

## Related

- [Barometric Pressure](/Sensors-And-Gauges/Pressure-Sensors/Barometric)
- [CLT Multiplier](/Fuel/Fuel-Settings/CLT-Multiplier)
- [IAT Multiplier](/Fuel/Fuel-Settings/IAT_Multiplier)

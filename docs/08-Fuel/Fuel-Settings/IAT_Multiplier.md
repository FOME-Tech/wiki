# Intake Air Temperature Fuel Multiplier

The IAT multiplier is a fuel correction that depends on intake air temperature. Most setups don't need it. Air density is already handled by the fuel algorithm, so this curve is only for trimming what is left over, for example a mixture that drifts with air temperature in a way the VE table and charge temperature estimation don't explain.

Settings are under **Fuel > IAT multiplier**.

## How it works

The ECU looks up the current intake air temperature on the curve and gets a multiplier. The multiplier is applied to the base fuel mass, together with the CLT multiplier, the barometric pressure correction and the post-cranking enrichment, by multiplying them all together. A value of 1.00 leaves fuel unchanged. It is only applied once the engine is running, not while cranking.

This is a separate correction from the effect of air density. The base fuel already accounts for air temperature in the fuel algorithm:

| Fuel algorithm | Air temperature already accounted for |
| --- | --- |
| Speed density | Yes, using the charge temperature estimate, which is built from IAT and coolant temperature. See [Charge Temperature Estimation](/Advanced-Features/Fuel-Related/Charge-Temp-Estimation) |
| Alpha-N | Only if **Alpha-N uses IAT density correction** is enabled. Otherwise a fixed 20 °C is assumed |
| MAF | Yes, the sensor measures air mass directly |

The IAT multiplier is applied on top of all of those. If you use it as well as the built-in compensation, the two corrections multiply, so the air temperature effect is corrected twice.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Air Temp | C | Intake air temperature for each point on the curve |
| Multiplier | ratio | Fuel multiplier at that temperature. 1.00 means no correction |

Between points the ECU interpolates.

## When to use it

:::note
With speed density, leave this curve at 1.00 and set up charge temperature estimation properly instead. If the engine goes lean as the air gets hotter, the usual cause is a poor charge temperature estimate, not a missing IAT multiplier.
:::

- **Speed density:** keep at 1.00 unless charge temperature estimation is tuned and you still see a consistent air temperature trend in the mixture. Then use small values.
- **Alpha-N:** enable the air temperature compensation option first. Use this curve only for what's left.
- **MAF:** the sensor already reflects air density, so this should stay at 1.00. Only use it for an effect you have measured that density doesn't explain.

## Setup

1. Leave the multiplier at 1.00 across the whole curve. Tune the VE table first.
2. Log air-fuel ratio against intake air temperature at a repeatable load, with the engine warm and in closed loop. If there is a trend that charge temperature estimation can't remove, add small corrections, a few percent at a time.
3. Avoid steps in the curve.

## Checking it works

Watch the **Fuel: IAT correction** gauge alongside the intake air temperature. The gauge should follow the curve, and sit at 1.00 if you haven't changed it.

## If it fails

If the intake air temperature sensor has failed, the multiplier is 1.00, so no correction is applied. See [Intake Air Temperature](/Sensors-And-Gauges/Temperature-Sensors/IAT) for how the failure is detected and what else it affects.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Lean when the air is hot (speed density) | Poor charge temperature estimate. Don't compensate with this curve |
| Over-corrected on hot days with MAF or Alpha-N compensation | IAT multiplier applied on top of density compensation that is already there |
| Gauge always reads 1.00 | Curve is flat, or the IAT sensor has failed |

## Related

- [Intake Air Temperature](/Sensors-And-Gauges/Temperature-Sensors/IAT)
- [Charge Temperature Estimation](/Advanced-Features/Fuel-Related/Charge-Temp-Estimation)
- [CLT Multiplier](/Fuel/Fuel-Settings/CLT-Multiplier)
- [Barometric Pressure Compensation](/Advanced-Features/Fuel-Related/Barometric-Pressure-Compensation)

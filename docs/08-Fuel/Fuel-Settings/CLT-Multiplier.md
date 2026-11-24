# Coolant Temperature Multiplier

The CLT multiplier is a fuel correction that depends on coolant temperature. Use it to add fuel while the engine is cold, when fuel doesn't vaporise as well, and to taper that enrichment away as the engine warms up. It only applies once the engine is running. Cranking has its own coolant correction.

Settings are under **Fuel > CLT multiplier**. The curve is titled "Warmup fuel manual Multiplier".

## How it works

The ECU looks up the current coolant temperature on the curve and gets a multiplier. The multiplier is applied to the base fuel mass, together with the IAT multiplier, the barometric pressure correction and the post-cranking enrichment, by multiplying them all together. A value of 1.00 leaves fuel unchanged, 1.20 adds 20 %.

It is applied for every fuel algorithm.

It is not used while cranking. Cranking fuel uses the cranking coolant temperature multiplier instead. After the engine starts, the post-cranking enrichment (which also depends on coolant temperature) is applied separately, on top of this multiplier. Don't tune the same cold-start richness into both.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Coolant | C | Coolant temperature for each point on the curve |
| Multiplier | ratio | Fuel multiplier at that temperature. 1.00 means no correction |

Between points the ECU interpolates.

## Setup

1. Set the multiplier to 1.00 at and above normal operating temperature. The VE table should be tuned there.
2. Start with a modest increase at low temperatures, for example 1.10 to 1.30 at 0 °C, falling smoothly to 1.00 by about 70 to 80 °C. Cold engines usually want more than that, so adjust from logs.
3. Tune warm first, then work down in temperature. Use closed-loop data or a wideband in cold logs and adjust the points until the air-fuel ratio matches the target lambda.
4. Avoid steps in the curve. A sudden change in multiplier shows up as a rich or lean surge as the engine warms through that temperature.

:::tip
If the VE table was tuned warm, the CLT multiplier is the right place to fix cold running. Don't fix it by editing the VE table, because that also changes warm behaviour.
:::

## Checking it works

Watch the **Fuel: CLT correction** gauge in the dialog or in logs, alongside **Coolant temp**. The gauge should follow your curve and sit at 1.00 when warm. Log the air-fuel ratio against coolant temperature during a cold start and warm-up to see where the curve is too rich or lean.

## If it fails

If the coolant sensor has failed, the multiplier is 1.00, so no correction is applied. A cold engine will run lean. See [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT) for how the failure is detected and what else it affects.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Cold engine runs lean and stumbles | Curve values too low, or the coolant sensor has failed (the gauge shows 1.00) |
| Rich while cold, then lean as it warms | Cold-start enrichment duplicated between this curve and post-cranking enrichment |
| Surge at a particular temperature | A step in the curve at that temperature |
| Hard to start cold but runs fine once started | This curve isn't used while cranking. Adjust the cranking coolant multiplier |

## Related

- [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT)
- [IAT Multiplier](/Fuel/Fuel-Settings/IAT_Multiplier)
- [Barometric Pressure Compensation](/Advanced-Features/Fuel-Related/Barometric-Pressure-Compensation)

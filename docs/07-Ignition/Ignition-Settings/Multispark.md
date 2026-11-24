# Multispark

Multispark fires one or more extra sparks after the main spark, at low engine speed. It can help ignite a lean or hard-to-light mixture and burn off plug fouling at idle. It is intended for individual coil-per-cylinder ignition.

Settings are under **Ignition > Multispark**.

:::warning
Multispark charges each coil several times per cycle, so coils and ignition drivers get hotter than with a single spark. Poor choices can overheat and destroy them. Start with few sparks and low RPM, check coil temperature, and use at your own risk. TunerStudio warns against it on distributor and wasted spark systems.
:::

## How it works

The main spark fires exactly as it would without multispark, including the normal [dwell](/Ignition/Ignition-Settings/Dwell). Right after it, the ECU waits for **Spark duration**, charges the coil again for **Subsequent spark dwell**, and fires again. This repeats until the number of extra sparks is used up. Extra sparks are timed from the previous spark, not by crank angle.

The number of extra sparks is recalculated continuously. It is the number that fit in the window set by **Fire sparks for this angle duration** at the current engine speed, rounded down, limited by **Maximum extra spark count**. Each extra spark needs **Spark duration** plus **Subsequent spark dwell**, so the count falls as RPM rises. The window runs from the main spark, so the last extra spark never fires later than that many degrees after it.

No extra sparks fire above **Maximum engine speed**, or while the engine speed is zero (such as at the start of cranking). They are also not fired when the spark is being suppressed by a rev limiter or similar cut, or if the coil didn't get enough dwell for the main spark.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Enable multiple sparks | - | Master enable |
| Maximum engine speed | rpm | No extra sparks above this speed |
| Fire sparks for this angle duration | deg | Window after the main spark in which extra sparks may fire |
| Maximum extra spark count | count | Most extra sparks per main spark, not counting the main one |
| Spark duration | ms | Time allowed for the spark to burn before the coil is recharged |
| Subsequent spark dwell | ms | Dwell for each extra spark. The main spark uses the dwell table |

### Choosing timings

**Spark duration** must be long enough for the spark to burn out before the coil recharges. **Subsequent spark dwell** should be about what the coil needs to fire at your battery voltage. Together they set how many sparks fit, so with both at a few milliseconds only a handful fit even at idle.

For example, a 1 ms spark duration and 2 ms dwell means each extra spark takes 3 ms. At 1000 RPM one degree is 0.167 ms, so a 30 degree window is 5 ms, which allows one extra spark.

## Setup

1. Confirm your engine runs well with a single spark, with individual coils.
2. Set **Maximum engine speed** just above idle.
3. Set **Maximum extra spark count** to 1 or 2, and set the window, spark duration and dwell for your coils.
4. Enable multispark, and confirm the extra spark count at idle in the **Ign: Multispark count** log channel.
5. Check coil and driver temperatures after running, and back off if they get hot.

## Checking it works

**Ign: Multispark count** shows the number of extra sparks currently calculated. It reads 0 when multispark is disabled, above **Maximum engine speed**, or when no spark fits the window. To see the sparks themselves, use a scope or an inductive pickup on the coil output.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Multispark count always 0 | Not enabled, RPM above the limit, or the window is too short for one spark plus dwell |
| Misfire or rough idle after enabling | Extra spark dwell too short for the coil to fire, or too many sparks |
| Hot coils | Too many sparks, or the limit RPM is too high. Reduce the count or the window |

## Related

- [Dwell](/Ignition/Ignition-Settings/Dwell)

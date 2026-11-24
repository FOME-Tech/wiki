# Cylinder Angle Offset

Most engines fire at even intervals, and FOME spaces each cylinder's events evenly through the engine cycle by default. Odd-fire engines don't. Some V-twins, V6 and V10 engines have cylinders that fire at uneven intervals. Cylinder offsets let you shift the events of each cylinder to match the real firing pattern.

Settings are under **Advanced > Cylinder offsets**.

## How it works

FOME starts from the cylinder's position in the firing order, spaced evenly across the engine cycle, and adds the offset you enter for that cylinder. The offset is then applied to everything scheduled for that cylinder:

- ignition (spark and dwell)
- injection
- the MAP averaging window for that cylinder
- the per-cylinder instantaneous RPM measurement

Positive numbers delay the cylinder's events (retard) and negative numbers bring them earlier (advance). The offset is in crank degrees and is applied on top of the normal timing, so ignition advance and injection timing tables are still entered as for a normal engine. It moves the whole cylinder, not only the spark.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Offset cyl 1 to Offset cyl 12 | deg | Shift for each cylinder. Only as many as your cylinder count are shown |

The offsets are for the cylinder numbers used by your firing order, not for the position in the firing order.

## Setup

1. Set the cylinder count and firing order first, assuming even firing.
2. Work out the actual angle at which each cylinder fires, from the engine's documentation.
3. For each cylinder, enter the difference between its actual firing angle and the evenly spaced angle FOME would use. For example, on a two-cylinder engine where cylinder 2 fires 270° after cylinder 1 instead of 360°, cylinder 2 gets -90.
4. Verify with a timing light on each cylinder if possible.

:::note
Cylinder 1 normally stays at 0, so every other cylinder is entered relative to it.
:::

## Checking it works

Use a timing light on each cylinder in turn at idle and check that each one fires at the angle you expect relative to its own timing mark. The logged **Ign: Timing Cyl** channels show the advance requested for each cylinder before the offset is applied, so they will be the same for every cylinder.

:::warning
Wrong offsets move ignition timing for that cylinder. Always verify with a timing light before running the engine under load.
:::

## Wasted spark

With wasted spark ignition, a non-zero offset on any cylinder (like an odd cylinder count) makes FOME treat the outputs individually, as in sequential mode, with spark events every 360° instead of every 720°. If you have hardware that pairs cylinders on one coil, such as a Viper, use **Paired output odd fire wasted spark (Viper)** in the ignition settings instead, which skips that behaviour.

## Related

- [Ignition Advance Table](/Ignition/Ignition-Settings/Ignition-Advance-Table)

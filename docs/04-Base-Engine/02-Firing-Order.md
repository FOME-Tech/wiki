# Firing Order

The firing order tells the ECU which cylinder fires in which position of the engine cycle. FOME uses it for both ignition and fuel, and it also sets the number of cylinders. Get it right first, because the ignition and injector outputs are numbered by cylinder and everything else is scheduled from it.

Settings are under **Base Engine > Base engine**.

## How it works

Each entry in the **Firing order** list is a complete order, such as 1-3-4-2. Choosing one does two things:

- It sets the cylinder count to the number of cylinders in that order. There is no separate setting for this.
- It tells the ECU which cylinder is next in line at each point of the engine cycle. Events are spaced evenly through the cycle in that order, and then adjusted by any [Cylinder Angle Offset](/Base-Engine/Cylinder-Angle-Offset).

Cylinders are always numbered by the engine's own numbering, not by their position in the firing order. Ignition and injection outputs are named the same way: **Ignition cylinder 3** is the coil for cylinder 3, and **Injection cylinder 3** is the injector for cylinder 3. The firing order only decides when each of them fires.

The same cylinder number is also what the per-cylinder fuel and ignition trims, and the knock sensing, use.

### Ignition

- **Individual coils** (sequential or not): each cylinder's coil fires at that cylinder's turn in the firing order.
- **Wasted spark**: each coil fires two cylinders, which are half the firing order apart. On 1-3-4-2, cylinders 1 and 4 are a pair, and so are 3 and 2. The coil output used for each pair is the one belonging to the pair's cylinder that comes first in the firing order: **Ignition cylinder 1** for the 1 and 4 pair and **Ignition cylinder 3** for the 3 and 2 pair. The other outputs are not used.

### Injection

- **Sequential**: each injector fires on its own cylinder's turn, so injector N must be on cylinder N.
- **Batch**: each injector event also fires the injector of the cylinder half a cycle later in the firing order. On 1-3-4-2 the pairs are again 1 with 4, and 3 with 2. For batch wiring only the first half of the firing order needs outputs assigned, as the **Injector Outputs** dialog says.
- **Simultaneous**: all injectors fire together, so the order has no effect on which injector fires.
- **Single Point**: only the first injection output is used.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Firing order | - | The order in which the cylinders fire. Also sets the number of cylinders |

## Setup

1. Find the firing order from the engine manufacturer's documentation. Don't assume it. An inline four is often 1-3-4-2, but not always, and 1-2-4-3 and 1-3-2-4 also exist.
2. Select the matching entry in **Firing order**. If the exact order isn't listed, the engine isn't supported yet.
3. Assign the ignition outputs under **Ignition > Ignition Settings > Ignition Outputs**, and the injection outputs under the injector outputs dialog, so that output N goes to cylinder N. For wasted spark or batch wiring, use the pairing rules above.
4. Check the wiring with the [ignition coil test](/Ignition/Ignition-Settings/Ignition-coil-testing). For sequential ignition, spark 1 should fire cylinder 1, spark 2 cylinder 2 and so on. For wasted spark on 1-3-4-2, spark 1 should fire cylinders 1 and 4, and spark 3 should fire cylinders 3 and 2.
5. Use the injector test in the same way to check each injector is on the right cylinder.

:::warning
A wrong firing order, or outputs wired to the wrong cylinders, fires spark and fuel into the wrong cylinders. This can damage the engine. Confirm every output with the coil and injector tests before starting the engine.
:::

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Engine runs rough or won't start | Firing order, or coil and injector wiring, doesn't match the engine |
| Coil test fires the wrong cylinder | Output N isn't connected to cylinder N, or the firing order is wrong |
| Wasted spark test fires only one cylinder of a pair | Wrong pairing. The two coil towers on a coil must be the cylinders half a firing order apart |

## Related

- [Base Engine Settings](/Base-Engine/Base-Engine-Settings)
- [Cylinder Angle Offset](/Base-Engine/Cylinder-Angle-Offset)
- [Ignition Coil Test](/Ignition/Ignition-Settings/Ignition-coil-testing)

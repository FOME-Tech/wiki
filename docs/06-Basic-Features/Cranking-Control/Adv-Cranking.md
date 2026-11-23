# Cranking Ignition

While the engine is cranking, FOME uses its own ignition timing and dwell instead of the running tables, because spark timing at 200 to 300 RPM is very different from timing at idle. The engine counts as cranking until its speed reaches the **Cranking RPM limit** (see [Cranking RPM Limit](/Basic-Features/Cranking-Control/Cranking-RPM-Limit)), after which it uses the running [Ignition Advance Table](/Ignition/Ignition-Settings/Ignition-Advance-Table) and [Dwell](/Ignition/Ignition-Settings/Dwell).

Settings are under **Cranking > Cranking settings > Ignition**, plus **Cranking > Cranking ignition advance** when table mode is selected.

## How it works

The cranking advance can come from one of two sources, chosen with **Timing Advance mode**.

- **Fixed (auto taper):** you enter a single **Fixed cranking advance**. As engine speed rises, FOME blends from that angle towards the running advance at the **Cranking RPM limit**, so the timing hands over smoothly to the running table. The blend starts from the lowest cranking speed seen.
- **Table:** the advance is read from the **Cranking ignition advance** curve against RPM and used as is, with no blending towards the running table. Use this if you need a specific timing at each cranking speed, for example retarded for a high-compression engine on a weak battery.

Dwell while cranking is a single fixed time, **Fixed Cranking Dwell**, instead of the voltage-corrected table used when running. 

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Timing Advance mode | - | **Fixed (auto taper)** or **Table** |
| Fixed cranking advance | deg | Advance before TDC at the start of cranking. Only shown in fixed mode |
| Fixed Cranking Dwell | ms | Coil dwell time while cranking |
| Cranking ignition advance (curve) | deg vs RPM | Advance by RPM. Only available in table mode |
| Use Advance Corrections for cranking | - | Under **Cranking > Cranking settings > Advanced**. Apply the IAT, CLT, idle and DFCO timing corrections during cranking too |

### Advance corrections

Normally the ignition corrections (IAT, CLT, idle timing control and DFCO retard) aren't applied while cranking. **Use Advance Corrections for cranking** enables them, but only if **Timing Mode** is not set to fixed timing. Most setups don't need it.

## Setup

1. Start in fixed mode with a conservative value. 5 to 10° works for most engines.
2. Set **Fixed Cranking Dwell** to suit your coils. Check your coil's documentation, as the right value depends on the coil and voltage.
3. Crank the engine and watch the timing. If it kicks back against the starter or cranks slowly, lower the advance. If it is slow to catch, check the fuel first, then the timing.
4. Only move to table mode if you need different timing at different cranking speeds.

:::warning
Too much cranking advance can cause the engine to kick back against the starter. Start with less and work up.
:::

## Checking it works

Watch the ignition timing channel (**Ign: Timing Base**) in the logs while cranking. In fixed mode it should start at your value and rise gradually as the engine speeds up. In table mode it should follow the curve. A timing light confirms it matches.

## If it fails

There is no sensor behind this feature. If the **Cranking RPM limit** is set too low the engine drops into running timing as soon as it fires, and if it is set too high the engine stays on cranking timing and dwell after it has started.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Kicks back when cranking | Cranking advance too high |
| Weak spark or misfires when cranking | Fixed Cranking Dwell too short, or low battery voltage |
| Runs poorly just after starting | **Cranking RPM limit** too high or too low, so the switch to running timing happens at the wrong time |
| Table is not available in the menu | **Timing Advance mode** is set to fixed |

## Related

- [Cranking RPM Limit](/Basic-Features/Cranking-Control/Cranking-RPM-Limit)
- [Ignition Advance Table](/Ignition/Ignition-Settings/Ignition-Advance-Table)
- [Dwell](/Ignition/Ignition-Settings/Dwell)

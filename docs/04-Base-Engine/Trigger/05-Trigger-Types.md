# Trigger Types

The trigger type tells FOME what pattern of teeth your crank or cam wheel produces, so it can work out engine position from the pulses. For most engines this is a single drop-down: pick the right type, set the sensor input, and the ECU does the rest. This page explains how the types are grouped, how to pick one, and a few cases that behave differently.

Settings are under **Base Engine > Trigger** (the **Primary Trigger** and **Advanced Trigger** dialogs).

## Families of trigger

**Missing-tooth wheels.** The most common wheel is a regular row of teeth with one or more removed to make a gap, written as teeth-missing, such as 36-1 or 60-2. FOME has dedicated types for the usual ones (36-1, 60-2, 36-2, 32-2 and a few variations). Anything else, for example a 24-1 or a 12-1, uses **custom toothed wheel**, where you enter the counts yourself.

**OEM-specific patterns.** Many factory wheels aren't a simple missing-tooth pattern. They may have uneven tooth spacing, extra teeth, or a second wheel on the cam. FOME has decoders for patterns from these manufacturers: Chrysler/Dodge, GM, Honda, Mazda, Mercedes, Mitsubishi, Nissan, Rover, Subaru, Suzuki, Toyota and VW, along with a few others. Each is a named entry in the **Trigger type** list.

**Cam-only and distributor triggers.** Some types describe a cam or distributor signal on its own, for engines without a usable crank wheel.

**Two-stroke.** See below.

## Choosing a type

1. If your engine appears in the **Trigger type** list by its OEM name or engine code, use that. The named types describe the whole wheel, so you don't need to tell the ECU anything else about it, and the trigger angle offset should normally stay at 0.
2. If it isn't listed, identify the wheel. Count the teeth (including where the missing ones would be), find the gap, and work out whether the wheel is on the crank or the cam. A wheel on the cam turns at half crank speed.
3. If the wheel is a plain missing-tooth wheel, choose **custom toothed wheel** and fill in **Total tooth count** and **Missing/skipped tooth count**. The total includes the missing teeth: a 36-1 wheel is 36 and 1. If a named type exists for it (36-1, 60-2), use that instead.
4. If you can't tell what you have, record the signal with the tooth logger and compare it to the wheel. See [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting).

### Primary trigger location

A missing-tooth wheel gives no clue whether it is on the crank or the cam, so for the generic types, **Primary trigger location** asks you. Pick **On crankshaft** if the wheel turns with the crank, or **On camshaft** if it turns at half crank speed. It also changes which input is labelled as the crank or cam input. For most named OEM types the location is already known, so the setting is hidden. It is still shown for the generic 36-1 and 60-2 types.

### Angle offset

The OEM types are defined relative to a known point on the engine, so they normally work with **Trigger Angle Advance** at 0. Custom wheels need an offset that depends on where the gap sits relative to top dead center. See [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) for how to find it.

## Crank-only versus needing a cam

About a third of the types are crank-wheel patterns. These can usually give engine speed and a crank angle from the crank signal alone. Without a cam signal the ECU can't tell the two strokes of a 720° cycle apart, so it runs wasted spark and batch fuel. Adding a cam sensor lets it fire sequentially.

The rest are cam-based patterns, and a number of them use two channels, a crank and a cam input together.

How this works, and how the ECU decides it is fully synced, is covered in [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works) and [Cam Sync](/Base-Engine/Trigger/Cam-Sync). The **Require cam/VVT sync for ignition** option in **Advanced Trigger** controls whether the engine waits for the cam before firing.

## Cases worth knowing about

### Wheels that need a second channel

A good number of the OEM types define two signals, usually a crank wheel and a cam wheel. For these, wire both sensors, and check that **Trigger type** matches the sensors your engine really has.

### Symmetrical crank wheels

Many crank wheels have no gap at all, or repeat identically several times per revolution. Their crank signal gives tooth spacing and RPM, but says nothing about which cylinder is on which stroke. These are common:

- **12 tooth crank** is the usual choice for a wheel of 12 evenly spaced teeth with no gap, as used on many Honda and Toyota engines. It also covers Honda 24+1 distributors. Those have 24 teeth at cam speed, which is 12 per crank revolution, plus a single tooth once per cycle. The AEM 24+1 CAS wheel works the same way. Set the cam input to **Single Tooth**, or to the matching cam pattern for the engine.
- Some Nissan, Mazda and Renix crank patterns also repeat several times per revolution.

These always wait for the cam to resolve phase before firing, regardless of **Require cam/VVT sync for ignition**, so a working cam signal is required. See [Cam Sync](/Base-Engine/Trigger/Cam-Sync). The **12 tooth crank** pattern has no built-in TDC position, so **Trigger Angle Advance** must be set and checked with a timing light. See [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup).

### Odd-fire engines

Some engines have uneven firing intervals, for example the Viper V10. For these, if one coil fires a pair of companion cylinders, enable **Paired output odd fire wasted spark (Viper)** in **Advanced Trigger** and give each pair a single ignition output. The cylinder timing differences themselves are set with the per-cylinder offsets described in [Cylinder Angle Offset](/Base-Engine/Cylinder-Angle-Offset).

### Noisy sensors at start

Some sensors and wiring produce spurious pulses when the engine first moves. **Skip pulses at startup** in **Advanced Trigger** makes the ECU ignore that many pulses before it starts decoding. Raise it only if the tooth logger shows junk at the very start of cranking.

### Two-stroke

Set **Engine type** to **Two Stroke** on the **Primary Trigger** dialog. The engine cycle becomes one crank revolution (360°) instead of two, and the primary input is labelled **Cam Sensor (Primary channel)**. **Primary trigger location** is hidden because it no longer applies.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Never reaches sync with a custom wheel | **Total tooth count** or **Missing/skipped tooth count** doesn't match the wheel, or the location is wrong |
| Timing is steady but offset from a timing light | Trigger angle offset not set. See [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) |
| Erratic sync | Check the raw signal with the tooth logger and the [VR Threshold](/Base-Engine/Trigger/VR-Threshold) |

## Related

- [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)
- [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works)
- [Cam Sync](/Base-Engine/Trigger/Cam-Sync)
- [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting)
- [Cylinder Angle Offset](/Base-Engine/Cylinder-Angle-Offset)

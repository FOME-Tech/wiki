# Cam Sync

A cam sensor does two jobs. It tells FOME which half of the 720° cycle the engine is in, which a crank wheel alone can't (see [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works)). On engines with variable cam timing (VVT), it also measures where each cam actually is. This page covers setting up the cam inputs and calibrating that measurement. Controlling the cams is covered in the [VVT pages](/Advanced-Features/VVT).

Settings are under **Base Engine > Trigger**, in the **Cam Inputs** panel, and under **Base Engine > Advanced Trigger**.

## How it works

Each cam input is decoded according to its **Cam trigger type**. For each cam event, FOME notes where the crank was at that moment.

- **Phase.** On a crank-speed trigger, the cam event shows which crank revolution is which, so FOME can switch from half sync to full sync. Only the cam selected in **Cam for engine sync resolution** is used for this. If the primary trigger already runs at cam speed, it has full sync by itself, and the cam inputs only measure position.
- **Position.** The crank angle of the cam event, adjusted by the **VVT offset** for that cam, is the cam position shown on the **VVT** gauges. As the cam moves earlier (advances), the reading rises. The reading is only valid once FOME has full sync. Until then, and whenever the cam signal stops for more than a second, the gauge reads 0.

## Settings

### Cam Inputs

| Setting | Units | Description |
| --- | --- | --- |
| Cam trigger type (intake) | - | Pattern of the intake cam wheel. Applies to both banks |
| Cam trigger type (exhaust) | - | Pattern of the exhaust cam wheel. Applies to both banks |
| Cam sensor bank 1 intake, bank 1 exhaust, bank 2 intake, bank 2 exhaust | - | Input pin for each cam sensor |
| Invert cam inputs | - | Use the opposite edge of the signal, for all cam inputs. Off for VR sensors on a MAX9924 or MAX9926 (see below) |
| VVT offset bank 1 intake, bank 1 exhaust, bank 2 intake, bank 2 exhaust | deg | Offset that makes each cam's reading 0 at its rest position (see below) |
| Cam for engine sync resolution | - | Which cam FOME uses to find engine phase. The others only measure position |
| DTC P0340/P0345/P0365/P0385 severity | - | What to do when a cam signal is missing (see [Fault Codes](/Limits-And-Protections/Fault-Codes)) |
| DTC P0341/P0346/P0366/P0386 severity | - | What to do when a cam signal has too many sync errors |

Pin fields appear once the matching **Cam trigger type** is set, and the bank 2 pins appear once the bank 1 pin for the same cam is set. Each VVT offset appears once its pin is set. A bank 2 intake pin without a bank 1 intake pin is a configuration error: FOME raises a critical error and won't run the engine until you fix it and restart the ECU. With the **Miata NA** trigger type, the cam signal is part of the primary trigger, so the cam type fields are hidden.

### Advanced Trigger

| Setting | Units | Description |
| --- | --- | --- |
| Require cam/VVT sync for ignition | - | Don't fire any fuel or spark until the cam has resolved engine phase |
| Minimum cam/VVT sync RPM | rpm | Only use the cam to find phase above this RPM. 0 for no limit |
| Maximum cam/VVT sync RPM | rpm | Only use the cam to find phase below this RPM. 0 for no limit |
| MAP readout angle | Deg | Only for **VTwin by MAP**. Engine angle within each crank revolution at which MAP is compared (see below) |

The other settings in that dialog are covered on [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting).

### Cam trigger type

Pick the type that matches the cam wheel on your engine. The types fall into a few groups:

- **Inactive**: no cam sensor on this cam.
- **Single Tooth**: one tooth per cam revolution. Each tooth gives both phase and position.
- **Named OEM patterns**, such as **Miata NB2**, **Toyota 4/1**, **Honda K Exhaust** or **Nissan VQ**: FOME decodes the pattern like a small trigger wheel and uses one tooth of it as the reference.
- **Honda K Intake**: four evenly spaced teeth. This gives cam position, but can't tell the revolutions apart, so it can't be used for **Cam for engine sync resolution**. On these engines use the exhaust cam for sync.
- **Toyota 3 Tooth**: FOME uses whichever of the three teeth falls in the expected window. Set the VVT offset before relying on it for sync, because a badly wrong offset puts every tooth outside that window.
- **VTwin by MAP**: no cam sensor at all. FOME uses the MAP sensor to find phase (see below).

### Cam for engine sync resolution

Choose a cam whose type can resolve phase, normally the one with the simplest and most reliable signal. On an engine with VVT on one cam only, the fixed cam is a good choice if it has a sensor, since its position never changes. The other cams still report their positions.

### VVT offsets

Each cam's raw reading depends on where the sensor and wheel are mounted. The offset shifts the reading so that it is 0 with the cam at its rest position, the position it sits in when the VVT solenoid isn't being driven. Positive readings then mean the cam has advanced from rest, and negative readings that it has retarded.

The reading is measured against TDC, so it also moves if you change **Trigger Angle Advance**. Set that first, then the VVT offsets.

### Invert cam inputs

Leave this off for VR cam sensors on an ECU with a MAX9924 or MAX9926 conditioner, and check hall sensors in the Trigger Logger, as described on [Crank and Cam Sensors](/Base-Engine/Trigger/Crank-And-Cam-Sensors). It applies to all cam inputs. Simple patterns such as **Single Tooth** use one edge of each tooth, and inverting switches to the other edge, so the reading shifts by the width of the tooth. Recheck the VVT offsets after changing it.

### Requiring cam sync

With **Require cam/VVT sync for ignition** off, FOME starts the engine as soon as the crank syncs: it fires individual coils as wasted spark and sequential fuel as batch, and switches to sequential once the cam has resolved phase. This usually starts the engine sooner. With it on, nothing fires until the cam has resolved phase, so the engine starts in sequential mode. A few engines don't like running in the other modes even briefly.

Some setups always wait for the cam, whatever this setting says: crank wheels whose pattern repeats within a revolution (such as the Miata NB and several Nissan wheels), and **VTwin by MAP**.

:::warning
Don't turn on **Require cam/VVT sync for ignition** without a working cam sensor. With a crank-speed trigger the engine will never fire.
:::

### Minimum and maximum cam sync RPM

Leave both at 0 unless your cam sensor gives a bad signal at some speeds. Outside the range set here, FOME ignores the cam when working out phase, but keeps the phase it already has. If **Minimum cam/VVT sync RPM** is above cranking speed, the engine can't get full sync while cranking. On engines that always wait for the cam, that means it won't start.

### MAP-based phase (VTwin by MAP)

Some engines, typically V-twins, have no cam sensor. With **Cam trigger type (intake)** set to **VTwin by MAP**, FOME reads MAP at **MAP readout angle** on every crank revolution while cranking, and compares each reading with the one from the revolution before. A rise counts as the cam event. Choose an angle where MAP is clearly different between the two crank revolutions of the cycle. The engine doesn't fire until this has resolved phase. Once it is running above **Cranking RPM limit**, FOME keeps the phase it found.

## Setup

1. Set up the primary trigger and confirm **Trigger Angle Advance** first. See [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup).
2. Find out whether each cam sensor is hall or VR. See [Crank and Cam Sensors](/Base-Engine/Trigger/Crank-And-Cam-Sensors).
3. Set **Cam trigger type (intake)** and/or **Cam trigger type (exhaust)** to match your cam wheels.
4. Set the cam sensor pins. Most boards preset the first cam input.
5. Set **Invert cam inputs** for your sensors (it appears once a cam pin is set): off for VR sensors on a MAX9924 or MAX9926, and as the Trigger Logger shows for hall sensors.
6. Set **Cam for engine sync resolution** to the cam you want to use for phase.
7. Start the engine and check that **Trg: Fully synchronized** comes on. If you use sequential fuel or individual coils, check that the engine runs properly once it has full sync. If it doesn't, the phase may be 360° out. See the note on [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup).
8. For each VVT cam, make sure VVT control is off, so the cam sits at its rest position. Let the engine idle.
9. Read the cam's **VVT** gauge, e.g. **VVT: bank 1 intake**. Subtract the reading from the cam's **VVT offset** and burn. For example, if the offset is 0 and the gauge reads 42, set the offset to -42.
10. Check that the gauge now reads close to 0, then set up VVT control on the [VVT pages](/Advanced-Features/VVT).

:::tip
A gauge reading of exactly 0 can also mean there is no valid reading. Before zeroing an offset, check that **Trg: Fully synchronized** is on and the reading moves slightly as the engine runs.
:::

## Checking it works

- **Trg: Fully synchronized** comes on within the first revolutions of cranking, and stays on.
- **Ign: Mode** and **Fuel: Injection mode** show the modes you selected, rather than wasted spark and batch, once the engine has synced.
- **VVT: bank 1 intake**, **VVT: bank 1 exhaust**, **VVT: bank 2 intake** and **VVT: bank 2 exhaust** read about 0 with VVT control off, and steady at idle.
- The cam sync error counters, such as **VVT B1I: Sync error counter**, stay at zero or stop climbing.

## If it fails

Without a usable cam signal, FOME has only half sync. Individual coils fire as wasted spark and sequential fuel runs as batch, so the engine usually still runs. Engines that always wait for the cam, or that have **Require cam/VVT sync for ignition** on, won't fire at all.

The cam position for that cam becomes invalid and its **VVT** gauge reads 0. VVT control switches its solenoid output off, so the cam returns to its rest position.

Once the crank has synced more than 20 times, FOME checks every cam that has an input pin. It sets P0340, P0345, P0365 or P0385 (bank 1 intake, bank 2 intake, bank 1 exhaust, bank 2 exhaust) if a cam has no signal or hasn't given a valid position for a second. It sets P0341, P0346, P0366 or P0386 for more than 50 cam sync errors. The two DTC severity settings choose how these are handled. See [Fault Codes](/Limits-And-Protections/Fault-Codes).

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| **Trg: Fully synchronized** never comes on | No cam signal, wrong pin, wrong **Cam trigger type**, or **Cam for engine sync resolution** set to a cam that can't resolve phase |
| Engine only runs as wasted spark and batch | As above: the cam isn't resolving phase |
| Runs badly or not at all once fully synced, timing light reads correctly | Phase is 360° out. Add or subtract 360 from **Trigger Angle Advance**, then recheck the VVT offsets |
| VVT reading is far from 0 at rest | VVT offset not set, or **Trigger Angle Advance** changed since it was set |
| VVT reading jumps by a fixed amount between runs or at some RPM | Noise on the cam signal, or a pattern that doesn't match the selected **Cam trigger type** |
| Warning "VVT sync position too close to trigger sync" | The cam's sync tooth falls within a few degrees of the crank's sync point, so FOME can't reliably tell which revolution it belongs to. Use a different cam for sync, or move the sensor or wheel |
| Warning that a VVT event arrived but no mode is set | A cam input pin is set, but its **Cam trigger type** is **Inactive** |
| P0340 family | Cam sensor unpowered or disconnected, wrong pin, or wrong **Cam trigger type** |

For reading the cam signal in the Trigger Logger, see [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting).

## Related

- [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works)
- [Crank and Cam Sensors](/Base-Engine/Trigger/Crank-And-Cam-Sensors)
- [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)
- [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting)
- [Variable Cam Timing (VVT)](/Advanced-Features/VVT)
- [Miata VVT](/Vehicle-Specific/Mazda-MX5-Miata/Miata-VVT)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

# Trigger Troubleshooting

When the ECU can't read the crank or cam signal, nothing else works: there is no RPM, so there is no fuel or spark. This page covers the tools for seeing what the ECU is receiving, the advanced trigger settings, and a table of common symptoms. Start with the Trigger Logger. It shows the raw signal and settles most trigger problems in a few minutes.

Settings are under **Base Engine > Advanced Trigger** and **Controller > ECU stimulator**.

## The tools

### Trigger Logger

The Trigger Logger records every edge the ECU sees on the crank and cam inputs and draws them as a trace. It also shows whether the ECU thinks it has sync. Open it from TunerStudio's high-speed logger tools and start it, then crank the engine. The channels it shows include **PriLevel** (the crank input), **Cam 1** to **Cam 4**, **Sync** and **TDC**.

What to look for with a missing-tooth wheel such as 36-1 or 60-2:

- **Good:** evenly spaced teeth, with a single wider gap per crank revolution. The gap is about twice the tooth spacing for 36-1 and three times for 60-2. The pattern repeats identically every revolution. **Sync** goes high within a revolution or two and stays high.
- **Noisy:** extra short pulses between teeth, teeth that come and go, or a pattern that changes between revolutions. See [VR Sensor Threshold](/Base-Engine/Trigger/VR-Threshold) for VR sensors. For any sensor, check wiring, shielding and grounds.
- **Wrong gap:** the teeth are clean, but the gap is the wrong width, or there are two gaps, or none. The wheel doesn't match the selected trigger type, or the signal is dropping a tooth. Count the teeth between gaps and compare with the trigger you selected in [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup).
- **Clean but never syncs:** the pattern looks right and **Sync** stays low. Suspect the wrong trigger type or an inverted edge setting.

Take logs while cranking and again at several higher RPM, since problems often show up in only one part of the range.

### Gauges and log channels

| Gauge or channel | Meaning |
| --- | --- |
| **Trigger OK / Trigger ERR** indicator, log channel **Error: Trigger** | Lights while recent sync errors are occurring |
| **Trigger error count** gauge, log channel **Trg: Sync error counter** | Sync errors counted for the crank. It should stay at zero or at least stop climbing once the engine is running |
| **Trg: Sync counter** | Number of crank sync points seen. It should climb steadily while the engine turns |
| **triggerSyncGapRatio** gauge, log channel **Trg: Sync gap ratio** | Ratio of the latest tooth period to the one before it (see below) |
| **Trg: Fully synchronized** | Whether the ECU has resolved full engine phase. See [Cam Sync](/Base-Engine/Trigger/Cam-Sync) |
| **orderingErrorCounter** | Counts the same edge type arriving twice in a row. Any count means missed or doubled edges, usually from noise |
| **VVT B1I: Sync error counter** and the other **VVT B*x*** channels | The same counters for each cam input |

:::note
**RPM** can read non-zero without the engine being synced. Check **Trg: Sync counter** and the logger's **Sync** trace to be sure.
:::

### Console messages

The FOME console prints trigger information that the gauges can't show. It is most useful for reading the actual gap values. The options are in **Base Engine > Advanced Trigger**.

| Setting | Description |
| --- | --- |
| Print verbose trigger sync to console | At each sync check on the crank signal, print the measured gap ratio, the range the trigger expects, and whether it matched |
| Print verbose VVT sync details to console | The same for the cam inputs |
| Do not print messages in case of sync error | Stops the error messages from printing. Printing a lot of text can slow the ECU on a wheel with many teeth |
| Debug Trigger Sync | Output pin that toggles each time the decoder finds its sync gap. Wire it to an oscilloscope or logic analyser to compare it against the raw signal |

The verbose messages are only printed while RPM is below **Engine Sniffer Threshold** (in **FOME Console Settings**), so use them while cranking or at a slow idle. They are far too chatty for normal running, so turn them off again when finished.

Sync error messages also print by themselves when sync is lost, unless you've silenced them with **Do not print messages in case of sync error**.

## Advanced Trigger settings

| Setting | Units | Description |
| --- | --- | --- |
| Skip pulses at startup | count | Ignores this many crank teeth when the engine starts moving |
| Paired output odd fire wasted spark (Viper) | - | For odd-fire engines where one coil fires a pair of companion cylinders. Only the lower firing-order cylinder of each pair needs an ignition output |
| Require cam/VVT sync for ignition, Minimum cam/VVT sync RPM, Maximum cam/VVT sync RPM, MAP readout angle | - | Cam phase settings, see [Cam Sync](/Base-Engine/Trigger/Cam-Sync) |
| Print verbose VVT sync details to console, Print verbose trigger sync to console, Do not print messages in case of sync error, Debug Trigger Sync | - | See above |

### Skip pulses at startup

Some trigger hardware makes noise as the engine first starts to move, which can cause a false sync. This setting makes the ECU ignore that many crank teeth when the engine starts turning. The count restarts whenever the signal has been absent for a second. Leave it at 0 unless the logger shows junk edges right at the start of cranking. Then raise it a little at a time. Every skipped tooth delays the first sync, so don't use a large number on a wheel with few teeth.

## Trigger Gap Override

The panel at the bottom of **Advanced Trigger** lets you replace the gap ratios the ECU uses to find its sync point.

:::warning
This is a last resort for debugging. If the ratios are wrong the engine won't sync, or will sync on the wrong tooth and get its timing wrong. Use it only if the normal trigger type can't sync and you've already checked wiring, noise, the trigger type and the setting for the edge to use. Turn it off again once you're finished.
:::

### How sync gaps work

To find the sync point, the ECU divides the time between the last two teeth by the time between the previous two. This is the gap ratio. On a missing-tooth wheel the ratio is about 1 for normal teeth, and jumps at the missing teeth. Each trigger type has a range the ratio must fall in. The ECU declares sync only when the ratio is inside that range. The range is deliberately wide to cope with acceleration and tolerances.

Some wheels need more than one ratio to be recognised. **Count** sets how many consecutive gap ratios must match, and **Gap #1**, **Gap #2** and so on give the lowest (**from**) and highest (**to**) accepted ratio for each. Gap #1 is the newest tooth. Later gaps look further back.

### When it helps

A worn, damaged or unusual wheel can produce gap ratios outside the range the built-in trigger expects, so the ECU never syncs, or syncs and then drops it. If you can see the real ratios, you can widen or shift the range to fit.

### Reading the real gap

1. Turn on **Print verbose trigger sync to console**, and crank the engine. Each line shows the measured ratio next to the expected range, and whether it matched.
2. Alternatively, watch **Trg: Sync gap ratio** in a log. It shows the latest ratio, so look at the value at the sync tooth.
3. Check the numbers against a Trigger Logger trace. The ratio at the sync point should be consistent from one revolution to the next. If it varies widely, you have a noise or sensor problem, which an override can't fix.

### Using it

1. Tick **Override trigger gaps**.
2. Set **Count** to the number of gap ratios you want to check, normally 1 or 2.
3. Enter **from** and **to** for each gap, with a margin either side of the real ratio. A very wide range will let the ECU sync on the wrong tooth.
4. Burn and test, with the verbose option on.

The override has to describe the wheel the selected trigger type draws. If the gaps can't produce sync on that ideal wheel, the ECU raises a fatal error, "custom trigger gaps are invalid", when it applies the setting.

## Trigger and cam fault codes

| Code | Meaning in practice |
| --- | --- |
| P0336 | The crank signal has had more than 50 sync errors. Noise, the wrong trigger type or a bad sensor. FOME doesn't set P0335 |
| P0340, P0345, P0365, P0385 | No usable cam signal on the bank 1 intake, bank 2 intake, bank 1 exhaust or bank 2 exhaust cam. Either no edges are arriving or the signal never gave a valid cam position |
| P0341, P0346, P0366, P0386 | The same cams, with 50 or more sync errors |

Trigger checks only run while the engine is running above the cranking RPM, or cranking. They don't run with the engine stopped. Cam checks only run for cams with an input pin set, and only after the crank has synced more than 20 times. Each code's response is set in the **DTC P0336 severity**, **DTC P0340/P0345/P0365/P0385 severity** and **DTC P0341/P0346/P0366/P0386 severity** settings. See [Fault Codes](/Limits-And-Protections/Fault-Codes) for the full code list and what severity levels do.

## ECU stimulator

The stimulator under **Controller > ECU stimulator** makes the ECU generate its own crank and cam signal for the selected trigger type, so you can test a configuration without an engine.

| Setting | Units | Description |
| --- | --- | --- |
| Trigger Simulator | RPM | Speed of the simulated signal |
| Enable internal trigger simulation | - | Feeds the simulated signal straight into the decoder, bypassing the input pins |
| Enable external trigger simulation | - | Drives the simulator output pins instead, so you can loop them back to the real inputs. Only shown on boards with the hardware for it |
| Disable trigger simulation | - | Turns the simulator off |
| Emulate full sync for trigger stimulator | - | In internal mode, pretend the cam has resolved engine phase, so sequential fuel and spark run as if the cam were working |
| Force full sync | - | Forces full sync |
| trigger stimulator output #1, #2 | - | Pins for the external simulation. Only shown on boards with the hardware for it |
| Engine chart size | count | Size of the engine chart buffer |

With internal simulation on, the ECU decodes the ideal wheel for the selected trigger. If it syncs and shows RPM, the trigger type is valid, and you can check the spark and injector outputs with a scope or test light. It tests only the ECU's decoding and outputs. It can't show whether your real wheel or sensor matches the selected trigger type. Turn simulation off before starting the engine for real.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| No RPM while cranking | Crank input pin not set, or on the wrong input. No power to a hall or optical sensor, or a missing pull-up. VR sensor wires reversed or too weak a signal. Wrong sensor type for the input. Check the Trigger Logger for any edges at all |
| RPM shows but never syncs | Wrong trigger type or wheel tooth counts. Wrong edge selection or an inverted signal. Check the gap in the logger and against the verbose output. See [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) |
| Sync errors only while cranking, or only at high RPM | VR threshold, see [VR Sensor Threshold](/Base-Engine/Trigger/VR-Threshold). Otherwise noise and shielding, or a sensor too far from the wheel |
| Sync errors at all speeds, error count climbs steadily | Noise on the signal, a damaged or dirty wheel, a loose sensor, or the wrong trigger type |
| Timing doesn't match the timing light | **Trigger Angle Advance** is wrong, see [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) |
| Runs, but never gets full sync, or only runs wasted spark | The cam signal is missing, or cam sync is set up wrongly. See [Cam Sync](/Base-Engine/Trigger/Cam-Sync) |
| RPM spikes or jumps | Noise, poor sensor ground, wires near ignition leads, or inverted signal edges. Log **orderingErrorCounter** and the **Trigger Logger** |
| P0336 | Any of the sync-error causes above |
| P0340 family | See [Cam Sync](/Base-Engine/Trigger/Cam-Sync), and check the cam wiring and input pin |

## Related

- [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works)
- [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)
- [Cam Sync](/Base-Engine/Trigger/Cam-Sync)
- [Trigger Types](/Base-Engine/Trigger/Trigger-Types)
- [VR Sensor Threshold](/Base-Engine/Trigger/VR-Threshold)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

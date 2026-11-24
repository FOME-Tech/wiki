# Crank and Cam Sensors

Crank and cam sensors come in two kinds: hall effect and variable reluctor (VR). Optical sensors, found in some distributors, behave like hall sensors. The two kinds need different wiring and inputs, and the right invert setting depends on which you have, so work this out before you set up the trigger.

The invert settings this page refers to are listed on [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) (**Invert Primary**, **Invert Secondary**) and [Cam Sync](/Base-Engine/Trigger/Cam-Sync) (**Invert cam inputs**).

## Hall and VR sensors

### VR sensors

A VR sensor is a coil wound around a magnet. It needs no power: a passing steel tooth changes the magnetic field and induces a voltage in the coil. The output is an AC waveform, roughly one sine-like cycle per tooth, and its amplitude rises with speed. Expect a few hundred millivolts while cranking and tens of volts at high RPM.

As a tooth approaches, the voltage swings one way and peaks. It crosses zero as the centre of the tooth passes the sensor, then peaks the other way as the tooth moves off. The zero crossing is the point that marks the tooth, because its position doesn't depend on the amplitude.

### Hall sensors

A hall sensor contains electronics that switch its output as a tooth or vane passes. It needs a supply, usually 5 V or 12 V depending on the sensor, and a ground. The output is a digital square wave with the same amplitude at any speed, even with the engine turned slowly by hand. Most hall sensors have an open-collector output: the sensor pulls the signal to ground, and a pull-up resistor pulls it high the rest of the time.

### Telling them apart

| Check | VR | Hall |
| --- | --- | --- |
| Wires | 2, sometimes a third for the shield | 3: supply, ground, signal |
| Needs power | No | Yes |
| Resistance between the two signal wires | A coil, typically a few hundred ohms to around a kilohm | No sensible coil reading |
| Output on a scope | Sine-like, amplitude grows with RPM | Square wave, fixed amplitude |
| Turning the engine slowly by hand | Almost no output | Signal switches cleanly between high and low |

The factory wiring diagram is the most reliable source.

### Wiring

VR sensors:

- Polarity matters. Connect the sensor's positive wire to the ECU's VR+ pin and the negative wire to VR-. If you don't know which wire is which, see [VR sensor on a MAX9924 or MAX9926](#vr-sensor-on-a-max9924-or-max9926) below.
- Use shielded twisted pair, with the shield grounded at the ECU end only.
- Route the wires away from coils, spark leads and injector wiring.

Hall sensors:

- Power the sensor from the supply its datasheet calls for, and ground it at the ECU's sensor ground rather than the block.
- The signal needs a pull-up. ECU hall inputs normally have one on the board. FOME doesn't turn on the microcontroller's internal pull-up on trigger inputs, so if your input has no pull-up, you have to fit one.

Connect each sensor to the matching kind of input. A hall input can't read the small VR signal at cranking speed. Some boards can take a hall sensor on a VR input, so check your board's documentation before doing that.

## How the ECU reads them

- **VR inputs** go through a VR conditioner. Most ECUs use a MAX9924 or MAX9926. It arms when the signal passes a threshold that it adapts to the signal's own amplitude, then switches its output at the next zero crossing. One edge of its output therefore marks the tooth centre. The other edge comes from the arming threshold, so it isn't a precise tooth position.
- **Hall inputs** go through a pull-up and an input buffer, which turn the sensor output into a clean logic level. Depending on the board, the buffer may or may not invert the signal.

A few boards instead have a VR circuit whose threshold the ECU sets from an RPM curve. That is covered on [VR Threshold](/Base-Engine/Trigger/VR-Threshold). You don't need it on a board with a MAX9924 or MAX9926.

### Which edge FOME uses

FOME's missing-tooth patterns describe each tooth as a rising edge where the tooth starts and a falling edge where it ends, as if the input were high while a tooth passes the sensor.

- **Most trigger types use only the rising edge.** That includes the generic missing-tooth wheels (**60/2**, **36/1**, **36/2** and **custom toothed wheel**) and many named types. Falling edges are ignored.
- **Some named types also use the falling edge**, such as **Miata NA**, **Mazda SOHC 4**, **Subaru SVX** and **Nissan Primera**. For these, the polarity has to match the pattern, or they may not sync, or sync with the timing shifted.
- **Cam inputs:** simple cam types such as **Single Tooth** use only the rising edge. Named cam patterns are decoded like a small trigger wheel, and a few of them use both edges.

**Invert Primary**, **Invert Secondary** and **Invert cam inputs** swap rising and falling for that input before the decoder sees it. They change nothing in the hardware. They only choose which edge of the signal FOME treats as the start of a tooth.

For a hall sensor, whose output is a clean square wave, inverting on a rise-only wheel makes FOME use the other edge of every tooth. The gap still looks right to the decoder (a gap ratio of about 2 on 36-1, or 3 on 60-2), so it still syncs, but every event moves by the width of a tooth. A wrong invert setting on a hall sensor therefore often doesn't show up as a sync problem, so settle it before setting **Trigger Angle Advance**. A VR sensor on a MAX9924 or MAX9926 behaves differently (see below).

## Choosing the invert setting

### VR sensor on a MAX9924 or MAX9926

Leave **Invert Primary**, **Invert Secondary** and **Invert cam inputs** off.

The MAX9924 and MAX9926 aren't symmetrical. They detect the zero crossing in only one direction, the one that produces a **rising** output edge, and that's why invert stays off. The falling output edge isn't a zero crossing, so it doesn't mark a precise tooth position.

With the sensor wired the right way round, the rising edges are evenly spaced right up to the missing tooth, and the gap is clean. With the two wires reversed, the conditioner triggers on the wrong part of the waveform, and the rising edges around the missing tooth come out distorted. The gap then measures wrong, and the engine often won't sync at all. Fix this by swapping the two sensor wires. Turning invert on doesn't fix it, because invert only picks the other output edge and can't change where the conditioner switches.

Check the polarity in the Trigger Logger, as described below. Once it syncs, you can also confirm it: set **Timing Mode** to **fixed** (see [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)) and check with a timing light at idle and again at a few thousand RPM. As a rule of thumb, with correct polarity the timing mark stays put. If it moves noticeably with RPM, swap the wires and check again.

### Hall sensor

Whether a hall sensor needs invert depends on whether its output goes low or high while a tooth is in front of it, and on whether the board's input buffer inverts. You can't tell from the sensor alone, so check it in the Trigger Logger as described below. Some board and engine presets already set invert for the sensors they expect.

## Checking polarity in the Trigger Logger

Open the Trigger Logger (see [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting)) and crank the engine. It only records below **Engine Sniffer Threshold**, so use it while cranking or at a slow idle.

- **PriLevel** shows the crank input as it arrives at the ECU, before **Invert Primary** is applied.
- **Cam 1** to **Cam 4** show the cam inputs after **Invert cam inputs** is applied.

**Missing-tooth crank wheel (hall).** Find the gap, the one long stretch per revolution. No tooth passes the sensor during the gap, so its level is the "no tooth" level.

- The gap is a long **low** stretch, and the teeth are high pulses: the input is high while a tooth passes, as FOME expects. Leave **Invert Primary** off.
- The gap is a long **high** stretch, and the teeth are low pulses: turn **Invert Primary** on.

For a hall sensor, don't use **Trg: Sync gap ratio** to decide. As explained above, it reads about the same either way on a rise-only wheel.

**Single-tooth cam (hall).** A narrow tooth should show on the cam trace as a short high pulse once per cam revolution. If it shows as a short low pulse in an otherwise high trace, toggle **Invert cam inputs**. Toggling moves the cam position reading by the width of the tooth, so set the VVT offsets after you've settled this. See [Cam Sync](/Base-Engine/Trigger/Cam-Sync).

**VR on a MAX9924 or MAX9926.** The trace shows one pulse per tooth, and the pulse width doesn't mean anything, so look at the spacing of the **rising** edges instead. With correct polarity they're evenly spaced up to and after the missing tooth, and the gap is a clean multiple of the tooth spacing (about 2 on 36-1, 3 on 60-2). **Trg: Sync gap ratio** reads steadily at that value. If the teeth either side of the gap look bunched up or stretched, and the gap ratio is wrong or jumps around, the sensor wires are reversed, so swap them. Leave invert off in either case.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| No edges at all in the Trigger Logger, hall sensor | Sensor not powered or not grounded, no pull-up, or the wrong kind of input |
| No edges at all, VR sensor | Open coil or broken wire, wrong kind of input, or the signal too weak at cranking speed (sensor too far from the wheel) |
| VR won't sync or keeps losing sync, and the rising edges around the missing tooth look distorted in the Trigger Logger | VR wires reversed. Swap them |
| VR with invert turned on: unreliable sync, or timing that moves with RPM | Invert must be off with a MAX9924 or MAX9926 |
| Hall timing out by a few degrees after changing invert | Expected. Inverting moves every event by a tooth width. Recheck **Trigger Angle Advance** |
| A type that uses both edges, such as **Miata NA**, won't sync with a clean signal | Invert setting wrong for that pattern |

## Related

- [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works)
- [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)
- [Cam Sync](/Base-Engine/Trigger/Cam-Sync)
- [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting)
- [VR Threshold](/Base-Engine/Trigger/VR-Threshold)

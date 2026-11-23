# Tachometer Output

FOME can drive an external tachometer by producing a pulse train that follows engine speed. Use it for a factory or aftermarket tach that takes an ignition-style pulse signal.

Settings are under **Outputs > Tachometer output**.

## How it works

The ECU outputs a square wave on the chosen pin. The frequency is set by RPM and **Pulse per Rev**. The high time is either a fixed duration or a fixed duty cycle, depending on **Pulse Mode**. Below 1 Hz the output is held off.

For a typical coil-driven tach, the pulses per revolution is the number of cylinders divided by two. For example a 4 cylinder wants 2.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Output | - | Pin the tach signal comes out on. Leave unassigned to disable |
| Output mode | - | Polarity and drive type of the output |
| Pulse Mode | - | **Duty cycle** or **Constant time** |
| Pulse duration | - | High time in ms, or duty cycle as a fraction in duty mode |
| Pulse per Rev | - | Pulses per crankshaft revolution. Must be between 1 and 10 |
| Startup sweep time | s | Total time of the startup needle sweep. 0 disables it |
| Startup sweep RPM | rpm | Highest RPM the needle sweeps to |

### Pulse Mode

In **Constant time** mode, the signal stays high for **Pulse duration** milliseconds on every pulse, so the duty cycle changes with RPM. In **Duty cycle** mode, **Pulse duration** is a fraction of each period, so 0.5 gives 50%.

If the requested high time exceeds the pulse period, the duty is clamped to 100% and a warning is raised. Reduce the pulse duration if this happens at high RPM.

### Startup sweep

When the ignition comes on and **Startup sweep time** is not 0, the output sweeps from 0 up to **Startup sweep RPM** and back down to the actual RPM over that time. The ramp down always lands on the current RPM, so it is safe if the engine starts mid-sweep.

## Setup

1. Set **Output** and **Output mode** for your wiring. If the tach needs a pull-up or an open-collector output, choose the matching mode.
2. Set **Pulse per Rev** for your tach and cylinder count.
3. Start with **Constant time** and a pulse duration of a couple of ms, or **Duty cycle** with 0.5. Adjust until the tach reads steadily.
4. Compare the tach with the **RPM** gauge at idle and at a higher speed.

## Checking it works

The tach reading should track the **RPM** gauge at all speeds. If it reads a fixed multiple, correct **Pulse per Rev**.

## If it fails

- With **Output** unassigned, the tach output is not started and nothing is generated.
- A **Pulse per Rev** of 0 or above 10 raises a fatal firmware error.
- With no RPM the frequency is below 1 Hz, so the output goes idle.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Tach reads half or double | **Pulse per Rev** wrong |
| Tach reads low at high RPM | Pulse duration too long for the period, or the tach needs a different signal type |
| No signal at all | **Output** not set, or **Output mode** wrong for the wiring |
| Needle sweeps at every key-on | **Startup sweep time** is not 0 |

## Related

- [Fault Codes](/Limits-And-Protections/Fault-Codes)

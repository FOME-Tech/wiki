# Main Relay

The main relay powers the ECU's loads (injectors, coils, sensors and so on) from the battery. On boards that support it, FOME switches the relay itself, so it closes when the ignition is on and stays closed briefly after the key is turned off.

Settings are under **Outputs > Main relay output**.

## How it works

Whether the ECU drives the relay depends on the board. On boards built with main relay control, FOME treats the ignition as on when the battery voltage input reads above 5 V, and turns the relay on. The ECU itself must be powered from a permanent supply so it can switch the relay on and keep running after key-off. On other boards the main relay is wired straight to the ignition switch, or is fixed in hardware, and the ECU does not decide anything.

When the ignition voltage disappears, the relay is held on for 1 second before it is released. This stops a brief voltage dip, such as the one when the starter engages, from cutting power to the ECU.

If the board has a main relay voltage sense input, the ECU also checks the relay. Half a second after the relay turns on, if that input reads more than 3 V below battery voltage, it sets fault P0612 (see [Fault Codes](/Limits-And-Protections/Fault-Codes)).

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Output | - | Pin that drives the main relay coil |
| Output mode | - | Polarity and drive type of the output |

On microRusEFI the relay is hard wired, so this dialog shows a message instead of the fields.

## Setup

1. Set **Output** to the pin your board uses for the main relay, and **Output mode** to match the relay driver. Your board's pinout or default tune has the right values.
2. Burn, then switch the ignition on. The **Main relay on** indicator should light.

## Checking it works

- The **Main relay on** indicator shows the relay is being commanded on.
- **Bench Test** has a **Main Relay** button on boards where the ECU controls the relay. See [Bench Test](/Basic-Features/Bench-Test). It changes the relay for about a second, so use it with care, because the ECU may lose power.
- Turn the ignition off and check that the ECU stays powered for about a second before shutting down.

## If it fails

- If no main relay pin is set, no output is switched. The ECU still tracks the relay state internally from the ignition voltage, so everything else behaves as usual.
- The ignition is detected from the battery voltage input. If that input is not working or is misconfigured, the ECU reads 0 V and never turns the relay on.
- A stepper idle valve cannot move when the main relay is off, because it needs the switched supply. The ECU does not wait for the stepper to park before releasing the relay, so it only gets the 1 second hold.
- With a main relay voltage sense input fitted, a relay that fails to close sets P0612.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Relay never closes | Battery voltage input not reading, or **Output** not set |
| Relay clicks off during cranking | Battery voltage dipping below 5 V for longer than the 1 second hold |
| P0612 | Relay, its fuse or the feed wiring to the sense input |

## Related

- [Fuel Pump Control](/Basic-Features/Fuel-Pump-Relay)
- [Bench Test](/Basic-Features/Bench-Test)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

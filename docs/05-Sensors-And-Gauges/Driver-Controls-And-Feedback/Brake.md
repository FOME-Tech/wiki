# Brake

FOME can read a brake pedal switch. The state is shown on the dashboard and can be read from Lua scripts. No built-in control feature uses it yet.

The setting is under **Sensors > Misc sensors**.

## How it works

The brake switch is a digital input, wired and configured the same way as the clutch switches. See [Clutch](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch) for what **inverted** and **mode** do. The brake state is on when the pin reads active, after the **inverted** flip. The **Brake down** dashboard indicator shows it.

If no pin is set, the brake state comes from the first of these that is available:

1. CAN: when CAN vehicle speed input is enabled and the selected vehicle type broadcasts a brake switch, the most recent value is used. It is ignored if no such message has arrived in the last 0.5 s.
2. A Lua script, which can set the state.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Brake pedal switch | - | Pin for the brake switch |
| Brake pedal switch inverted | - | Flips the logic |
| Brake pedal switch mode | - | Pull resistor for the pin |

## Setup

1. Set the pin, then **Mode** and **inverted** to suit the wiring. A switch that connects the pin to ground needs **PULLUP** and **inverted** ticked.
2. Press the brake and check that the **Brake down** indicator comes on.

## Related

- [Clutch](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch)
- [Lua Scripting](/Lua/Lua-Scripting)

# Clutch

FOME can read the clutch pedal with on/off switches (clutch down and clutch up), with an analog position sensor, or with both. Whatever is fitted is combined into one clutch state: engaged, slipping or released. Gear detection, **Disable fuel cut on clutch** and clutch-activated launch control all use that state. All the inputs are optional.

Switch settings are under **Sensors > Misc sensors**. The position sensor is under **Sensors > Clutch position sensor**.

## How it works

### Switches

Each switch is a digital input. The ECU reads the pin level and, if **inverted** is ticked, flips it. The result is what FOME calls the clutch down or clutch up state, shown by the **Clutch down** and **Clutch Up** dashboard indicators. With no pin set, the switch is treated as not fitted.

Each digital input has three settings:

| Setting | Description |
| --- | --- |
| Input pin | Which pin the switch is wired to. |
| Inverted | Flips the logic. Without it, a high level means the switch is active. |
| Mode | The ECU's internal resistor on the pin: **DEFAULT** (none, the pin floats), **PULLUP** (pulled to 5 V) or **PULLDOWN** (pulled to ground). |

The usual wiring is a switch that connects the pin to ground. Use **PULLUP** so the pin reads high when the switch is open, and tick **inverted** so a closed switch counts as active. A switch that connects the pin to a supply voltage needs **PULLDOWN** and no inversion. The same three settings apply to the brake switch and to the other switch inputs in FOME.

### Position sensor

The sensor is a potentiometer or similar that outputs a voltage proportional to pedal travel. FOME converts it to a percentage, where 0 % is the pedal released and 100 % is the pedal on the floor, using the two voltages you enter. The result is the **Clutch position** channel, and the raw voltage is **Raw Clutch Position**. Clutch position can also be used as an axis for GPPWM outputs and other configurable tables.

### Clutch state

If the position sensor is fitted, reads normally, and its two thresholds are in order, it decides the clutch state on its own and the switches are ignored:

| Clutch position | Clutch state |
| --- | --- |
| Below **Clutch applied (engaged) below** | Engaged |
| Between the two thresholds | Slipping |
| Above **Clutch released (disengaged) above** | Released |

Otherwise the switches decide. A single switch can't tell all three positions apart, so it only says what it can:

| Switches fitted | Up switch on | Neither on | Down switch on |
| --- | --- | --- | --- |
| Both | Engaged | Slipping | Released |
| Up only | Engaged | Slipping or released | - |
| Down only | - | Engaged or slipping | Released |

If both switches are on at the same time, the pedal can't be in both places, so the clutch state is unknown and a warning is set. With no usable input the state is also unknown.

A Lua script can stand in for the clutch up switch with `setClutchUpState`. It only counts once the script has called it, and only when no **Clutch Up** pin is set. See [Lua Scripting](/Lua/Lua-Scripting).

### What uses it

- **Disable fuel cut on clutch** blocks [DFCO](/Fuel/Fuel-Settings/DFCO) whenever the clutch is known not to be fully engaged: slipping, released, or "slipping or released" from an up switch alone. A down switch alone blocks it only with the pedal on the floor.
- Launch control in the **Clutch pressed** activation mode needs the clutch known to be released: the position sensor above the released threshold, or the down switch on. An up switch alone can't activate it. See [Launch Control](/Air-Path/Launch-Control).
- Gear detection holds the current gear through a shift while the clutch is in, instead of flickering through other gears as the revs change. With a single switch it assumes the switch trips where the clutch starts or stops driving the wheels. If the clutch reading doesn't match what the car is doing, for example the clutch reads pressed while engine speed clearly follows road speed, gear detection stops trusting it and goes by the gear ratio alone. It trusts the clutch again after a full clean cycle: pedal in with the engine free-revving, then pedal out in gear.

## Settings

### Other Sensor Inputs

| Setting | Units | Description |
| --- | --- | --- |
| Clutch Down | - | Pin for a switch that is active when the pedal is all the way down |
| Clutch Down inverted | - | Flips the clutch down logic |
| Clutch Down mode | - | Pull resistor for the clutch down pin |
| Clutch Up | - | Pin for a switch that is active when the pedal is all the way up |
| Clutch Up inverted | - | Flips the clutch up logic |
| Clutch Up mode | - | Pull resistor for the clutch up pin |

### Clutch position sensor

| Setting | Units | Description |
| --- | --- | --- |
| Input | - | Analog input the sensor is wired to |
| Released (pedal up) voltage | V | Sensor voltage with the pedal released. Reads 0 % |
| Pressed (on the floor) voltage | V | Sensor voltage with the pedal on the floor. Reads 100 % |
| Clutch applied (engaged) below | % | Below this position the clutch is treated as fully engaged |
| Clutch released (disengaged) above | % | Above this position the clutch is treated as fully disengaged |

The two thresholds must have the applied value below the released value. If they don't, the sensor isn't used for the clutch state and the switches decide instead.

## Setup

### Setting up a switch

1. Set the pin, then set **Mode** and **inverted** to suit the wiring (see above).
2. Press the pedal and watch the **Clutch down** or **Clutch Up** indicator. Swap **inverted** if it is backwards.
3. To use the clutch with DFCO, tick **Disable fuel cut on clutch** in the coasting fuel cut settings. That option only appears once a clutch switch or the position sensor is set.
4. To use it for launch, set the launch **Activation Mode** to **Clutch pressed**. This needs a clutch down switch or the position sensor.

For gear detection, the closer each switch trips to where the clutch actually starts and stops driving the wheels, the better. An up switch that turns off within the pedal's free play can make gear detection distrust the clutch, for example when you drive with your foot resting on the pedal.

### Setting up the position sensor

1. Set **Input**.
2. With the pedal released, read **Raw Clutch Position** and enter it as **Released (pedal up) voltage**. Repeat with the pedal on the floor for **Pressed (on the floor) voltage**.
3. Check that **Clutch position** reads about 0 % released and 100 % pressed.
4. Set the two thresholds from the position where the clutch starts and stops biting.

## Checking it works

Watch the **Clutch down** and **Clutch Up** indicators on the dashboard while pressing the pedal. For the sensor, log **Clutch position** and **Raw Clutch Position**.

The combined clutch state is logged as three channels: **Clutch: may be engaged**, **Clutch: may be middle** (slipping) and **Clutch: may be disengaged**. Exactly one is on when FOME knows the position, two are on when a single switch can't tell them apart, and all three are on when the state is unknown. Lua scripts can read the same state with `getClutchState()`.

## If it fails

If the position sensor fails, the clutch state falls back to the switches. With no switches it becomes unknown. An unknown clutch doesn't block DFCO, doesn't activate launch, and gear detection goes by the gear ratio alone.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Indicator is on with the pedal released, off when pressed | **Inverted** is wrong |
| Indicator is random or flickers | **Mode** is **DEFAULT** with a floating input. Use **PULLUP** or **PULLDOWN** to suit the wiring |
| Warning that the clutch up and down switches are both on | One switch has **inverted** set wrong, or a wiring fault |
| DFCO never activates | **Disable fuel cut on clutch** is ticked and the clutch never reads fully engaged. Check the up switch, or that **Clutch applied (engaged) below** is above the released-pedal reading |
| Launch never activates in **Clutch pressed** mode | No clutch down switch or position sensor, or **Clutch released (disengaged) above** is higher than the pedal reaches |
| **Clutch position** is backwards | The released and pressed voltages are swapped |

## Related

- [Brake](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Brake)
- [DFCO](/Fuel/Fuel-Settings/DFCO)
- [Launch Control](/Air-Path/Launch-Control)

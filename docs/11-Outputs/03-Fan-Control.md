# Fan Settings

FOME can control two cooling fans, each on its own output. Each fan can switch on and off with coolant temperature, or run at a variable speed from a table. You can also run a fan with the A/C, stop it at speed or while the engine is stopped, and add idle air to cover the electrical load. Settings are under **Base Engine > Fans**.

## How it works

Each fan is decided independently, from the same list of conditions. The first condition that applies wins:

1. **Test Fan** was pressed in the last 3 seconds: the fan runs, whatever else is true.
2. Ignition is off: the fan is off.
3. The engine is cranking: the fan is off.
4. **Disable when engine stopped** is on and the engine isn't running: the fan is off.
5. The [coolant temperature sensor](/Sensors-And-Gauges/Temperature-Sensors/CLT) has failed: the fan is on.
6. Vehicle speed is above **Disable above speed**: the fan is off.
7. **Enable with AC** is on and the A/C is on: the fan is on.
8. Coolant is above **On temperature**: the fan is on.
9. Coolant is below **Off temperature**: the fan is off.
10. Coolant is between the two: the fan keeps its previous state.

The gap between the on and off temperatures is the hysteresis. It stops the fan flicking on and off around a single temperature.

The fan state group in your log shows which of these conditions is active: engine stopped, broken CLT, enabled for AC, hot, cold and above disable speed.

### PWM fans

With **Fan control type** set to **PWM**, the conditions above still decide whether the fan should run. When it should, the duty comes from a table instead of being 100%. When it shouldn't, the duty is 0%. A table cell of 0% counts as the fan being off.

Each fan has one table for A/C off and one for A/C on, under **Base Engine > Fans > PWM fans**. The A/C on table is used whenever the A/C is on, even if **Enable with AC** is off for that fan. The tables are indexed by coolant temperature and by a second source that you pick with **PWM table X axis**, such as vehicle speed.

If the coolant sensor fails, or the chosen X axis source isn't available, the fan runs at **Safety duty**.

### Disable above speed

Set **Disable above speed** to stop a fan once ram air is cooling the radiator. It only takes effect when the ECU has a valid vehicle speed reading. If the speed sensor is missing or fails, the fan is never turned off because of speed. A value of 0 turns the feature off.

### Idle adder

Fans draw a lot of current, which loads the alternator and the engine. **Idle adder** adds idle position while that fan's output is on. It is applied to the open loop idle position along with the A/C adder, as described in [Idle Settings](/Idle-Control/Idle-Settings).

## Settings

Each fan has its own dialog, **Fan 1** and **Fan 2**.

| Setting | Units | Description |
| --- | --- | --- |
| Output | | The pin that drives the fan relay or fan. |
| Output mode | | Default turns the relay on with a high output. Default inverted switches to ground when on. The open collector modes are only needed if the relay runs at a different voltage to the ECU, and may need an external pull-up resistor or protection diode. Hidden in PWM mode. |
| Fan control type | | **On/Off** or **PWM**. |
| On temperature | C | Coolant temperature above which the fan turns on. |
| Off temperature | C | Coolant temperature below which the fan turns off. |
| PWM table X axis | | The second axis of the PWM duty tables. Only shown in PWM mode. |
| Enable with AC | | Run the fan whenever the A/C is on. |
| Disable when engine stopped | | Keep the fan off while the engine is not running. |
| Disable above speed | kph | Keep the fan off above this vehicle speed. 0 turns it off. |
| Idle adder | % | Idle position added while this fan is on. |

**PWM Settings** applies to both fans and is only shown when either one uses PWM.

| Setting | Units | Description |
| --- | --- | --- |
| PWM frequency | Hz | Switching frequency of the fan outputs in PWM mode. Check what your fan or driver module expects. |
| Safety duty | % | Duty used if the coolant sensor fails in PWM mode. |

## Setup

1. Set **Output** and **Output mode** for each fan, then use **Test Fan 1** and **Test Fan 2** to check each one. The button runs the fan for a few seconds, even with the engine off.
2. Set the temperatures. A reasonable start is the main fan on at 95 °C and off at 93 °C, and the second fan on at 100 °C and off at 98 °C. Keep about 2 °C between a fan's on and off values. The right values depend on your car.
3. Turn on **Enable with AC** for both fans. The A/C adds heat in the condenser, which the fans need to move away.
4. Leave **Disable when engine stopped** off unless you have a reason to use it.
5. Set the idle adders. Watch the idle position on a TunerStudio gauge with closed loop idle on, and turn each fan on in turn with **Test Fan**. Note how far the idle position rises, and enter that as the **Idle adder** for the fan.
6. For PWM fans, set **Safety duty** high enough to cool the engine, then fill in the duty tables. Start with 0% below the cooling threshold and rise to 100% at the top of your safe operating range.

:::note
If **Enable with AC** is on, the A/C idle adder and the fan adders add together when the A/C is on. Either keep the A/C adder low, or use only the A/C adder and leave the fan adders at 0.
:::

## Checking it works

- Watch the fan indicators in the **Fan Settings** dialog, or the fan on/off state in your log, to see when each fan is on.
- In PWM mode, log the fan duty and the X axis value, and check the duty follows the table.
- Check that the fan comes on near the **On temperature** and goes off near the **Off temperature**.

## If it fails

- **Coolant sensor failed:** the fan runs. In PWM mode it runs at **Safety duty**. This overrides **Disable above speed**, **Enable with AC** and the temperature thresholds. Ignition off, cranking, **Disable when engine stopped** and the 3 s fan test still take priority.
- **Vehicle speed sensor missing or failed:** **Disable above speed** has no effect, and the fan follows the other conditions.
- **PWM X axis source not available:** a fan that should run does so at **Safety duty**.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Fan runs all the time | The coolant sensor has failed. See [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT). |
| Fan stops when driving | **Disable above speed** is set below your road speed. |
| Fan doesn't come on with the A/C | **Enable with AC** is off, or the A/C isn't running. See [Air Conditioning Settings](/Outputs/Air-Conditioning-Settings). |
| Fan flicks on and off | On and off temperatures are too close together. |
| Fan is off with the key on and the engine stopped | **Disable when engine stopped** is on. |
| Test Fan does nothing | Wrong **Output** or **Output mode**, or wiring. |
| PWM fan doesn't change speed | **Fan control type** isn't **PWM**, or the duty table has the same value everywhere. |

## Related

- [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT)
- [Air Conditioning Settings](/Outputs/Air-Conditioning-Settings)
- [Idle Settings](/Idle-Control/Idle-Settings)

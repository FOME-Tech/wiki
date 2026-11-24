# Fuel Level

FOME can read a fuel tank level sender, such as the float sender in a factory tank, and show the result as a percentage. It's for information only. No fuel or engine control feature uses it, so you only need it if you want a fuel gauge in TunerStudio, a dash on CAN, or a Lua script or output that reacts to fuel level.

Settings are under **Sensors > Fuel level sensor**.

## How it works

The sender, usually a variable resistor, is read as a voltage on an analog input. FOME looks the voltage up in a curve of up to eight points that you fill in, and interpolates between them to get a percentage. A reading beyond the first or last point stays at that end's value.

The input is heavily filtered (a 2 Hz low-pass) so the reading is steady, but fuel slosh can still move it. Most boards have no dedicated fuel level input, so you'll need a spare analog input, and a pull-up or voltage divider suited to your sender.

The percentage is available in logs, to the CAN dash outputs, to general purpose PWM outputs as an axis, and to Lua scripts.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Input channel | - | Analog input the sender is wired to. Leave unset if there is no sender |
| Fuel Level curve, Voltage | V | Sender voltage at each of the eight points. Keep them in ascending order |
| Fuel Level curve, % | % | Fuel level at each voltage |

## Setup

1. Wire the sender so that the input voltage moves between roughly 0 V and 5 V across its range. A sender is usually a resistor, so it needs a fixed resistor from 5 V to make a divider.
2. Set **Input channel**.
3. With the tank empty, note the raw voltage and enter it with 0%. Repeat with the tank full for 100%.
4. Add points in between if the sender isn't linear. Add them by putting a known amount of fuel in the tank, and note the voltage at each stage.
5. Burn, then check the gauge.

## Checking it works

The curve screen shows the **Fuel level** gauge. In logs the channels are **Fuel level** and **Raw: Fuel level** (the input voltage). Check that it reads close to 0% on empty, near 100% on full, and moves smoothly as you add fuel.

## If it fails

No fault code is set for this sensor. If the input stops updating for 500 ms the reading becomes invalid. Because the voltage-to-percentage curve accepts any voltage, a shorted or open sender doesn't fail, it just reads the percentage at the end of the curve.

When invalid, **Fuel level** reads 0%, the CAN outputs report 0, general purpose PWM outputs using it as an axis use their error duty, and the reading is nil in Lua. With no input selected, the sensor doesn't exist.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads a steady 0% or 100% | Sender unplugged or shorted, or the curve voltages don't cover the sender's range |
| Reading wanders with cornering and braking | Fuel slosh. The filter is already slow, so there is little more that can be done |
| Reading wrong between empty and full | Sender isn't linear. Add more curve points |

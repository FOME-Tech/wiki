# Coolant Temperature

The coolant temperature (CLT) sensor tells the ECU how warm the engine is. It is one of the most important inputs FOME has. Warm-up and cranking fuel, idle speed, fans, timing corrections and several enable conditions all depend on it, so get it right before tuning anything that changes with temperature.

Settings are under **Sensors > CLT sensor**.

## How it works

Almost every coolant sensor is an NTC thermistor: its resistance falls as it gets hotter. The ECU feeds the sensor through a pull-up resistor from 5 V and measures the voltage in between. From that voltage it works out the sensor's resistance, then converts resistance to temperature using a curve fitted through the three calibration points you enter.

The voltage therefore falls as the engine warms up. With a typical pull-up of around 2.5 kΩ, expect roughly 3 V on a cold engine and under 1 V at operating temperature.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Input channel | - | Analog input the sensor is wired to |
| Pullup resistor | Ohm | Value of the pull-up resistor on the ECU board. Hidden on boards where it is fixed |
| Common CLT Sensors | - | Presets that fill in all three calibration points for common sensors |
| Lowest temperature / Resistance @ LT | C / Ohm | First calibration point |
| Middle temperature / Resistance @ MT | C / Ohm | Second calibration point |
| Highest temperature / Resistance @ HT | C / Ohm | Third calibration point |
| Linear characteristic | - | Treat the input as a linear voltage sensor instead of a thermistor (see below) |
| DTC P0117 severity | - | What to do when the input is shorted to ground (see [Fault Codes](/Limits-And-Protections/Fault-Codes)) |
| DTC P0118 severity | - | What to do when the input is open circuit |

### Calibration points

The three points must be in ascending temperature order: lowest, then middle, then highest. If they aren't, the ECU raises a fatal configuration error (P0111) and won't run the engine until you fix it.

Spread the points across the range you care about, for example one around 0 °C, one around 40 °C and one around 90 °C. The curve is most accurate near the points, so put one close to normal operating temperature.

If your sensor isn't in the presets, the resistance-vs-temperature table is usually in the factory service manual or the sensor datasheet. You can also measure it: put the sensor in water alongside a thermometer, and read its resistance with a multimeter at three temperatures.

### Pullup resistor

This must match the resistor fitted on the ECU board. A wrong value skews the reading everywhere, worst at the hot and cold ends. FOME boards with a fixed pull-up hide this field and set it for you. On other boards, check the board's documentation.

### Linear characteristic

This is for the rare sensor with a linear voltage output instead of a thermistor. When it is on, the **Resistance @ LT** and **Resistance @ MT** fields are read as the sensor's output voltage, in volts, at the lowest and middle temperatures. The highest point is ignored. Leave it off for a normal thermistor.

## Setup

1. Set **Input channel** to the pin the sensor is wired to (see your board's pinout).
2. If your sensor is listed in **Common CLT Sensors**, pick it. Otherwise enter the three calibration points from the sensor's data.
3. If **Pullup resistor** is shown, set it to your board's value.
4. Burn, then check the reading against reality (below).

## Checking it works

The dialog shows two gauges: **Coolant temp** and **Raw CLT** (the input voltage). In logs, the channels are **CLT** and **Raw: CLT**.

- On an engine that has sat overnight, CLT should read close to IAT and the outside air temperature.
- Once the engine is warm, CLT should settle around the thermostat's opening temperature. Compare it with the factory gauge or an infrared thermometer on the thermostat housing.
- A raw voltage stuck near 0 V or 5 V means a wiring fault, not a calibration problem.

## If it fails

The ECU treats the sensor as failed if the input is below 0.05 V (shorted, P0117), above about 4.9 V (open circuit, P0118), not being sampled at all (P0115), or if the calculated temperature is outside -50 to 250 °C. The fault is logged and the MIL lit as set by the DTC severity settings. While the sensor is failed, the **Coolant temp** gauge reads 0 °C.

The engine keeps running, but everything that uses CLT falls back to a safe value:

| Feature | With a failed CLT sensor |
| --- | --- |
| Fans | Run continuously, except while cranking, with ignition off, or with the engine stopped if **Disable when engine stopped** is set |
| Cranking fuel | Uses the 20 °C value of the cranking CLT multiplier |
| Warm-up fuel (CLT multiplier) | No correction applied. A cold engine will run lean |
| Priming pulse | Skipped. The engine may take a little longer to start |
| After-start enrichment table | Uses the 0 °C row |
| Idle | Target RPM, open-loop position and cranking taper use their 0 °C values, giving a high but safe idle |
| Ignition CLT correction | No correction applied |
| Charge temperature estimate | Uses IAT alone |
| CLT-based rev limit | Uses the 0 °C value |
| Closed-loop fuel, DFCO, air conditioning | Disabled |
| VVT hold duty | Uses oil temperature if available, otherwise assumes 80 °C |
| Wall wetting | Assumes 90 °C |
| CAN dash / OBD output | Reports 0 °C |

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 °C and won't change, **Raw CLT** near 5 V, P0118 | Sensor unplugged, broken wire, or wrong input channel |
| Reads 0 °C and won't change, **Raw CLT** near 0 V, P0117 | Signal shorted to ground, or a damaged sensor |
| Reads sensibly but consistently a few degrees off | Wrong preset or calibration points |
| Correct near one temperature, wrong at the extremes | Wrong pull-up value, or calibration points bunched together |
| P0111 critical error at power-up | Calibration temperatures not in ascending order |
| Reading jumps around with the engine running | Poor sensor ground. Ground the sensor at the ECU's sensor ground, not the block |

## Related

- [Fault Codes](/Limits-And-Protections/Fault-Codes)
- [Fan Control](/Outputs/Fan-Control)
- [CLT RPM Limit](/Limits-And-Protections/CLT-RPM-Limit)
- [Intake Air Temperature](/Sensors-And-Gauges/Temperature-Sensors/IAT)

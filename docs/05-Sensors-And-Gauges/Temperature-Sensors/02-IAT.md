# Intake Air Temperature

The intake air temperature (IAT) sensor tells the ECU how warm the air entering the engine is. Warmer air is less dense, so the ECU uses IAT to correct fuelling and ignition timing, and as part of its charge temperature estimate for speed density. See [IAT Multiplier](/Fuel/Fuel-Settings/IAT_Multiplier) for the fuel correction itself.

Settings are under **Sensors > IAT sensor**.

## How it works

The IAT sensor is nearly always an NTC thermistor, wired exactly like the coolant sensor: a pull-up resistor from 5 V, the sensor to ground, and the ECU measuring the voltage in between. Resistance is calculated from that voltage, then converted to temperature using a curve fitted through the three calibration points you enter. The mechanics are the same as on the [CLT](/Sensors-And-Gauges/Temperature-Sensors/CLT) page.

Place the sensor where it sees the air going into the engine, and away from heat sources. A sensor mounted in a hot intake manifold or on the engine will read high and lean the mixture out.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Input channel | - | Analog input the sensor is wired to |
| Pullup resistor | Ohm | Value of the pull-up resistor on the ECU board. Hidden on boards where it is fixed |
| Common IAT Sensors | - | Presets that fill in all three calibration points for common sensors |
| Lowest temperature / Resistance @ LT | C / Ohm | First calibration point |
| Middle temperature / Resistance @ MT | C / Ohm | Second calibration point |
| Highest temperature / Resistance @ HT | C / Ohm | Third calibration point |
| Linear characteristic | - | Treat the input as a linear voltage sensor instead of a thermistor (see below) |
| DTC P0112 severity | - | What to do when the input is shorted to ground (see [Fault Codes](/Limits-And-Protections/Fault-Codes)) |
| DTC P0113 severity | - | What to do when the input is open circuit |

### Calibration points

The three temperatures must be in ascending order, or the ECU raises a fatal configuration error (P0111) and won't run the engine. Choose points that span the air temperatures you will see, for example one near 0 °C, one near 40 °C and one near 80 °C. If your sensor isn't in the presets, find its resistance table in the service manual or datasheet, or measure it at three temperatures.

### Pullup resistor

This must match the resistor fitted on the ECU board. A wrong value skews the reading, most at the hot and cold ends.

### Linear characteristic

For the rare sensor with a linear voltage output. When on, **Resistance @ LT** and **Resistance @ MT** are read as the sensor's output voltage in volts at the lowest and middle temperatures, and the highest point is ignored.

## Setup

1. Set **Input channel** to the pin the sensor is wired to.
2. Pick your sensor in **Common IAT Sensors**, or enter the three calibration points from its data.
3. If **Pullup resistor** is shown, set it to your board's value.
4. Burn, then check the reading (below).

## Checking it works

The dialog shows the **Intake air temp** and **Raw IAT** (input voltage) gauges. In logs the channels are **IAT** and **Raw: IAT**. The **IAT OK** indicator turns red when the sensor has failed.

- With the engine cold and soaked, IAT should match CLT and the outside air temperature.
- With the engine running, IAT should rise a little with heat soak but stay well below CLT. An IAT that tracks CLT closely suggests the sensor is mounted in the wrong place.
- Raw voltage stuck near 0 V or 5 V means a wiring fault, not a calibration problem.

## If it fails

The ECU treats the sensor as failed if the input is below 0.05 V (shorted, P0112), above about 4.9 V (open circuit, P0113), not being sampled (P0110), or if the calculated temperature is outside -50 to 250 °C. The fault is logged and the MIL lit as set by the DTC severity settings. While failed, the **Intake air temp** gauge reads 0 °C.

The engine keeps running, and each feature falls back as follows:

| Feature | With a failed IAT sensor |
| --- | --- |
| IAT fuel multiplier | No correction applied |
| Ignition IAT correction | No correction applied |
| Charge temperature estimate | If CLT is valid, assumes an intake temperature of 0 °C. If CLT has also failed, reports 0 °C |
| Alpha-N fuel algorithm | If **Alpha-N uses IAT density correction** is on, assumes 20 °C |
| MAF airmass limit | Assumes 20 °C |
| Torque-based throttle control | Assumes 20 °C |
| Throttle flow estimate | Not available |
| General purpose PWM using IAT as an axis | Output uses its **Duty if error** value |
| CAN dash / OBD output | Reports 0 °C |

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Reads 0 °C and won't change, **Raw IAT** near 5 V, P0113 | Sensor unplugged, broken wire, or wrong input channel |
| Reads 0 °C and won't change, **Raw IAT** near 0 V, P0112 | Signal shorted to ground, or a damaged sensor |
| Reads consistently a few degrees off | Wrong preset or calibration points |
| Correct at one temperature, wrong at the extremes | Wrong pull-up value, or calibration points bunched together |
| P0111 critical error at power-up | Calibration temperatures not in ascending order |
| Reads far above outside air when cold | Sensor in the wrong place, or the wrong preset |

## Related

- [Fault Codes](/Limits-And-Protections/Fault-Codes)
- [IAT Multiplier](/Fuel/Fuel-Settings/IAT_Multiplier)
- [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT)
- [General Purpose PWM](/Outputs/GPPWM)

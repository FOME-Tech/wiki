# Redundant Sensors

An electronic throttle and its accelerator pedal each have two sensor tracks measuring the same thing. FOME compares the two all the time, and only trusts the reading while they agree. This is what stops a single failed sensor from opening the throttle. Both pairs must be configured for the electronic throttle to run.

The settings are in **Sensors > TPS** (**TPS Redundancy**) and **Sensors > Accelerator pedal** (**Pedal Redundancy**). Calibrating the tracks is covered on [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS) and [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP).

## How it works

Each track is first converted to a percentage using its own calibration, so the tracks don't need the same voltage range or even the same direction. A pair might be 0.5 to 4.5 V and 4.5 to 0.5 V, or one track might cover half the voltage range of the other. All that matters is that both are linear and correctly calibrated.

The two percentages are then checked against each other. The allowed difference is 5 %. If either track has failed (out of range or not being read), or they disagree by more than that, the combined reading is invalid and the ECU sets a fault code. What the throttle does then is described under [If it fails](/Advanced-Features/ETB/ETB-Setup#if-it-fails).

### Full redundancy

Most sensors have two tracks that each cover the whole travel. While they agree, FOME uses the average of the two.

### Partial redundancy

Some sensors, mostly on Ford and Toyota throttles and pedals, have a second track that reaches its maximum well before the first. Above that point, the second track stays at its maximum and can't be compared with the first. With the normal settings, a sensor like this throws an error as soon as the throttle or pedal passes that point.

The **Partial Secondary TPS Maximum** and **Partial Secondary PPS Maximum** settings handle this. Set each to the first track's reading, in percent, at the point where the second track reaches its maximum. Calibrate the second track's min and max as normal: closed, and where it stops rising (or falling). With partial redundancy on:

- Below the switch-over point (95 % of the second track's travel), the second track is scaled to the first, and the two must agree to within 5 %.
- Above it, the first track must read at least the switch-over setting minus 5 %.
- The reading used is the first track's alone, not an average.

| Setting | Units | Description |
| --- | --- | --- |
| Partial Secondary TPS Maximum | % | First throttle track position at which the second track reaches its maximum. 0 or 100 for a normal, full-range sensor |
| Partial Secondary PPS Maximum | % | The same for the pedal |
| BRZ/FRS/GT86 pedal | - | Allow a pedal whose two tracks read the same. See [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP) |

Known values are about 53 % for Ford throttles (for example the 4M5G-EDLF15) and about 65 % for Toyota ETCS-i throttles. Values above 0 but below 20 % aren't allowed: the ECU raises a warning and uses 20 %.

While a partially redundant throttle is still on the normal settings, you can run auto calibrate, because it reads the raw voltages. PID autotune won't move the throttle until the error is gone.

## Setup

For a partially redundant sensor:

1. Calibrate both tracks' min and max as normal (auto calibrate does this for a throttle).
2. Turn on **Disable ETB Motor** and open the throttle (or press the pedal) slowly by hand, watching the second track's raw voltage.
3. Note the first track's percentage at the moment the second track stops changing. Enter it as **Partial Secondary TPS Maximum** (or **PPS Maximum**).
4. Burn, and check that the error is gone over the whole range of travel.

You can also start from a known value and adjust it until the error goes away across the travel, but this is less precise and may give faults when conditions change from the day you calibrated it.

## Checking it works

Log **tps1Split** (the first throttle track's percentage minus the second's) and **accPedalSplit** for the pedal, along with both raw track voltages. For a full-range sensor, the split should stay within a percent or two across the whole travel, not just at idle. For a partial sensor it grows above the switch-over point, which is expected.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| TPS or pedal error only above part travel | Partially redundant sensor on the normal settings. Set the partial maximum |
| Error only at the very top of the travel with the partial maximum set | Partial maximum set slightly too high, or the second track calibrated short of its real maximum |
| Correlation code (P2135, P2136, P2137) with both tracks reading sensibly | One track's calibration is wrong or has drifted. Recalibrate |
| Fatal error about the two sensors being too similar | One sensor wired to both inputs, or (pedal only) a pedal that needs **BRZ/FRS/GT86 pedal** |

## Related

- [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS)
- [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP)
- [Electronic Throttle Body](/Advanced-Features/ETB/ETB-Setup)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

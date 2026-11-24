# ETB Throttle Position Sensors

An electronic throttle has two position sensors (tracks) on the throttle shaft, so the ECU can tell when one of them is lying. FOME requires both: if an electronic throttle has only one track configured, the ECU raises a fatal configuration error at startup. This page covers wiring and calibrating the pair. How the two tracks are cross-checked, including throttles whose second track only covers part of the range, is on [Redundant Sensors](/Air-Path/ETB/Redundant-Sensors).

Settings are under **Sensors > TPS**, in the **Throttle Body #1** and **Throttle Body #2** panels. The general sensor page is [Throttle Position Sensor](/Sensors-And-Gauges/General-Sensors/TPS).

## How it works

Each track is converted to a percentage on its own, using its closed (**min**) and wide-open (**max**) readings. A track can rise or fall as the throttle opens. Many throttles have one of each, and that's fine, because each track has its own calibration. The two percentages are then compared, and the throttle position is only valid while they agree.

The calibration values are in TunerStudio's ADC units, where 1 V is 200 units, so 0.5 V is 100 and 4.5 V is 900.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Primary sensor | - | Analog input for the first track |
| Primary min | ADC | First track reading with the throttle closed |
| Primary max | ADC | First track reading with the throttle wide open |
| Secondary sensor | - | Analog input for the second track |
| Secondary min | ADC | Second track reading with the throttle closed |
| Secondary max | ADC | Second track reading with the throttle wide open |
| Auto Calibrate ETB 1 / ETB 2 | - | Button. Drives the throttle to both stops and fills in all four values |
| TPS minimum valid value, TPS maximum valid value | % | A track reading outside this range counts as failed. Shared with the pedal |
| Partial Secondary TPS Maximum | % | For throttles whose second track only covers part of the range. See [Redundant Sensors](/Air-Path/ETB/Redundant-Sensors) |

**Throttle Body #2** has the same fields, for the second throttle on twin-throttle engines. The **TPS Redundancy** panel appears once both tracks of a throttle are set. The auto calibrate buttons are enabled once an H-bridge is set to the matching throttle function and the primary sensor is set. They are also in the **PID Autotune** panel of the electronic throttle dialog.

## Auto calibrate

**Auto Calibrate ETB 1** (or **ETB 2**) measures all four values with the throttle's own motor:

1. The throttle is driven open for one second, and both tracks are read.
2. It is driven closed for one second, and both tracks are read again.
3. The motor is switched off, and the four values are sent to TunerStudio one after another over about two seconds. They appear in the fields as they arrive.
4. Burn.

It only runs with the engine stopped, and it stops straight away if the engine is turning. It works even with **Disable ETB Motor** on, and even while the throttle position is reading as failed, because it reads the raw voltages.

If the first track moves by less than 0.5 V, the ECU raises a fatal error saying that auto calibrate failed and to check your wiring, with the two voltages it saw. The motor didn't move the throttle: check the H-bridge function, pins and motor wiring.

:::warning
Auto calibrate assumes that positive drive opens the throttle. If the motor is wired backwards, it drives the throttle closed first, and the calibration comes out reversed: **Throttle position** reads near 100 % with the throttle closed. The throttle then drives itself open when it should close. Always check the calibrated reading by hand before using the throttle. If it's reversed, swap the two motor wires and calibrate again.
:::

### Manual calibration

You can also enter the values by hand. Turn on **Disable ETB Motor**, then read the **Raw TPS 1 Primary** and **Raw TPS 1 Secondary** gauges with the throttle held closed and held wide open. Multiply each voltage by 200 and enter it.

### Calibration checks

At startup, the ECU raises a fatal configuration error if:

- a track's min and max are less than 0.5 V apart, or
- both tracks have exactly the same min and max, which suggests a single sensor wired to both inputs.

## Setup

1. Wire both tracks to analog inputs, powered from the ECU's 5 V sensor supply and sensor ground.
2. Set **Primary sensor** and **Secondary sensor** under **Throttle Body #1**.
3. Set the H-bridge function to **Throttle 1** in the electronic throttle settings, and restart the ECU.
4. With the engine off and the ignition on, press **Auto Calibrate ETB 1**. Burn.
5. Turn on **Disable ETB Motor**, then open the throttle slowly by hand and check the readings (below). Turn it back off.
6. Repeat for **Throttle Body #2** if you have one.

## Checking it works

The dialog shows **Raw TPS 1 Primary**, **Raw TPS 1 Secondary** and the TPS 2 equivalents, in volts. In logs, the channels are **TPS**, **TPS2**, **Raw: TPS 1 primary**, **Raw: TPS 1 secondary** and **tps1Split** (the first track's percentage minus the second's).

- At rest with the motor off, **Throttle position** should read the throttle's spring rest position, usually a few percent.
- Closed should read about 0 % and wide open about 100 %, moving smoothly in between.
- For a throttle with two full-range tracks, **tps1Split** should stay within a percent or two over the whole range. FOME treats more than 5 % as a fault.
- The indicator should read **TPS OK**, not **TPS error**. A TPS error stops the throttle being driven (see [If it fails](/Air-Path/ETB/ETB-Setup#if-it-fails)).

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Fatal error at startup saying the electronic throttle requires the TPS to be redundant | **Secondary sensor** not set |
| Fatal error saying auto calibrate failed, check your wiring | The motor didn't move: wrong H-bridge function or pins, motor unplugged, or no power to the H-bridge |
| **Throttle position** reads near 100 % closed after auto calibrate | Motor wired backwards. Swap the motor wires and recalibrate |
| Fatal error about calibration values being too close together | Min and max less than 0.5 V apart, often a sensor not connected during calibration |
| TPS error, or code P2135, above part throttle only | A throttle with a partial-range second track. Set **Partial Secondary TPS Maximum** |
| TPS error comes and goes | Noisy or poorly grounded sensor, or a calibration that has drifted. Compare both raw voltages in a log |

## Related

- [Electronic Throttle Body](/Air-Path/ETB/ETB-Setup)
- [Redundant Sensors](/Air-Path/ETB/Redundant-Sensors)
- [Throttle Position Sensor](/Sensors-And-Gauges/General-Sensors/TPS)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

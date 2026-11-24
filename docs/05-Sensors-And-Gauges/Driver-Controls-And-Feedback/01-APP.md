# Accelerator Pedal

The accelerator pedal position (APP, also called PPS) sensor tells the ECU how far the driver is pressing the pedal. You need it for any drive-by-wire car, where the throttle is moved by a motor and the pedal is only an input. Without a pedal sensor, the ECU uses the throttle position sensor as the driver's input instead.

Settings are under **Sensors > Accelerator pedal**. The menu item is only shown on boards that support a pedal input.

## How it works

Pedal sensors are potentiometer-style sensors with a linear voltage output. The ECU reads the voltage and scales it to 0 % at the pedal-up voltage and 100 % at the pedal-down voltage. Drive-by-wire pedals have two independent tracks. FOME reads both, and checks that they agree before it trusts the result. The redundancy rules, including partial redundancy for pedals whose second track only covers part of the range, are on the [Redundant Sensors](/Air-Path/ETB/Redundant-Sensors) page.

The pedal position feeds the [ETB pedal target](/Air-Path/ETB/ETB-Pedal-Target) table, which decides where the throttle should be. While a pedal is configured, the same value is also what the rest of the ECU treats as the driver's throttle demand: DFCO, launch control, anti-lag, idle control and the idle ignition and VE blending all use it. With no pedal configured, they use [TPS](/Sensors-And-Gauges/General-Sensors/TPS) instead.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Primary Sensor | - | Analog input for the primary pedal track. Leave as none if there is no pedal sensor |
| Primary Up voltage | volts | Primary track voltage with the pedal released |
| Primary Down (WOT) voltage | volts | Primary track voltage with the pedal fully pressed |
| Grab Up / Grab Down | - | Buttons that capture the current voltage of both tracks as the up or down value |
| Secondary Sensor | - | Analog input for the secondary track. Required for electronic throttle control |
| Secondary Up voltage | volts | Secondary track voltage with the pedal released |
| Secondary Down (WOT) voltage | volts | Secondary track voltage with the pedal fully pressed |
| Partial Secondary PPS Maximum | % | For pedals whose second track only travels part of the range. See [Redundant Sensors](/Air-Path/ETB/Redundant-Sensors) |
| BRZ/FRS/GT86 pedal | - | Allows two tracks with nearly identical calibration |

The secondary fields only appear once a primary sensor is chosen, and the redundancy settings only appear once both sensors are chosen.

### Calibration voltages

The up and down voltages can be in either order, so a pedal whose voltage falls as it is pressed works without any special setting. If the up and down voltages of a track are less than 0.5 V apart, the ECU raises a fatal configuration error and won't run the engine. Check the wiring and recalibrate.

The pedal inputs read the raw sensor voltage, with no divider applied.

### BRZ/FRS/GT86 pedal

The ECU normally refuses to start if the primary and secondary calibrations are within 0.2 V of each other at both the up and down positions, because that usually means one sensor has been wired to both inputs, which defeats the redundancy. Some pedals really do have two tracks with the same voltage range. Turn this setting on for those only.

:::warning
Never enable this to get around a one-sensor-on-two-inputs wiring shortcut. The ECU can no longer detect a failed pedal if both inputs see the same signal.
:::

### Valid range

The pedal shares the **TPS minimum valid value** and **TPS maximum valid value** limits from the TPS dialog. A calculated position outside that window is treated as a failed sensor.

## Setup

1. Set **Primary Sensor** to the input the first track is wired to, and **Secondary Sensor** to the second track's input.
2. With the pedal released, click **Grab Up**. Watch **Raw Pedal Primary** and **Raw Pedal Secondary** to confirm both tracks move sensibly.
3. Press the pedal fully to the floor and click **Grab Down**.
4. If your pedal has a partial secondary track, set **Partial Secondary PPS Maximum**.
5. Burn, then check the readings (below).

## Checking it works

The dialog shows **Throttle pedal position**, **Raw Pedal Primary** and **Raw Pedal Secondary**. In logs the channels are **Throttle pedal position**, **Raw: Pedal primary** and **Raw: Pedal secondary**. There is also a **Pedal OK** indicator, which reads **Pedal error** while the pedal is failed.

- Released, the pedal should read 0 %, and fully pressed it should read 100 %.
- Moving the pedal slowly, the two raw voltages should track each other smoothly with no flat spots or dropouts.
- Readings slightly below 0 % or above 100 % are tolerated as long as they stay inside the valid range.

## If it fails

The pedal is treated as failed when either track is missing, out of range (outside the valid range above, or timed out), or when the two tracks disagree by more than the allowed difference. The ECU sets a diagnostic code, the **Pedal error** indicator turns on, and **Throttle pedal position** reads 0 %. Codes are listed on the [Fault Codes](/Limits-And-Protections/Fault-Codes) page:

| Code | Meaning |
| --- | --- |
| P2125 / P2127 / P2128 | Primary track timeout / too low / too high |
| P2130 / P2132 / P2133 | Secondary track timeout / too low / too high |
| P2137 | Both tracks are valid but disagree |

These pedal codes have no severity setting. They are always reported as a warning, and nothing in the code limits engine power because of them directly. They are only checked while the ignition has been on for a few seconds and the battery voltage is healthy.

What the engine does depends on the dependent features:

| Feature | With a failed pedal |
| --- | --- |
| Electronic throttle | Keeps running. The pedal is read as 0 %, so the throttle is driven to whatever the [pedal target](/Air-Path/ETB/ETB-Pedal-Target) table gives at 0 % for the current RPM, plus idle control. It does not go wide open, and it is not shut off or put into a fixed limp position. The engine idles, and the driver can't raise power |
| Torque model throttle (if enabled) | Pedal is read as 0 %, so the driver demand is the 0 % pedal row |
| Driver throttle demand (DFCO, launch, anti-lag, idle ignition and VE blends) | Invalid. DFCO and launch are disabled, and idle control assumes you are not idling. The idle ignition and VE blending are skipped, and anti-lag and flood-clear read 0 % |
| Cranking fuel | No throttle-based correction applied |
| Air-fuel target using pedal as its axis | Uses 100 %, which gives a rich target |
| CAN dash output | Reports 0 % pedal |

The ECU does not fall back to the throttle position sensor as a substitute for a failed pedal.

If an electronic throttle is configured without both pedal channels, or its throttle position sensor has a primary channel but no secondary, the ECU raises a fatal configuration error at startup instead. A throttle with no position sensor configured at all is simply not started. The same happens if a pedal is configured but no electronic throttle is.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Pedal error, P2137 | Tracks disagree: wrong calibration voltages on one track, a damaged pedal, or a wiring fault on one input |
| P2127 or P2132 | Open or shorted wire, or the up voltage is set too close to the sensor's real released voltage |
| P2128 or P2133 | Short to 5 V, or the down voltage is wrong |
| Engine stuck at idle and Pedal error lit | See the table above. Check wiring and raw voltages |
| Fatal error at power-up mentioning calibration values too close together | Up and down voltage less than 0.5 V apart on one track |
| Fatal error about the two pedal sensors being too similar | One sensor wired to both inputs, or a pedal that needs **BRZ/FRS/GT86 pedal** |
| Pedal reads 100 % at rest and 0 % when pressed | Up and down voltages entered the wrong way round |

## Related

- [Redundant Sensors](/Air-Path/ETB/Redundant-Sensors)
- [ETB pedal target](/Air-Path/ETB/ETB-Pedal-Target)
- [ETB PID](/Air-Path/ETB/ETB-PID)
- [Throttle Position Sensor](/Sensors-And-Gauges/General-Sensors/TPS)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

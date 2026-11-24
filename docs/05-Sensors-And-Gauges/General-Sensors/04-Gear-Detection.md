# Gear Detection

Gear detection works out which gear the transmission is in by comparing engine speed with vehicle speed. The detected gear is available to the CAN dash outputs, Lua scripts, the torque model, traction control and the general purpose PWM tables. It needs a working [vehicle speed signal](/Sensors-And-Gauges/General-Sensors/VSS).

Settings are under **Sensors > Speed sensor**, in the **Gear Detection** panel.

## How it works

Every slow-loop update the ECU divides engine RPM by driveshaft RPM. Driveshaft RPM comes from vehicle speed, **Wheel revolutions per kilometer** and **Final drive ratio**. The result is the gearbox ratio, shown as **Gearbox Ratio**.

The ratio is then matched to the gear ratios you entered. Two matches are made:

- **Raw gear** picks whichever gear the ratio is nearest to, with the boundary halfway between two gears (geometric mean). It always names a gear unless the ratio is wildly off.
- **Locked gear** is only set when the ratio is within a few percent of one gear's ratio. The tolerance is at most 4 %, and is narrowed automatically for close-ratio gearboxes. A ratio between gears (clutch slip, mid-shift) gives no locked gear.

The detected gear is 0 (neutral or unknown) when the vehicle is below 5 km/h, the ratio is more than 1.5 times first gear, or the ratio is below 0.66 times the top gear.

If a clutch input is configured (see [Clutch](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch)), the ECU also uses the clutch to avoid false readings. Once it has seen the clutch pressed with the engine decoupled from the wheels, then released into a gear, it marks the clutch sensor as trusted. From then on:

- Clutch released: a new gear is accepted after its ratio has stayed locked for 0.15 s. If the ratio matches no gear for 1 s, the detected gear becomes neutral.
- Clutch pressed: the previous gear is held.
- Clutch partly pressed: a new gear is only accepted after the ratio has stayed locked for 1 s.

If there is no clutch input, or the clutch sensor disagrees with what the ratio shows (for example it reads pressed while engine speed follows road speed), the clutch is not trusted. The detected gear is then just the raw gear.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Wheel revolutions per kilometer | revs/km | Turns of the wheels the speed sensor reads, per km. Shared with the speed sensor settings |
| Final drive ratio | ratio | Driveshaft turns per wheel turn |
| Common transmissions | - | Presets that fill in the gear count and ratios for some common gearboxes. Some also set the final drive ratio |
| Forward gear count | - | Number of forward gears, 1 to 8 |
| 1st gear ... 8th gear | ratio | Transmission ratio of each gear. Only as many fields as the gear count are shown |

Ratios must be greater than zero and strictly decreasing from 1st gear upwards. If they aren't, or there are more than 8 gears, the ECU raises a fatal configuration error.

## Setup

1. Make sure vehicle speed reads correctly first. Compare it with a GPS or the speedometer.
2. Set **Wheel revolutions per kilometer** from your tyre size (an online calculator will do it). Roughly, it is 1,000,000 divided by the tyre's rolling circumference in millimetres.
3. Set **Final drive ratio** to your differential ratio. Check any preset you pick, because most presets don't change it.
4. Pick your gearbox in **Common transmissions**, or set **Forward gear count** and each gear's ratio from the gearbox specification. Use the transmission's own ratios only. The final drive is applied separately.
5. Burn, then drive and check (below).

### Getting the ratios from a log

If you don't know the ratios, set a rough gear count and ratios, then log **Gearbox Ratio**. Hold a steady speed above 30 km/h with the clutch fully out in each gear in turn, and note the value it settles at. Enter those values as the gear ratios. This only works if the tyre size and final drive are right, so check those against a known gear (top gear is often 1.00 or close to it on a direct-drive box).

## Checking it works

Gauges and log channels:

- **Detected Gear**: the gear the ECU believes you are in. 0 is neutral.
- **Gearbox Ratio**: engine RPM divided by driveshaft RPM.
- **Gear: Raw from ratio**: nearest gear, ignoring the clutch.
- **Gear: Ratio locked to**: gear the ratio is tightly matched to, or 0.
- **Clutch sensor trusted**: set once the ECU has confirmed the clutch input behaves.
- **Ratio doesn't match any gear**: set while the mismatch warning below is active.

Drive steadily in each gear with the clutch out. **Gearbox Ratio** should sit right on the ratio you entered, and **Gear: Ratio locked to** should equal the gear you are in. If **Gearbox Ratio** is consistently the same percentage off in every gear, **Wheel revolutions per kilometer** or **Final drive ratio** is wrong. If it is off by a different amount in each gear, the gear ratios are wrong.

## If it fails

| Condition | Result |
| --- | --- |
| Vehicle speed invalid or below 5 km/h | Gearbox Ratio is 0 and the detected gear is 0 |
| Ratio outside 1.5 times 1st to 0.66 times top | Detected gear is 0 |
| Clutch not trusted or not configured | Gear comes from the ratio alone, with no clutch-based holding |
| Ratio between gears | Without a trusted clutch, the nearer gear is reported. With a trusted clutch, the previous gear is kept while the clutch is pressed or partly pressed, and the gear becomes neutral if the clutch is released and no gear matches for 1 s |
| Above 30 km/h, steady ratio, clutch released, but the ratio matches no gear for 10 s or more | A "gear detection questionable" warning is raised and **Ratio doesn't match any gear** is set. The gear is still reported as usual |

When the detected gear is 0, features that need the total gear ratio stop using it: traction control disarms, and the torque model's axle torque limit is not applied.

## What uses the detected gear

- General purpose PWM and fan PWM axes can use **Gear (detected)** as an input.
- Lua scripts can read the gear and the ideal RPM for a gear.
- CAN dash and verbose CAN output the detected gear.
- Logging

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Detected Gear always 0 | Vehicle speed isn't working or is under 5 km/h. Ratio far from every gear, so check revs per km and final drive |
| Gearbox Ratio wrong by the same percentage in every gear | Wrong revs per km, final drive ratio or VSS scaling |
| Gear flickers between two neighbours | Ratios are wrong, or the clutch is slipping |
| Gear is correct but lags a shift | Normal with a trusted clutch. It waits 0.15 s for a lock |
| Mismatch warning while cruising | Tyre size, final drive, VSS or a gear ratio is wrong |
| Fatal error on burn | Gear ratios not strictly decreasing, or a ratio of zero |

## Related

- [Vehicle Speed Sensor](/Sensors-And-Gauges/General-Sensors/VSS)
- [Clutch](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch)

# ETB #2 Trim

On an engine with two electronic throttles, usually one per bank, both throttles follow the same target. The trim table adds a small correction to the second throttle only, so you can balance the airflow between the two banks.

Settings are under **Advanced > ETB #2 Trim**. The menu item appears once a primary sensor is set for **Throttle Body #2** under **Sensors > TPS**.

## How it works

The table is looked up with the engine speed and the throttle target, and its value, in percent, is added to the second throttle's target. The trim is limited to plus or minus 10 %. Between points it is interpolated, and beyond the first or last point it uses the edge of the table.

The trim is applied to the throttle on H-bridge #2. That's normally **Throttle 2**. It is added after the idle and Lua adjustments, and before the ETB rev limiter and the minimum and maximum position limits, so those still apply to the second throttle. See [ETB Pedal Target](/Air-Path/ETB/ETB-Pedal-Target) for the full order.

## Settings

The table has 6 target bins and 6 RPM bins.

| Setting | Units | Description |
| --- | --- | --- |
| TPS bins (Y) | % | Throttle target positions to look up. Keep them in ascending order |
| RPM bins (X) | RPM | Engine speeds to look up. Keep them in ascending order |
| Table values | % | Added to the second throttle's target. Positive opens it further |

The table's live cursor follows the first throttle's measured position, which is close to the target once the throttle is tuned.

## Setup

1. Calibrate both throttles and get both following their targets well first. The bias curve and PID are shared, so the second throttle should behave the same as the first.
2. Leave the table at zero. Compare the banks at a range of steady loads and speeds, for example with a wideband per bank or a MAP sensor per bank on individual throttles.
3. Where one bank gets more air than the other, trim the second throttle up or down at that throttle position and RPM. Keep changes small: a percent or two of throttle makes a big airflow difference at small openings.

## Checking it works

Log **ETB 2: Target: Trim** (the trim in use), **ETB 2: Target**, **ETB 1: Target**, **TPS** and **TPS2**. **tps12Split** is the first throttle's position minus the second's. With the table at zero it should stay near zero, and with trim it should be about minus the trim.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Trim has no effect | Second throttle not on H-bridge #2, or its target is being held by **Minimum ETB position** or **Maximum ETB position** |
| Second throttle doesn't follow the first even with zero trim | Calibration or mechanical difference between the throttles. Recalibrate TPS 2 |
| Menu item missing | No primary sensor set for **Throttle Body #2** |

## Related

- [Electronic Throttle Body](/Air-Path/ETB/ETB-Setup)
- [ETB Pedal Target](/Air-Path/ETB/ETB-Pedal-Target)
- [ETB Throttle Position Sensors](/Air-Path/ETB/ETB-TPS)

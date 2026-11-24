# ETB Pedal Target

The pedal target table converts the accelerator pedal position into the throttle position the ETB should aim for. It is what makes a drive-by-wire throttle feel the way you want: a straight 1:1 table makes the throttle follow the pedal, and reshaping it gives a more progressive pedal, a softer response at low RPM, or a restricted maximum opening.

Settings are under **Advanced > ETB pedal target**. The menu item only appears on boards with electronic throttle support. See [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP) for the pedal sensor itself.

## How it works

The table is looked up with the current engine speed and the pedal position, and returns a target throttle position in percent. Positions between table points are interpolated, and values beyond the first or last bin use the edge of the table. The Y axis is the pedal position (**Throttle pedal position**, %), and the X axis is RPM.

The table output is then adjusted before it reaches the throttle:

1. **Idle control.** The idle position is added by squeezing the table's range upward: a table value of 0 % becomes the idle throttle opening, and 100 % stays at 100 %. This is why a 0 % row in the table doesn't mean a fully closed throttle while idle control is active. See [ETB Idle](/Advanced-Features/ETB/ETB-Idle).
2. **Lua adjustment.** A Lua script can add an offset. The offset is ignored if the script hasn't refreshed it within the last 0.2 seconds.
3. **ETB #2 trim.** The second throttle gets its own trim from the **ETB #2 Trim** table, limited to plus or minus 10 %.
4. **ETB rev limiter.** If the soft limiter ('Electronic Throttle Limiting') is set, the target tapers to closed between its start RPM and the end of its range.
5. **Position limits.** The result is held between **Minimum ETB position** and **Maximum ETB position**.

The result is the setpoint for the [ETB PID](/Advanced-Features/ETB/ETB-PID).

### With the torque model

When the torque model is enabled, the throttle target comes from the torque model instead, and the pedal target table becomes the maximum throttle allowed. The throttle target is the smaller of the two. Keep the table generous in that case so it only acts as a safety limit.

## Settings

The table has 8 pedal bins and 8 RPM bins, all editable.

| Setting | Units | Description |
| --- | --- | --- |
| Pedal bins (Y) | % | Pedal positions to look up. Must be in ascending order |
| RPM bins (X) | RPM | Engine speeds to look up. Must be in ascending order |
| Table values | % | Target throttle position for each pedal and RPM |

If either set of bins isn't ascending, the ECU raises a fatal configuration error.

## Setup

1. Start with a 1:1 table: each row's value equal to its pedal bin, the same at every RPM.
2. Make sure the pedal is calibrated and the throttle follows it correctly first. Check the pedal is reading 0 % to 100 %.
3. Reshape the table to taste. Typically, reduce the values at low pedal positions and low RPM for a gentler launch, and keep the last row at 100 % at the top of the range unless you want to limit maximum throttle.
4. Keep the bins closely spaced where you want fine control, usually at small pedal openings.

:::note
The final throttle opening is limited by **Maximum ETB position** regardless of the table values.
:::

## Checking it works

Log **Throttle pedal position** and the ETB target, and compare with the measured throttle position. The measured position should follow the target closely. If it doesn't, the problem is the [ETB PID](/Advanced-Features/ETB/ETB-PID) tuning and not the table.

## If it fails

If the pedal fails, the pedal position is taken as 0 % and the table is looked up at its 0 % row for the current RPM, so the throttle goes to idle position and the driver loses control of it. See [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP) for the codes and the other effects.

## Related

- [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP)
- [ETB PID](/Advanced-Features/ETB/ETB-PID)
- [ETB Idle](/Advanced-Features/ETB/ETB-Idle)
- [ETB Bias Table](/Advanced-Features/ETB/ETB-Bias-Table)
- [Redundant Sensors](/Advanced-Features/ETB/Redundant-Sensors)

# Trigger Setup

The primary trigger is the crank or cam signal that FOME uses to find engine position and speed. Nothing else works until it does: with no trigger there is no RPM, and with no RPM there is no fuel or spark. For most engines, setup means picking the trigger type, checking the input pins, and setting **Trigger Angle Advance** with a timing light. [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works) explains the ideas behind these settings.

Settings are under **Base Engine > Trigger**, in the **Primary Trigger** panel. The cam inputs in the same window are covered on [Cam Sync](/Base-Engine/Trigger/Cam-Sync).

## How it works

The ECU reads each tooth edge from the sensor and matches the pattern against the selected trigger type until it finds the sync point. From then on it knows the crank angle at every tooth. **Trigger Angle Advance** tells it where TDC of cylinder 1 is relative to that sync point. Every fuel and spark event is scheduled from these two pieces of information, so an error in either one moves everything.

If sync is lost, FOME logs a trigger error and stops scheduling fuel and spark until it has re-synced. More than 50 sync errors in one engine run sets P0336, handled according to **DTC P0336 severity**.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Engine type | - | **Four Stroke** or **Two Stroke** |
| Trigger type | - | The pattern of the trigger wheel or wheels. See [Trigger Types](/Base-Engine/Trigger/Trigger-Types) |
| Total tooth count | number | Only for **custom toothed wheel**. Teeth the wheel would have with none missing, e.g. 36 for a 36-1 wheel |
| Missing/skipped tooth count | number | Only for **custom toothed wheel**. Number of missing teeth in the gap, e.g. 1 for a 36-1 wheel |
| Primary trigger location | - | **On crankshaft** or **On camshaft**. Only shown for generic patterns that could be on either |
| Trigger Angle Advance | deg btdc | Angle from the sync point to TDC of cylinder 1 (see below) |
| DTC P0336 severity | - | What to do when the crank signal has too many sync errors (see [Fault Codes](/Limits-And-Protections/Fault-Codes)) |
| Crank Sensor (Primary channel) | - | Input pin for the primary trigger. Labelled **Cam Sensor (Primary channel)** when the selected trigger is on the cam |
| Invert Primary | - | Use the opposite edge of the primary signal |
| Secondary channel | - | Input pin for the second wheel. Only shown for trigger types that use two wheels |
| Invert Secondary | - | Use the opposite edge of the secondary signal |

Most boards set the trigger input pins for you, to their dedicated crank and cam inputs. Check them against your board's pinout rather than changing them by guesswork.

### Trigger type

Choose the type that matches your wheel. Named OEM types, such as **Miata NB** or **Honda K 12+1**, describe a specific factory pattern. Generic types, such as **60/2**, **36/1** and **custom toothed wheel**, describe a missing-tooth wheel and work on any engine that has one.

A **custom toothed wheel** covers any evenly spaced wheel with one gap of missing teeth. Enter both counts as if the wheel were complete: a 36-2 wheel is **Total tooth count** 36 and **Missing/skipped tooth count** 2. A custom wheel with no missing teeth can't tell the ECU where it is, unless it has just one tooth. For evenly spaced wheels with no gap, such as the Honda and Toyota 12 tooth crank or a Honda 24+1 distributor, use **12 tooth crank** with a cam signal instead. See [Trigger Types](/Base-Engine/Trigger/Trigger-Types).

### Primary trigger location

Generic patterns can be mounted on the crank or on the cam, and FOME can't tell which from the pattern. Set **On crankshaft** for a wheel on the crank or crank pulley, and **On camshaft** for a wheel that turns at cam speed, such as one in a distributor. Named OEM types already know where they are, so the field is hidden for them. It is also hidden for two-stroke engines.

### Input pins and inversion

If **Secondary channel** shows **!!! PLEASE UNSELECT !!!**, a secondary pin is set but the selected trigger type doesn't use it. Set it back to none. Setting **Secondary channel** without a primary pin is a configuration error: FOME raises a critical error and won't run the engine until you fix it and restart the ECU.

**Invert Primary** and **Invert Secondary** swap which edge of the signal FOME treats as the rising edge of a tooth. Use them when the sensor or the input circuit inverts the signal, so that FOME sees the edges in the polarity the trigger type expects. A wrong setting can stop the engine syncing. Sometimes it still syncs, but on the wrong edge of each tooth, which shifts all timing. Settle the polarity before you set **Trigger Angle Advance**, because changing it afterwards can move the timing. The [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting) page shows how to read the signal in the Trigger Logger.

### Trigger Angle Advance

This is the angle, in crank degrees, between the trigger's sync point and TDC of cylinder 1 on its compression stroke. A positive value means the sync point passes the sensor before TDC. On a missing-tooth wheel, the sync point is the first tooth after the gap.

For some named trigger types, the definition already includes the TDC position for the engine it came from, so on that engine the setting is 0 or close to it. That is what the reminder in the dialog means. Don't rely on it: other OEM types, and every generic wheel, need a real value, and even a "known" type is worth checking. The only trustworthy value is one you've confirmed with a timing light.

To estimate a starting value for a generic wheel, turn the engine by hand in its normal direction until the first tooth after the gap is lined up with the sensor. Keep turning until cylinder 1 reaches TDC, and count the degrees you turned. On a crank wheel, each tooth position is 360 divided by **Total tooth count**, e.g. 10° on a 36-1 wheel. The [Miata 36T trigger](/Vehicle-Specific/Mazda-MX5-Miata/Miata-36T-Trigger) page is a worked example for one aftermarket wheel.

:::note
A timing light can't tell TDC on the compression stroke from TDC on the exhaust stroke, because the marks line up at both. With a cam sensor giving full sync, the timing can look right while the engine is a whole crank turn out. If the timing light shows the right timing but the engine runs badly or not at all once it has full sync, add 360 to **Trigger Angle Advance** (or subtract 360 if it is already above 360), then check again.
:::

### Fixed timing

For checking **Trigger Angle Advance**, FOME can hold the timing at a fixed value. The fields are under **Ignition > Ignition settings**:

| Setting | Units | Description |
| --- | --- | --- |
| Timing Mode | - | **dynamic** for normal running. **fixed** holds the timing at **Fixed Timing** |
| Fixed Timing | deg | Timing to hold in **fixed** mode |

In **fixed** mode, the ignition table and the temperature and idle timing corrections are bypassed. It applies once the engine is running. While cranking, the cranking timing is used as normal.

## Setup

1. In **Base Engine > Trigger**, set **Engine type**.
2. Set **Trigger type**. For a generic or custom wheel, also set the tooth counts and **Primary trigger location**.
3. Check that **Crank Sensor (Primary channel)** (or **Cam Sensor (Primary channel)**) is the input your sensor is wired to. Set **Secondary channel** only if the trigger type uses a second wheel.
4. Enter a starting **Trigger Angle Advance**: the documented value for your engine, or an estimate as described above.
5. Burn, then crank the engine with the fuel pump or injectors disabled. **RPM - engine speed** should show a steady cranking speed, and the **Trigger ERR** indicator should stay off. If not, see [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting) before going further.
6. In **Ignition > Ignition settings**, set **Timing Mode** to **fixed** and **Fixed Timing** to a value that is easy to read on your timing marks, such as 10.
7. Re-enable fuel and start the engine. Point a timing light at the crank pulley marks, triggered from cylinder 1's spark lead.
8. Compare the timing light with **Fixed Timing**. If the light shows more advance than **Fixed Timing**, increase **Trigger Angle Advance** by the difference. If it shows less, decrease it by the difference.
9. Repeat until the light reads the same as **Fixed Timing**. Check at idle and at a higher RPM.
10. Set **Timing Mode** back to **dynamic** and burn.

:::warning
Until **Trigger Angle Advance** is confirmed, the spark may fire far from where you think it does. A badly wrong value can cause kickback while cranking or detonation under load. Don't drive or load the engine until the timing light agrees with the ECU.
:::

## Checking it works

- **RPM - engine speed** reads a steady value while cranking and running, close to the tachometer.
- The **Trigger OK** indicator stays on. **Trigger error count** (log channel **Trg: Sync error counter**) stays at zero, or at least stops climbing once the engine is running.
- In **fixed** mode, **Ign: Timing Base** shows the **Fixed Timing** value and the timing light agrees with it.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| No RPM while cranking | Wrong input pin, sensor not powered or not connected |
| RPM shows, but **Trigger ERR** lights and the engine won't start | Wrong trigger type or tooth counts, wrong **Primary trigger location**, or the wrong edge (try **Invert Primary**) |
| Timing light disagrees with **Fixed Timing** | **Trigger Angle Advance** is wrong. Adjust it as in the setup steps |
| Timing light reads correctly, but the engine runs badly or not at all once fully synced | Phase is 360° out. Add or subtract 360 from **Trigger Angle Advance** |
| **Secondary channel** shows **!!! PLEASE UNSELECT !!!** | A secondary pin is set for a trigger type that doesn't use it |

For noise, sync errors and reading the Trigger Logger, see [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting).

## Related

- [How Trigger Sync Works](/Base-Engine/Trigger/How-Trigger-Sync-Works)
- [Cam Sync](/Base-Engine/Trigger/Cam-Sync)
- [Trigger Types](/Base-Engine/Trigger/Trigger-Types)
- [VR Sensor Threshold](/Base-Engine/Trigger/VR-Threshold)
- [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting)
- [Miata 36T Trigger](/Vehicle-Specific/Mazda-MX5-Miata/Miata-36T-Trigger)
- [Fault Codes](/Limits-And-Protections/Fault-Codes)

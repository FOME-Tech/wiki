# Idle Specific Ignition Table

The idle ignition table is an RPM-based timing curve used in place of the main ignition table while the engine is idling. It's another open loop contribution to idle, much like the open loop idle position. Changing ignition timing at idle changes the engine's torque: more advance gives more torque, and less gives less. This can be used to hold a stable idle, by reducing timing above the idle RPM target and increasing it below.

Turn it on with **Use idle ignition table** in the **Extra Idle Features** panel under **Idle > Idle settings**. The curve is then listed as **Idle > Ignition advance**.

## How it works

The curve is used whenever the idle controller says the engine is idling (phase 1 in **Idle: Phase**, see [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings#idle-phases)). With **Use idle tables for cranking taper** on, it's used during the crank-to-idle taper as well.

It's blended with the main ignition table by throttle (or pedal) position, in the same way as the idle VE table:

- up to half of **TPS threshold**, the idle curve is used alone,
- between half the threshold and the threshold, it blends linearly into the main table,
- at the threshold and above, the main table is used.

The usual timing corrections, such as the CLT and IAT corrections and closed-loop idle timing, are still added on top. With fixed ignition timing, the fixed timing is used and this curve is ignored.

Unlike [closed-loop idle timing](/Basic-Features/Idle-Control/Idle-Settings#closed-loop-idle-timing), this curve doesn't know the idle target RPM. It's open loop only, so if the target changes (when cold, or with the A/C on), the curve doesn't move with it. The two can be used together: the curve sets the base timing around idle, and closed-loop idle timing trims it towards the target.

| Axis | Units | Description |
| --- | --- | --- |
| RPM | RPM | Engine speed, 8 points. Must be in ascending order, or the ECU raises a configuration error |
| degrees | deg | Ignition advance at that RPM |

## Setup

Before tuning the ignition table, make sure your base open loop idle position is set.

Start by setting the RPM points to cover about 500 RPM above and below your target idle speed. At your target idle speed, put in your desired timing angle. 10 degrees is a good starting point, but a higher timing angle such as 14 degrees gives the engine a bit more torque at idle, which helps it rev up from idle quickly. Make a straight line between the lowest and highest RPM points, with values in the range of 20 degrees at the low end to 5 degrees at the high end. All engines respond differently, so you may want different starting values, but these are good generalisations.

Run the car with these values and see how well it holds idle. Adjust the timing values so that the timing pushes and pulls the engine RPM towards the target. You may need to change the shape of the curve, so that only small timing changes are made near the target and large corrections are made if the RPM moves well away from it.

## Related

- [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings)
- [Idle Tuning](/Basic-Features/Idle-Control/Idle-Tuning)
- [Advanced Idle](/Basic-Features/Idle-Control/Advanced-Idle#idle-tables-for-cranking-taper)

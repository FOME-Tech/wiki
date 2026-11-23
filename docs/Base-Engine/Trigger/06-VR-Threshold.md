# VR Sensor Threshold

A variable reluctor (VR) sensor is a coil and magnet that generates its own AC voltage as trigger teeth pass it. The signal is tiny at cranking speed and grows with RPM, from a few hundred millivolts to tens of volts. Some FOME boards have a VR conditioner circuit whose switching threshold the ECU adjusts with RPM. This keeps a clean signal at cranking and a quiet one at high RPM.

Settings are under **Sensors > VR Sensor Threshold**.

## How it works

The conditioner turns the sensor's AC waveform into a square wave by comparing it with a threshold voltage. A fixed threshold can't suit both ends of the RPM range. Set low enough to catch the weak cranking signal, it also picks up electrical noise and ringing at high RPM, which shows up as extra or misplaced tooth edges. Set high enough to ignore that noise, it misses the weak cranking pulses and the engine won't sync.

The ECU solves this by driving the threshold from a PWM output. Each RPM, it reads the threshold voltage from the curve you enter, interpolating between points, and updates the PWM duty. The board's filter turns that into a steady voltage at the conditioner's threshold input. There is one curve per VR input, **VR 1 Threshold** and **VR 2 Threshold**, one for each VR input the board has.

Boards that use a conditioner with its own adaptive threshold, or a discrete circuit without this input, have nothing to adjust. They leave **Pin** unassigned, and the curve has no effect.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Pin | - | PWM output wired to the conditioner's threshold input. Normally preset by the board |
| RPM (curve X axis) | rpm | Engine speed of each curve point |
| Voltage (curve Y axis) | volts | Threshold voltage at that RPM, from 0 to 2.5 V |

:::note
The second curve is hidden on boards that only have one adjustable threshold.
:::

## Setup

1. Check that **Pin** is set. On a board with this circuit it is normally already assigned. Don't change it unless your board's documentation says to.
2. Start from the curve your board loaded. It is normally low at cranking speeds and rises with RPM.
3. Crank the engine and watch the **Trigger Logger** and the **Trigger error count** gauge. If the engine won't sync, or errors count up while cranking, lower the first points of the curve.
4. Run the engine up through its RPM range. If errors appear or the tooth log shows extra edges at higher RPM, raise the threshold at those RPM points.
5. Move one or two points at a time and retest. Keep the curve smooth, since the threshold follows it continuously with RPM.

## Checking it works

- Open the **Trigger Logger** while cranking and again at several higher RPM. Teeth should be evenly spaced, with the same pattern each rotation, and no extra short edges.
- **Trigger error count** should stay at zero or at least not climb during steady running.
- **RPM - engine speed** should be steady at idle. A jittery or wildly wrong RPM reading points at noise.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Engine cranks but never syncs, no RPM shown | Threshold too high at cranking RPM, or sensor wiring or polarity fault |
| Trigger errors during cranking only | Threshold too high or too low for the weak cranking signal |
| Trigger errors, or wild RPM readings as RPM climbs | Threshold too low at high RPM, so noise passes through |
| Fine at idle, loses sync when revving | Curve rising too slowly, or too little at the top end |
| Threshold changes make no difference | Wrong **Pin**, or the board has no adjustable threshold circuit |

## Related

- [Fault Codes](/Limits-And-Protections/Fault-Codes)

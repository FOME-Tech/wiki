# ETB PID and Autotune

The PID is the closed-loop part of throttle control. It compares the target position with the measured throttle position and adjusts the motor duty to close the gap, on top of the [bias curve](/Advanced-Features/ETB/ETB-Bias-Table). FOME can work out a set of starting gains for you with autotune. For PID control in general, see the [Guide to Tuning the ETB and VVT PIDs](/Intro-Start-Here/HT-PID-ETB-And-VVT).

Settings are under **Advanced > Electronic throttle body**, in the **PID settings** and **PID Autotune** panels. They appear once an H-bridge is set to a throttle function.

## How it works

The PID runs 500 times a second. The error is the target minus the measured position, in percent, and the output is in percent duty:

- **P** gives duty in proportion to the error.
- **I** builds up duty for as long as an error remains, which removes a steady offset. It is limited by **iTermMin** and **iTermMax**.
- **D** reacts to how fast the error is changing, which damps overshoot.

The sum of the three is limited by **pid min** and **pid max**, then added to the bias curve's output. Both throttles use the same gains. The PID's state is reset whenever you change P, I or D.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| pFactor | - | Proportional gain: % duty per % of position error |
| iFactor | - | Integral gain: % duty per % of error per second |
| dFactor | - | Derivative gain: % duty per % per second of error change |
| pid min | - | Lowest PID output, in % duty. Must be negative |
| pid max | - | Highest PID output, in % duty. Must be positive |
| iTermMin | - | Lowest value of the I term, in % duty |
| iTermMax | - | Highest value of the I term, in % duty |
| Auto Calibrate ETB 1 / ETB 2 | - | Button. Calibrates the throttle position sensors. See [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS) |
| Start ETB PID Autotune, Stop ETB PID Autotune | - | Buttons. Run autotune (below) |

If **pid min** isn't negative or **pid max** isn't positive, the ECU raises a fatal configuration error at startup.

**pid min** and **pid max** only limit the PID part. The total duty is the bias plus the PID output, limited to 90 % in either direction.

## Autotune

Autotune finds the throttle's response by making it oscillate. It sets a 50 % target and switches the motor drive between 20 % above and 20 % below the bias at that position, so the throttle buzzes back and forth around half open. From the size and period of the oscillation it works out P, I and D using a standard relay-tuning method, aiming between no overshoot and a little overshoot.

The gains are sent to TunerStudio in turn, five oscillations each, and the fields change on screen as it runs. The values are averaged over many oscillations, so they take a little while to settle.

Autotune only runs:

- with the engine stopped,
- on the throttle whose H-bridge is set to **Throttle 1**. The second throttle uses the same gains,
- while the throttle is actually being driven: **Disable ETB if engine is stopped** and **Disable ETB Motor** must be off, and the throttle position must be reading correctly.

To run it:

1. Calibrate the throttle position sensors, check the reading, and Burn.
2. Make sure the bias curve is roughly right. Autotune works around the bias at 50 %.
3. With the engine off and the ignition on, press **Start ETB PID Autotune**.
4. Watch **pFactor**, **iFactor** and **dFactor**. When they've stopped changing much, press **Stop ETB PID Autotune**.
5. Burn, then check the response by hand (below).

:::warning
The throttle moves rapidly for as long as autotune runs. Keep clear of the throttle plate, and always stop it with the button when you're done.
:::

## Tuning by hand

Treat the autotune values as a starting point. With the engine off, move the pedal in steps, both small and large, and across the rest position, and watch the target against the measured position.

1. If the throttle oscillates or buzzes while holding still, reduce P (or D).
2. If it is slow to reach the target, raise P.
3. If it settles short of the target and only slowly creeps the rest of the way, the bias curve is off at that position. Fix the curve first, then raise I if needed.
4. If it overshoots, add a little D or reduce I.

Check it again with the engine running, as airflow and manifold vacuum also act on the throttle plate.

## Checking it works

The **ETB PID** gauge category has **ETB 1 PID pTerm**, **ETB 1 PID iTerm**, **ETB 1 PID dTerm**, **ETB 1 PID output** and **ETB 1 PID error**. In logs, they are **etbStatus_pTerm**, **etbStatus_iTerm**, **etbStatus_dTerm**, **etbStatus_output** and **etbStatus_error**. They show the throttle on **Throttle 1** only.

**ETB: Duty** (log **ETB 1: Duty cycle**) is the bias plus the PID output, before the 90 % limit and the battery voltage correction.

A good tune follows a step in the pedal quickly with little overshoot, holds within a percent or so, and has a small I term at steady positions.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Throttle buzzes or oscillates at a steady pedal | P or D too high |
| Slow to follow the pedal | P too low, or **pid max** / **pid min** too tight |
| Holds an offset that I slowly removes | Bias curve wrong at that position |
| Overshoots and rings after a step | I too high, or not enough D |
| Autotune doesn't move the throttle | Engine turning, **Disable ETB if engine is stopped** or **Disable ETB Motor** on, a TPS error, or no H-bridge set to **Throttle 1** |
| Fatal error about ETB PID min or max | **pid min** not negative, or **pid max** not positive |
| Jam detection trips during quick pedal moves | Response too slow. Tune the PID, or raise the jam threshold or timeout. See [Jam detection](/Advanced-Features/ETB/ETB-Setup#jam-detection) |

## Related

- [Guide to Tuning the ETB and VVT PIDs](/Intro-Start-Here/HT-PID-ETB-And-VVT)
- [ETB Bias Curve](/Advanced-Features/ETB/ETB-Bias-Table)
- [ETB Throttle Position Sensors](/Advanced-Features/ETB/ETB-TPS)
- [Electronic Throttle Body](/Advanced-Features/ETB/ETB-Setup)

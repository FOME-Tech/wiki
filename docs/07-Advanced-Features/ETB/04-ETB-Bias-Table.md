# ETB Bias Curve

The bias curve is the feed-forward part of throttle control: the motor duty needed to hold the throttle at a given position against its return spring. With a good bias curve, the PID only has to correct small errors, and the throttle responds quickly and holds steady.

Settings are under **Advanced > ETB bias curve (feed forward)**.

## How it works

Every throttle has a spring that pulls it to a rest position, usually a little open. To hold the throttle anywhere else, the motor has to push against that spring:

- **Above the rest position**, the spring pulls the throttle closed, so the bias is positive (drive open).
- **Below the rest position**, the spring pushes the throttle open, so the bias is negative (drive closed).
- **At the rest position**, the bias is about zero.

The curve is looked up with the throttle's target position (not its measured position), and the result is added to the PID output to give the final duty. Between points it is interpolated, and beyond the first or last point it uses the end value. Both throttles use the same curve. An electric wastegate on an H-bridge doesn't use it.

## Settings

The curve has 8 points.

| Setting | Units | Description |
| --- | --- | --- |
| TPS (X) | % | Target throttle positions. Keep them in ascending order |
| duty bias (Y) | % | Duty added at that target, from -100 to 100 % |

The curve's live cursor follows the measured throttle position, but the lookup uses the target.

## Setup

The shape matters most around the rest position, where the spring changes direction.

1. Find the rest position: with the ignition on and **Disable ETB Motor** on, read **Throttle position**. Turn **Disable ETB Motor** back off.
2. Put two points close together just below and just above the rest position, with a zero point at it, and spread the rest across the range.
3. Start from a curve that is negative below the rest position, zero at it, and roughly flat and positive above it. Your board's defaults are usually like this.
4. With the engine off, hold the pedal steady so the throttle sits at one of the points, and let it settle. Whatever the PID is still outputting (**ETB 1 PID output**) is what the curve is missing at that position. Add it to that point's bias value.
5. Repeat for each point, then retune the [PID](/Advanced-Features/ETB/ETB-PID) if needed.

:::tip
It's easier to do step 4 with the PID's I term doing all the work: once the throttle has settled, the I term is the bias error. Look at **ETB 1 PID iTerm** as well as the total output.
:::

## Checking it works

Log **ETB 1: Feed forward**, **ETB 1: Duty cycle** and **etbStatus_iTerm** with **ETB 1: Target** and **TPS**. With a good curve, the I term stays small at every steady throttle position, and the throttle crosses the rest position without a jump or a stall.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Throttle hangs, then jumps, as it passes the rest position | Bias wrong around the rest position, or points too far apart there |
| Large I term that's different at every steady position | Bias curve doesn't match the spring |
| Throttle creeps away from the target when the PID gains are low | Bias too high or too low at that position |

## Related

- [ETB PID and Autotune](/Advanced-Features/ETB/ETB-PID)
- [Electronic Throttle Body](/Advanced-Features/ETB/ETB-Setup)

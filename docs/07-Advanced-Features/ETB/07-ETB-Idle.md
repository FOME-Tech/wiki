# ETB Idle

With an electronic throttle, no separate idle valve is needed. The idle controller works out an idle position in the usual way, and FOME opens the throttle a little further to let that air in. All the idle logic (target RPM, open and closed loop, cranking air, dashpot) is the same as with an idle valve, and is covered in [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings). This page only covers how the idle position becomes throttle opening.

The setting is **ETB idle maximum angle**, in the **ETB Idle** panel under **Advanced > Electronic throttle body**. The same setting also appears as **Electronic throttle idle range** under idle hardware.

## How it works

The idle position (0 to 100 %) is scaled by **ETB idle maximum angle**. At 100 % idle position, the throttle opens by the full angle, and at 50 % by half of it. That opening is then combined with the [pedal target](/Advanced-Features/ETB/ETB-Pedal-Target) by squeezing the table's range upward:

- At a 0 % pedal target, the throttle target is the idle opening.
- At a 100 % pedal target, it is still 100 %.
- In between, the range is scaled linearly. For example, with a 6 % idle opening, a 50 % pedal target becomes 53 %.

The idle position always goes to the throttle while a throttle is configured. There's no separate switch. If an idle solenoid or stepper is also configured, it is driven with the same position at the same time.

Both throttles get the same idle opening. **Minimum ETB position** still applies, so the throttle never closes past it. When the torque model is enabled, the torque model sets the throttle at idle too, and this setting isn't used.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| ETB idle maximum angle | % | Throttle opening added at 100 % idle position. Up to 30 % |

## Setup

1. Set up idle control as on [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings). With an electronic throttle, the idle **TPS threshold** checks the pedal, so 1 to 2 % is about right.
2. Set **ETB idle maximum angle** so that a warm engine idles at well under 100 % idle position, leaving room above it for a cold idle and the A/C and fan adders. A good way to find it: with the engine warm, find the throttle opening that holds your target idle speed, and set the angle to about twice that. The warm idle position then sits near 50 %.
3. Tune the open loop idle position and the closed loop as normal.

## Checking it works

Log **Idle: Position**, **ETB 1: Target: Base** (the pedal table value), **ETB 1: Target** and **TPS**. With your foot off the pedal and the 0 % pedal row of the pedal target table at 0, **ETB 1: Target** should be **Idle: Position** × **ETB idle maximum angle** / 100, or **Minimum ETB position** if that's higher, and **TPS** should follow it.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Idle position pinned at 100 % and the engine still idles low | **ETB idle maximum angle** too small |
| Idle hunts, and small changes in idle position make big RPM changes | **ETB idle maximum angle** much bigger than it needs to be |
| Idle is high, even at 0 % idle position | **Minimum ETB position**, or the 0 % row of the pedal target table is too high, or a vacuum leak is allowing air to enter around the throttle |
| Throttle follows idle position but RPM doesn't change | Throttle not following its target. Check the [ETB PID](/Advanced-Features/ETB/ETB-PID) |

## Related

- [Idle Settings](/Basic-Features/Idle-Control/Idle-Settings)
- [Idle Hardware](/Basic-Features/Idle-Control/Idle-Hardware)
- [ETB Pedal Target](/Advanced-Features/ETB/ETB-Pedal-Target)
- [Electronic Throttle Body](/Advanced-Features/ETB/ETB-Setup)

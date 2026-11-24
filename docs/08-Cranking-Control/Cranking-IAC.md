# Cranking Idle Air Control

A smooth start needs enough air for the fuel being injected. Ideally the idle air valve supplies enough air for the engine to start and catch without the driver touching the accelerator. These settings set the idle valve position while cranking, and how it hands over to normal idle control once the engine is running. They apply to every type of idle valve, including electronic throttle idle.

Settings are under **Cranking > Cranking settings**, in the **Idle air valve** panel.

## How it works

While the engine is cranking (below the **Cranking RPM limit**), the idle position is **Cranking base IAC position** multiplied by a coolant temperature curve. By default that's the **Open loop CLT multiplier** curve from the Idle menu, the same one used for normal idle. Turn on **Override cranking IAC CLT multiplier** to use the separate **Cranking IAC CLT multiplier** curve instead. Closed loop idle and the A/C, fan and dashpot adders don't apply while cranking.

Once the engine is running, the position doesn't jump straight to the normal idle position. It moves in a straight line from the cranking position to the normal open loop position over **After cranking IAC taper duration** engine cycles. This holds the idle up for a moment after the start, while the engine is still cold and wet.

The cycle count starts when the engine starts turning, not when it starts running, so the cranking cycles count towards the taper. It's the same count the cranking duration fuel multiplier uses. If the duration is shorter than the time spent cranking, there's no taper at all.

The taper carries on whatever the engine does. If you press the throttle during it, the position still tapers, towards the running position plus any dashpot air. If the engine drops into the idling phase during it, closed loop idle works on top of the tapering position. If the engine is above the idle exit threshold, or still inside **Inhibit idle after cranking**, it's in the crank-to-idle taper phase (3 in the **Idle: Phase** log channel). See [Idle phases](/Idle-Control/Idle-Settings#idle-phases).

With **Use cranking taper duration multiplier** on, the duration is multiplied by the **Cranking taper duration multiplier** curve, against coolant temperature. That lets a cold engine taper slowly while a warm one settles quickly.

A stepper valve or electronic throttle is driven to the cranking position as soon as the ECU is on, so it's already there when you start cranking. A solenoid valve stays off until the engine turns (see [Idle Hardware](/Idle-Control/Idle-Hardware)).

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Cranking base IAC position | percent | Idle position while cranking, before the CLT multiplier |
| After cranking IAC taper duration | cycles | How long the position takes to move from the cranking position to the normal idle position, counted from the start of cranking |
| Override cranking IAC CLT multiplier | - | Use the **Cranking IAC CLT multiplier** curve for the cranking position instead of the idle **Open loop CLT multiplier** |
| Use cranking taper duration multiplier | - | Multiply the taper duration by the **Cranking taper duration multiplier** curve |

The two curves are under the **Cranking** menu, and are only listed there when the matching setting is on:

| Curve | Axis | Description |
| --- | --- | --- |
| Cranking IAC CLT multiplier | Coolant temperature | Multiplier for **Cranking base IAC position** |
| Cranking taper duration multiplier | Coolant temperature | Multiplier for **After cranking IAC taper duration** |

### Cranking base IAC position

This is usually higher than the normal idle position. Extra air helps the cylinders fill while cranking, and the engine is getting extra fuel. Too little and the engine is slow to catch or stalls straight after starting. Too much and it flares high after it starts.

### After cranking IAC taper duration

A long taper (over a hundred cycles or so) takes longer for the RPM to drop to idle after the start. A short one settles quicker, but the engine may stumble if the air is taken away before the after-start enrichment has faded and the engine can hold idle on its own.

## Setup

1. Start with **Cranking base IAC position** a little above your warm idle position, and a taper that lasts a few seconds once the engine is running. Log **Idle: Position** to see how long it really takes.
2. Start the engine from cold, with your foot off the pedal. If it's slow to catch, add air. If it flares high, take some away.
3. Watch **Idle: Position** and RPM after the start. Shorten the taper if the idle hangs high, lengthen it if the RPM dips once the taper ends.
4. Once you've started the engine at a range of temperatures, use the CLT curves to fine-tune cold and hot starts separately.

## Related

- [Idle Settings](/Idle-Control/Idle-Settings)
- [Advanced Idle](/Idle-Control/Advanced-Idle), for using the idle tables during the taper
- [Cranking Fuel](/Cranking-Control/Cranking-Fuel)
- [Cranking Duration](/Cranking-Control/Cranking-Fuel/Cranking-Duration)
- [After-Start Enrichment](/Cranking-Control/Cranking-Fuel/After-Start-Enrichment)

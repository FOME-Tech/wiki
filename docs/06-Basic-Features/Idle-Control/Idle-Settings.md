# Idle Settings

Idle control holds the engine at a target speed with your foot off the pedal. FOME does this by moving an idle air valve or the electronic throttle, and optionally by trimming ignition timing. It also adds air ahead of loads such as the A/C, and smooths the drop back to idle after you lift off the throttle.

Settings are under **Idle > Idle settings**. The valve itself is set up under **Idle > Idle hardware** (see [Idle Hardware](/Basic-Features/Idle-Control/Idle-Hardware)). For a step-by-step procedure, see [Idle Tuning](/Basic-Features/Idle-Control/Idle-Tuning).

## How it works

The idle valve position is a percentage, from 0 % (closed) to 100 % (fully open). It's built from two parts:

- **Open loop**: a position calculated from your settings: the base position, a coolant temperature multiplier, and adders for the A/C, fans and dashpot air. This always applies.
- **Closed loop**: a PID controller that adds or removes air to hold the target RPM. This only applies in **Open Loop + Closed Loop** mode, and only while the engine is idling.

The two are added together and limited to 0 to 100 % to give the final **Idle: Position**.

### Idle phases

At any moment the idle controller puts the engine in one of five phases. The phase decides which parts of idle control are active. It is logged as **Idle: Phase**:

| Idle: Phase | Phase | When | What applies |
| --- | --- | --- | --- |
| 0 | Cranking | RPM is below the **Cranking RPM limit** | The cranking position only (see [Cranking IAC](/Basic-Features/Cranking-Control/Cranking-IAC)) |
| 1 | Idling | Off the throttle, RPM has dropped below the entry threshold, vehicle speed is at or below **Max vehicle speed**, and **Inhibit idle after cranking** has run out | Open loop, closed loop idle, closed-loop idle timing, the idle ignition and VE tables, and the idle region of closed loop fuel |
| 2 | Coasting | Off the throttle and above the exit threshold, until RPM drops below the entry threshold again. Also for the rest of **Inhibit idle after cranking** once the taper has finished | Open loop plus **Dashpot air**, or the [coasting table](/Basic-Features/Idle-Control/Advanced-Idle#coasting-iac-position) if it's enabled |
| 3 | Crank-to-idle taper | Would be coasting (including during **Inhibit idle after cranking**), but the after-cranking taper hasn't finished | The tapering open loop position, without dashpot air |
| 4 | Running | On the throttle (above **TPS threshold**), or above **Max vehicle speed** when not coasting | Open loop plus **Dashpot air** |

The thresholds come from the target RPM and **RPM upper limit**:

- **Entry threshold** = target RPM + **RPM upper limit**. The engine must drop below this to start idling.
- **Exit threshold** = target RPM + 1.5 × **RPM upper limit**. With the throttle closed, the engine has to rise above this before it counts as coasting.

For example, with an 800 RPM target and an **RPM upper limit** of 200, the engine starts idling below 1000 RPM and starts coasting above 1100 RPM. If you lift off the throttle between the two thresholds, the engine goes straight to idling. It only coasts if you lifted off above 1100 RPM, and it then keeps coasting until it falls below 1000 RPM.

The target RPM used for these thresholds is the **Target RPM** curve, plus **A/C target adder** while the A/C is requested. Turning the A/C on therefore raises the thresholds too.

With the throttle closed, the RPM thresholds are checked before vehicle speed. A car rolling faster than **Max vehicle speed** at idle RPM is in the running phase, but one coasting down from high RPM is coasting whatever its speed.

### Open loop position

Outside cranking, the open loop position is:

1. **Open loop base position** × the **Open loop CLT multiplier** curve,
2. plus **A/C adder** while the A/C is requested, and **Fan #1 adder** / **Fan #2 adder** while each fan is on,
3. plus any adder set by a Lua script, with the total so far limited to 0 to 100 %,
4. plus **Dashpot air** in the running and coasting phases.

Shortly after a start, this is blended with the cranking position by the after-cranking taper (see [Cranking IAC](/Basic-Features/Cranking-Control/Cranking-IAC)). On return to idle, any extra air from before idle is ramped out on top of it (see [Dashpot air and return to idle](#dashpot-air-and-return-to-idle)).

While coasting with **Use coasting idle table** on, the **Coasting IAC position** table replaces all of the above. The CLT multiplier, the A/C and fan adders and dashpot air are not added to it.

The A/C adders follow the A/C request (the A/C button, and the A/C pressure switch if one is configured), not the compressor relay. This gives the extra air a head start before the compressor load arrives.

### Closed loop control

The closed loop controller compares **Idle: Target RPM** with the engine speed and adjusts the position to close the gap. It runs only in the idling phase, only in **Open Loop + Closed Loop** mode, and only while the throttle position (or pedal) sensor is working. In every other phase its output is zero, so that it can't hold the engine up and stop it returning to idle.

When the engine leaves idle, the I-term is cleared if it was removing air. If it was adding air, it is kept for the next return to idle, unless **Always reset PID leaving idle** is on. The controller is also reset when the engine stops and when you change the PID gains.

### Dashpot air and return to idle

On a mechanical throttle, a dashpot stops the throttle snapping shut. **Dashpot air** does the same job with the idle valve. It adds air while you're on the throttle and while coasting, so that the air is already in the intake when the engine comes back down to idle. Without it, the valve is already at the idle position when the engine arrives at idle, and the RPM can dip under the target before the closed loop catches it.

Dashpot air is purely open loop. It is not added while cranking or during the crank-to-idle taper, and once the engine is idling it is only ramped out (see below). When the coasting table is in use, the table sets the whole position while coasting, so dashpot air then only applies on the throttle.

**Ramp on return to idle** controls what happens when the engine enters the idling phase:

- **Idle: Target RPM** starts from the RPM the engine is at, and ramps down to the normal target over **Return to idle duration**. It never starts above the entry threshold, or below the normal target.
- The extra air commanded just before idle (the dashpot air or coasting table position, less the normal idle position) is ramped out over the same time, in step with the target. It is logged as **Idle: Open loop: Return to idle air**.
- Both ramps are scaled by how far above the target the engine was when it entered idle. Coming down from the entry threshold gives the full ramp. Lifting off near the target speed gives a small one, so most of the extra air is removed at once. Lifting off below the target gives no ramp at all.
- The ramp starts again each time the engine enters idle.

With **Ramp on return to idle** off, the target is the normal target straight away, and the extra air is removed as soon as the engine is idling.

Entering idle straight from the after-cranking taper doesn't carry any air over. The taper already handles that.

:::note
If the after-cranking taper finishes before **Inhibit idle after cranking** runs out, the rest of the inhibit time counts as coasting. Dashpot air (or the coasting table) then applies until it ends, and is ramped out like any other return to idle.
:::

### Idle timing

Two settings act on ignition timing at idle:

- **Closed-loop idle timing** adjusts timing to hold the target RPM. See [Closed-loop idle timing](#closed-loop-idle-timing) below.
- **Use idle ignition table** replaces the main ignition table with an RPM-based idle curve. See [Idle Ignition Table](/Basic-Features/Idle-Control/Idle-Ignition-Table).

Timing changes torque much faster than air does, so these catch quick RPM changes that the idle valve is too slow for.

## Settings

The **Idle settings** dialog has an **Idle control mode** selector and four panels.

| Setting | Units | Description |
| --- | --- | --- |
| Idle control mode | - | **Open Loop** uses the open loop position only. **Open Loop + Closed Loop** adds the closed loop correction and shows the **Closed Loop Idle** panel |

The dialog notes that solenoid idle control is disabled at zero RPM. A solenoid valve is switched off whenever the engine isn't turning, except during a bench test. Stepper valves and electronic throttles aren't affected by this.

### Idle Detection Thresholds

These decide when the engine counts as idling. They apply in both idle modes, and to everything else that depends on idle (idle tables, idle timing, closed loop fuel).

| Setting | Units | Description |
| --- | --- | --- |
| TPS threshold | % | Above this, the engine is in the running phase. Uses the accelerator pedal instead of TPS if you have one |
| RPM upper limit | RPM | How far above the target RPM the engine must drop to start idling. The coasting threshold is 1.5 times this above the target |
| Max vehicle speed | kph | Above this speed, the engine doesn't count as idling. 0 turns the check off |

#### TPS threshold

With an electronic throttle this checks the accelerator pedal, which reads very close to 0 % at rest, so 1 to 2 % is about right. With a cable throttle, set it just above the TPS reading with the throttle closed, so that a little sensor noise doesn't knock the engine out of idle.

The same threshold also blends the idle ignition and idle VE tables back to the main tables as the pedal is pressed. See [Idle Ignition Table](/Basic-Features/Idle-Control/Idle-Ignition-Table).

#### RPM upper limit

This sets how far above the target the engine can be and still start idling. Too small, and the engine may sit just above idle for a long time with no closed loop control. Too large, and closed loop idle starts pulling the engine down from high above the target, which can make it undershoot. The return-to-idle ramp also starts no higher than the entry threshold.

#### Max vehicle speed

This stops the idle controller treating a car that is still rolling in gear as idling. Closed loop idle would otherwise pull air out to bring the RPM down to target, and the engine then dips when you press the clutch. A setting of 20 to 40 kph is typical. It needs a working vehicle speed sensor.

### Open Loop Idle

| Setting | Units | Description |
| --- | --- | --- |
| Open loop base position | % | Base idle valve position, before the CLT multiplier and adders |
| A/C adder | % | Added to the position while the A/C is requested |
| A/C target adder | RPM | Added to the target RPM while the A/C is requested |
| Fan #1 adder | % | Added to the position while fan 1 is on |
| Fan #2 adder | % | Added to the position while fan 2 is on |
| Dashpot air | % | Added while on the throttle and while coasting, then ramped out on return to idle. See [Dashpot air and return to idle](#dashpot-air-and-return-to-idle) |

#### Open loop base position

Set this so that a fully warm engine idles slightly above the target RPM with closed loop off. Closed loop then only has to remove a little air, and the engine still idles if the closed loop has to back off. The log channel is **Idle: Open loop: Base**, which includes the CLT multiplier.

#### A/C and fan adders

The A/C compressor and electric fans load the engine (the fans through the alternator). These adders add air at the same moment, so the RPM doesn't sag while the closed loop catches up. Set each one to the position change the closed loop ends up making with that load on. **A/C target adder** raises the target RPM as well, which some cars need to keep the A/C working well at idle.

### Closed Loop Idle

Only shown in **Open Loop + Closed Loop** mode.

| Setting | Units | Description |
| --- | --- | --- |
| P-factor | - | Proportional gain, in % of position per RPM of error |
| I-factor | - | Integral gain, in % of position per RPM of error per second |
| D-factor | - | Derivative gain, acting on how fast the RPM is changing |
| Min | - | Lowest total closed loop correction, in % of position. Whole numbers only |
| Max | - | Highest total closed loop correction, in % of position. Whole numbers only |
| iTerm Min | - | Lower limit for the I-term, in % |
| iTerm Max | - | Upper limit for the I-term, in % |
| Always reset PID leaving idle | - | Clear the I-term every time the engine leaves idle, not only when it's negative |

#### PID terms

The error is **Idle: Target RPM** minus the engine speed, so a positive error means the engine is too slow and needs more air.

- **P-factor**: the P-term is the error times this gain. With a P-factor of 0.01, an engine 100 RPM below target gets 1 % more air.
- **I-factor**: the I-term grows by the error times this gain every second. With an I-factor of 0.01, a steady 100 RPM error adds 1 % per second. This is what removes a steady error, so it does most of the work at idle.
- **D-factor**: the D-term acts on the rate the RPM is changing, not on the change in error. A falling RPM adds air even if the engine is still above target. Because it ignores the target, the return-to-idle target ramp doesn't disturb it.

The three terms are added, then limited to **Min** and **Max** to give **Idle: Closed loop**. That is added to the open loop position. **iTerm Min** and **iTerm Max** limit the I-term on its own, so a long-standing error can't wind it up to an extreme. Keep **Min** and **Max** to the smallest range that lets the controller do its job.

### Extra Idle Features

| Setting | Units | Description |
| --- | --- | --- |
| Use idle ignition table | - | Use the **Ignition advance** curve under the Idle menu while idling. See [Idle Ignition Table](/Basic-Features/Idle-Control/Idle-Ignition-Table) |
| Use idle VE table | - | Use the **Idle VE** table while idling. See [Idle VE Table](/Basic-Features/Idle-Control/Idle-VE-Table) |
| Override Idle VE table load axis | - | Load axis for the idle VE table only. Shown when the idle VE table is on |
| Ramp on return to idle | - | Ramp the target and any extra air down on entering idle. See [Dashpot air and return to idle](#dashpot-air-and-return-to-idle) |
| Return to idle duration | sec | How long the return-to-idle ramp takes. Shown when the ramp is on |
| Inhibit idle after cranking | sec | For this long after cranking, the engine doesn't count as idling. 0 turns this off |
| Use idle tables for cranking taper | - | Also use the idle tables and the closed loop fuel idle region during the after-cranking taper. See [Advanced Idle](/Basic-Features/Idle-Control/Advanced-Idle#idle-tables-for-cranking-taper) |
| Use coasting idle table | - | Use the **Coasting IAC position** table while coasting. See [Advanced Idle](/Basic-Features/Idle-Control/Advanced-Idle#coasting-iac-position) |

#### Return to idle duration

A longer ramp holds the target and air up for longer, so the closed loop picks up the engine earlier and higher above the target. Too long, and the idle hangs high before it settles. Start with a second or two, and adjust it once **Dashpot air** is roughly right.

#### Inhibit idle after cranking

A freshly started engine often flares well above idle before settling. For this long after cranking the engine doesn't count as idling, so closed loop idle and closed-loop idle timing stay off and don't fight the flare. It applies in open loop mode too, because the phase is shared by everything that depends on idle.

## Target RPM

Under **Idle > Target RPM**. A curve of target idle RPM against coolant temperature. It's used by closed loop idle and closed-loop idle timing, and it sets the entry and exit thresholds in both idle modes.

Set a higher target when cold. A cold engine has more friction and needs more speed to idle smoothly and warm up. The logged target is **Idle: Target RPM**, which includes the A/C target adder and the return-to-idle ramp. **Idle: Target RPM: Base** is the value from this curve alone.

## Open loop CLT multiplier

Under **Idle > Open loop CLT multiplier**. The open loop base position is multiplied by this curve, against coolant temperature. For example, with a base position of 30 % and a multiplier of 1.5 at 0 °C, the position at 0 °C is 45 %. A multiplier of 1 leaves the base position unchanged.

A cold engine needs more air to idle at the same speed, so the multiplier is normally highest when cold and falls to 1 at operating temperature. Unless **Override cranking IAC CLT multiplier** is on, the cranking position uses this curve too (see [Cranking IAC](/Basic-Features/Cranking-Control/Cranking-IAC)).

## Closed-loop idle timing

Under **Idle > Closed-loop idle timing**. This adjusts ignition timing to hold the target RPM: advance when the engine is too slow, retard when it's too fast.

| Setting | Units | Description |
| --- | --- | --- |
| Enable closed loop idle ignition timing | - | Turns closed-loop idle timing on |
| Proportional gain | - | Degrees of advance per RPM of error |
| Derivative gain | - | Degrees of advance per RPM/s the engine speed is falling |
| Min adjustment (retard) | - | Most retard it can apply, in degrees, as a negative number. Whole degrees only |
| Max adjustment (advance) | - | Most advance it can apply, in degrees. Whole degrees only |

It is only active in the idling phase, and resets as soon as the engine leaves idle. It works in either **Idle control mode**. The adjustment is added to the timing along with the other timing corrections, so it only applies with dynamic ignition timing, not fixed timing.

For **Proportional gain**, a value of 0.1 gives 1° for every 10 RPM of error, so an engine 100 RPM below target gets 10° of advance. As the dialog notes, too much gain makes the adjustment jump between its limits. Somewhere around 0.05 is a reasonable start. Keep **Min adjustment (retard)** and **Max adjustment (advance)** as small as works. The adjustment is logged as **Idle: Timing adjustment**.

## Setup

1. Set up and test the idle valve under **Idle > Idle hardware** first. See [Idle Hardware](/Basic-Features/Idle-Control/Idle-Hardware).
2. Set the **Idle Detection Thresholds**: **TPS threshold** just above the closed throttle (or 1 to 2 % on a pedal), **RPM upper limit** a few hundred RPM, and **Max vehicle speed** if you have a speed sensor.
3. Set a **Target RPM** curve.
4. With **Idle control mode** on **Open Loop**, adjust **Open loop base position** until the warm engine idles slightly above target, then fill in the **Open loop CLT multiplier** curve as the engine warms up from cold.
5. Set the A/C and fan adders by watching how much extra air the engine needs with each load on.
6. Switch to **Open Loop + Closed Loop** and tune the PID. [Idle Tuning](/Basic-Features/Idle-Control/Idle-Tuning) has the procedure.
7. Lift off from a few thousand RPM, and from just above idle. If the RPM dips below target on the way down, turn on **Ramp on return to idle** and add **Dashpot air** a few % at a time.

## Checking it works

The TunerStudio indicator bar has **Idling** and **Coasting** indicators, and the **Idle position** gauge shows the final position. For anything more, log:

| Log channel | What it shows |
| --- | --- |
| Idle: Phase | 0 cranking, 1 idling, 2 coasting, 3 crank-to-idle taper, 4 running |
| Idle: Target RPM | Target used by closed loop, including the A/C adder and return ramp |
| Idle: Target RPM: Base, Idle: Target RPM: A/C bump | Parts of the target |
| Idle: Entry threshold, Idle: Exit threshold | The idling and coasting thresholds |
| Idle: Position | Final position sent to the valve |
| Idle: Open loop | Open loop position, including dashpot and return-to-idle air |
| Idle: Open loop: Base, Idle: Open loop: AC bump, Idle: Open loop: Fan bump | Parts of the open loop position |
| Idle: Open loop: Dashpot air, Idle: Open loop: Return to idle air | Dashpot air being added, and extra air being ramped out after entering idle |
| Idle: Closed loop | Closed loop correction |
| idleStatus_pTerm, idleStatus_iTerm, idleStatus_dTerm, idleStatus_error | Closed loop PID terms and error |
| Idle: Closed loop active | On whenever the phase is idling, in either idle mode |
| Idle: Timing adjustment | Closed-loop idle timing adjustment |

When the idle is right, **Idle: Closed loop** sits near zero with the engine warm and settled, and the I-term isn't pinned against **iTerm Min** or **iTerm Max**. On return to idle, the RPM follows **Idle: Target RPM** down without dropping below it.

## If it fails

| Failure | What idle control does |
| --- | --- |
| Throttle position sensor (or pedal, if fitted) | The engine is treated as being on the throttle, so it stays in the running phase. The valve is held at the open loop position plus **Dashpot air**. Closed loop idle, closed-loop idle timing, the idle ignition and VE tables and the closed loop fuel idle region are all off. See [Accelerator Pedal](/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP) |
| Coolant temperature sensor | Target RPM, the open loop and cranking positions and the cranking taper use their 0 °C values, giving a high but safe idle. See [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT#if-it-fails) |
| Vehicle speed sensor | Speed reads 0, so **Max vehicle speed** never stops the engine idling |

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| **Idle: Phase** stays at 4 with the throttle closed | **TPS threshold** below the closed-throttle reading, a failed TPS or pedal, or vehicle speed above **Max vehicle speed** |
| **Idle: Phase** stays at 2 just above idle | Engine idling above the entry threshold. Lower the open loop position, or raise **RPM upper limit** |
| RPM dips below target on lift-off, then recovers | Not enough **Dashpot air**, or a return-to-idle ramp that is too short |
| Idle hangs high for a while after lift-off | Too much **Dashpot air**, or **Return to idle duration** too long |
| RPM hunts up and down around the target | P-factor or I-factor too high, or closed-loop idle timing gain too high |
| Idle drifts slowly away from target and comes back | I-factor too low, or the I-term at its limit |
| RPM sags when the A/C or fans switch on | A/C or fan adder too small |
| Idle droops when the clutch is pressed while rolling | **Max vehicle speed** set to 0 or too high |
| Valve doesn't move while the engine is stopped | Normal for a solenoid valve, which is switched off at zero RPM |

## Related

- [Idle Tuning](/Basic-Features/Idle-Control/Idle-Tuning)
- [Idle Hardware](/Basic-Features/Idle-Control/Idle-Hardware)
- [Advanced Idle](/Basic-Features/Idle-Control/Advanced-Idle)
- [Idle Ignition Table](/Basic-Features/Idle-Control/Idle-Ignition-Table)
- [Idle VE Table](/Basic-Features/Idle-Control/Idle-VE-Table)
- [Cranking IAC](/Basic-Features/Cranking-Control/Cranking-IAC)
- [Closed Loop Fuel](/Advanced-Features/Fuel-Related/Closed-Loop-Fuel)
- [Air Conditioning](/Basic-Features/Air-Conditioning-Settings)

# Advanced Idle Control Features

Two optional idle features that change what happens around idle rather than at it: a separate idle position for coasting, and using the idle tables during the after-cranking taper. Both are switched on in the **Extra Idle Features** panel under **Idle > Idle settings**. For the idle phases they refer to, see [Idle Settings](/Idle-Control/Idle-Settings#idle-phases).

## Coasting IAC position

With **Use coasting idle table** on, the **Idle > Coasting IAC position** curve sets the idle position while the engine is coasting. Coasting means off the throttle and above the exit threshold (target RPM plus 1.5 × **RPM upper limit**), until the RPM drops below the entry threshold. It's phase 2 in **Idle: Phase**.

While coasting, the curve replaces the whole open loop position. The open loop base position, CLT multiplier, A/C and fan adders and **Dashpot air** are not added to it. The curve isn't used during the after-cranking taper, while idling, or on the throttle, where the normal open loop position (with dashpot air) applies.

| Setting | Units | Description |
| --- | --- | --- |
| RPM | RPM | Engine speed axis. Must be in ascending order, or the ECU raises a configuration error |
| Multiplier | % | Idle position at that RPM |

:::note
Despite the **Multiplier** column label, the values are an idle position in %, the same as **Open loop base position**. They are not multiplied by anything.
:::

Use it to reduce engine braking, which helps large engines in light cars, or to help an engine that has trouble returning to idle. More air while coasting means less engine braking. Start with values a little above your idle position, and raise them at higher RPM if you want less engine braking.

When the engine drops into idle with **Ramp on return to idle** on, the extra air from the coasting curve (anything above the normal idle position) is ramped out over **Return to idle duration**, the same way as dashpot air. A coasting position below the normal idle position isn't carried over. The position steps up to the idle position as soon as the engine is idling. See [Dashpot air and return to idle](/Idle-Control/Idle-Settings#dashpot-air-and-return-to-idle).

## Idle tables for cranking taper

**Use idle tables for cranking taper** makes the engine count as idling during the crank-to-idle taper phase as well as while idling. That phase is the after-cranking taper while the engine is above the idle exit threshold, or still inside **Inhibit idle after cranking** (see [Cranking IAC](/Cranking-Control/Cranking-IAC)). During it the ECU uses:

- the [Idle Ignition Table](/Idle-Control/Idle-Ignition-Table), if **Use idle ignition table** is on,
- the [Idle VE Table](/Idle-Control/Idle-VE-Table), if **Use idle VE table** is on,
- the idle region of [Closed Loop Fuel](/Fuel/Fuel-Settings/Closed-Loop-Fuel).

It doesn't turn on closed loop idle or closed-loop idle timing during the taper. Those only work in the idling phase. The setting is only shown when at least one of the idle ignition table, idle VE table or closed loop fuel is on.

With it off, these tables are used only in the idling phase. If the engine drops into idle during the taper, they apply from then on either way.

## Related

- [Idle Settings](/Idle-Control/Idle-Settings)
- [Cranking IAC](/Cranking-Control/Cranking-IAC)
- [Idle Tuning](/Idle-Control/Idle-Tuning)

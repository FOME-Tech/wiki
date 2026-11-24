# How Trigger Sync Works

Before it can fire a spark or an injector, FOME has to know where the engine is in its cycle. It works this out from the crank and cam sensors, together called the trigger. This page explains the ideas behind the trigger settings: what sync means, why a cam sensor matters, how RPM is measured, and what "cranking" and "running" mean to the ECU.

You don't need all of this to get an engine running. Most triggers just work once the right trigger type is selected, the sensors are on the right input pins and **Trigger Angle Advance** is set. [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) walks through those steps.

## Teeth and the sync point

A trigger wheel is a disc with teeth, read by a sensor as the teeth pass it. Each tooth gives the ECU a timestamp, but evenly spaced teeth all look alike. To know *which* tooth just passed, the pattern needs a feature that stands out. This is the sync point.

The most common feature is a gap where one or more teeth have been left out. A 36-1 wheel has room for 36 teeth, 10° apart, with one missing:

```text
 ... | | | | | |   | | | | | | ...
                 ^ ^
 missing tooth --' '-- sync point
```

As each tooth arrives, the ECU compares the time since the last tooth with the time between the two before it. Normal teeth give a ratio of about 1. At the gap, the ratio jumps to about 2 for one missing tooth, or about 3 for two. When the ratio falls in the range expected for that trigger type, the tooth just after the gap is taken as the sync point. Every other tooth is then identified by counting from there.

Other triggers use different features: uneven tooth spacing, teeth of different widths, or a second wheel read by a second sensor. The principle is the same. The trigger type tells the ECU what pattern to expect, and the ECU looks for the feature that marks the sync point. See [Trigger Types](/Base-Engine/Trigger/Trigger-Types) for the patterns FOME supports.

FOME also checks that the right number of teeth arrives between one sync point and the next. If the count is wrong, it logs a trigger error, stops scheduling fuel and spark, and waits for the next good sync point.

## Where the sync point sits in the cycle

The sync point is wherever the wheel's gap happens to be, not at top dead centre (TDC). FOME needs to know the angle between the two, so that it can turn "10° before TDC" into "this long after that tooth". That angle is **Trigger Angle Advance**. It is the single most important trigger setting, and you check it with a timing light. [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup) has the procedure.

All engine angles in FOME are measured from TDC of cylinder 1 at the end of its compression stroke. The other cylinders' positions follow from the [firing order](/Base-Engine/Firing-Order).

## The 720° cycle

A four-stroke engine takes two crank revolutions, 720°, to complete one cycle of intake, compression, power and exhaust. Each piston reaches TDC twice per cycle: once at the end of compression, where the spark belongs, and once at the end of exhaust.

A wheel on the crank turns once per revolution, so it looks exactly the same on both turns. On its own, a crank wheel tells the ECU where the crank is within a revolution, but not which half of the 720° cycle the engine is in. A wheel on the camshaft turns at half crank speed, once per cycle, so it can tell the two halves apart.

A two-stroke engine completes its cycle in one revolution, so its cycle is 360° and a crank wheel is all it needs.

## Half sync and full sync

With a crank wheel only, FOME has half sync. It knows the crank angle, but has to treat the two revolutions as interchangeable. That is enough to run:

- **Wasted spark**, where each coil fires at both TDCs, once usefully and once on the exhaust stroke. If the ignition mode is set to individual coils, FOME fires them as wasted spark until it has full sync.
- **Batch or simultaneous fuel**, where injectors fire more than once per cycle, so it doesn't matter which revolution is which.

With a cam sensor as well, FOME gets full sync. Once the cam signal has been seen, it knows which revolution is which, and can run **sequential** fuel and individual-coil spark, each timed for its own cylinder. With sequential fuel selected and a cam input configured, FOME uses batch fuel until the cam has resolved the phase, then switches over. The log channel **Trg: Fully synchronized** shows when it has full sync.

:::note
Sequential fuel needs a cam sensor. With no cam input configured, FOME can't tell the two revolutions apart, so sequential injection is timed from a guess and lands a full crank turn away from where you intended about half the time. Use batch or simultaneous fuel on a crank-only setup.
:::

Some crank wheels have a pattern that repeats more than once per revolution, such as the Miata NB and several Nissan crank wheels. On these the crank alone can't even identify the cylinder, so FOME doesn't fire fuel or spark at all until the cam has resolved the phase.

A trigger on the camshaft, or any cam-speed wheel such as one in a distributor, turns once per cycle and gives full sync by itself.

The cam settings are covered on [Cam Sync](/Base-Engine/Trigger/Cam-Sync).

## How RPM is measured

Normally FOME measures RPM once per engine cycle, from the time the engine takes to turn through one whole cycle. This is very steady, because it averages over a whole cycle, but it only updates once per cycle, so it lags behind sudden changes.

### Instant RPM

Instant RPM is measured at every tooth, from the time the crank took to turn through the last part of a revolution. The angle it looks back over is **Instant Rpm Range**, in **Controller > Experimental/Broken**. It reacts within a fraction of a revolution, which helps while cranking and for features such as idle timing control that respond to small speed changes. FOME always calculates it. It also uses it as the main RPM reading on triggers with at least 24 teeth per engine cycle, which means a 12-tooth crank wheel or better. On triggers with fewer teeth, enable **Always use instant RPM** in the same dialog to use it anyway, at some cost in accuracy.

## Cranking and running

FOME treats the engine as being in one of three states:

- **Stopped**: no trigger teeth are arriving. FOME declares the engine stopped shortly after the teeth stop, and drops its sync.
- **Cranking**: the engine is turning, but hasn't yet reached **Cranking RPM limit**. Cranking fuel and cranking timing are used.
- **Running**: RPM has reached **Cranking RPM limit**. The normal fuel and timing tables take over.

Once the engine is running, it stays running even if RPM dips below the cranking limit, for example during a stumble. It only goes back to cranking after it has stopped. See [Cranking RPM Limit](/Cranking-Control/Cranking-RPM-Limit) for choosing the limit.

With **Enable faster engine spin-up** (in **Cranking > Cranking settings**), FOME estimates RPM from the first teeth it sees, so it can start firing before it has measured a whole engine cycle.

## Related

- [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)
- [Cam Sync](/Base-Engine/Trigger/Cam-Sync)
- [Trigger Types](/Base-Engine/Trigger/Trigger-Types)
- [Trigger Troubleshooting](/Base-Engine/Trigger/Trigger-Troubleshooting)
- [Firing Order](/Base-Engine/Firing-Order)

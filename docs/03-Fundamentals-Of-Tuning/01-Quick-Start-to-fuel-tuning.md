# Quick Start to fuel tuning

These instructions make some pretty serious assumptions:

1. You have a setup that isn't going to grenade if you get things wrong for a few seconds
2. You know to lift off the throttle quickly if things are wrong
3. Your ignition maps are safe.  THIS IS A BIG ASSUMPTION.
4. These instructions are oriented towards a naturally aspirated engine.  Tuning a boosted engine this way is probably too risky, although it will work.  Consider popping wastegate open with shop air, zip tie-ing bypass valve, popping a charge pipe (which has its own risks) or similar method to limit boost to minimal levels

:::danger

If you are not sure about your ignition maps, have a high-strung engine likely to blow up and hurt things, DO NOT DO THIS.  These instructions assume a certain degree of forgiveness, which all engines are not necessarily going to give you.

:::

Roughing in a fuel/VE map:

1. Estimate maximum VE value.  For something like a 70s pushrod V8, this is probably 85-90%.  For a modern overhead cam 4 valve head, this is probably more like 95%.  For a very modern engine with VVT and high quality heads, this could be as high as 100%.
2. Set VE table to expected maximum value for loads 90kpa - 100kpa.  set target AFR to something safe and THE SAME ACROSS THE BOARD i.e. 0.8 lambda everywhere
3. run engine hard, log AFR.  We're talking Wide Open Throttle (WOT) operation
4. adjust injector size so that target AFR at peak torque (VE) is achieved.  You will end up with lots of areas too rich and one narrow area in the middle of the powerband where AFR is just right
5. adjust VE at high load in order to achieve uniform AFR at WOT.  This will mean decreasing VE as you move away from peak torque, where VE will be highest.
6. set entire table vertically (i.e. same RPM different load) as WOT VE
7. Pick a couple of part throttle load points.  Adjust VE at part throttle load points to achieve target AFR.  Apply same correction to all RPM points at chosen load.
8. Interpolate from chosen VE points vertically to WOT (or the next highest VE point you tuned)
9. extrapolate trends to lowest throttle loads
10. Set more reasonable target AFRs (i.e. 1.0 lambda at part throttle, 0.85 lambda at power desired)
11. adjust injector latency to achieve reasonable idle AFRs
12. revisit part throttle VE after latency changes with the expectation of small change in the opposite direction as latency changes.  i.e. if you increased latency, expect to decrease VE but only a very small amount

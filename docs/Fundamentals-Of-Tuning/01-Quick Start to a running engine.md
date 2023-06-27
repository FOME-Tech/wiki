1. set VE table to 100% for loads 90kpa - 100kpa.  set target AFR to something safe and THE SAME i.e. 0.8 lambda everywhere
2. run engine hard, log AFR
3. adjust injector size so that target AFR at peak torque (VE) is achieved
4. adjust VE at high load in order to achieve uniform VE at WOT
5. set entire table vertically (i.e. same RPM same VE) as WOT VE
6. Pick a couple of part throttle load points.  Adjust VE at part throttle load points to achieve target AFR.  Apply same correction to all RPM points as chosen VE.
7. Interpolate from chosen VE points vertically to WOT (or the next highest VE point you tuned)
8. extrapolate trends to lowest thottle loads
9. Set more reasonable target AFRs (i.e. 1.0 lambda at part throttle, 0.85 lambda at power desired)
10. adjust injector latency to achieve reasonable idle AFRs

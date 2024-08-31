# TPS Based Acceleration Correction

There are three menus for TPS-Based Acceleration Correction, including _Accel/Decel Enrichment_, _TPS/TPS Acceleration Extra Fuel_ and _TPS/TPS AE RPM Correction_.

## Accel/Decel Enrichment

### TPS

- __Length__: How long to look back for events that will trigger TPS-based acceleration enrichment. Increasing this time will trigger enrichment for longer when a throttle position change occurs as the strategy can "look back" over a longer period of time. The delta is determined by comparing the minimum TPS to the maximum TPS value across all events in this time period. See variable _Fuel: TPS AE change_ for the delta value.
- __Accel Threshold__: Minimum delta of TPS over the time period specified by _Length_ to activate acceleration enrichment. Actual TPS change has to be above this value in order for TPS/TPS acceleration to kick in. The actual added injection pulsewidth for accel enrichment is handled by the _TPS/TPS Acceleration Extra Fuel_ table.
- __Decel Threshold__: Maximum change delta of TPS percentage over the time period specified by _Length_. Currently not used as the Decel Fuel Enleanment Coefficient (_tpsDecelEnleanmentMultiplier_) is not exposed in TunerStudio.

### Accelerator Pump Model

- __Fraction Period__:
- __Fraction Divisor__:

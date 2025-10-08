# ETB redundancy

## Reason for redundancy in ETB position sensing

Redundancy provides safety in the critical sensors controlling the engine's power.

FOME tolerates up to 5% deviation in the redundant sensors, to account for slight non-linearity and inaccuracy in the sensors, and to allow for fluctuations due to environmental changes and extremes.

Throttle position and accelerator pedal position sensors support redundancy.

## Fully Redundant sensors

Sensors will typically be of this type, providing redundant sensing across the entire sensing range.

Things like 0.5-4.5 volt primary sensing with delta, inverted, or half-value characteristics for the secondary sensor.

## Partial Redundancy sensors

These sensors are equipped with a **linear primary sensor** like the fully redundant sensors, but **the secondary sensor doesn't cover the full sensing range**.  Instead, it reaches full-scale well before the primary sensor, providing only "partial" redundancy and a overall non-linear output over the full range.

Some **Ford** and **Toyota** applications are of this type, either TPS (including ETBs), APPS, or both. Known partially redundant units:

- ETB: Ford 4M5G-EDLF15

While using partially redundant sensors with the **default** Tunerstudio settings most likely a **TPS error** will occur. While the error is active you will be able to run the *Automatic TPS Calibration* but the *Automatic ETB PID Calibration* procedure will be disabled. To clear the error the solution is to use the **Partial Secondary TPS Maximum(%)** setting (Tunerstudio > TPS settings) to allow a greater difference between the primary and secondary sensor. Good known values:
- Ford ~53%
- Toyota ETCS-i ~65%
- To disable the setting use 0 or 100%

FOME supports partially redundant sensors with the `tpsSecondaryMaximum` and `ppsSecondaryMaximum` tune configurations.  When necessary, these values should be tuned to indicate the percent of the primary sensor's full-scale reading at which the secondary sensor has just reached it's maximum.  There are a number of techniques to determine this value, both directly/precisely and indirectly.

A direct method would be like:

1. calibrate the sensor's minimum and maximum, e.g. `tps1PrimaryMin`/`tps1PrimaryMax` and `tps1SecondaryMin`/`tps1SecondaryMax`
2. manipulate the sensor until the secondary value just reaches its maximum value, and record the primary's percentage at this point as the sensor's secondary maximum, e.g. `tpsSecondaryMaximum`

Another method is to iterate upon a close value, looking for TPS error while manipulating the sensor, and adjusting the value until the error goes away. This can lead to imprecision in the calibration however, and may lead to redundancy faults when environmental conditions change too much from that of its calibration.

Valid values are in the range of 20-100%, with `100` effectively disabling the feature. The value `0` also disables the feature, and values less than 20% are in error.

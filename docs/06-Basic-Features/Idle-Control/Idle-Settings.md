# Idle settings

## Idle Detection Thresholds
### TPS Threshold
The TPS value must be below this % before closed loop idle can be entered. When using an Electronic Throttle Body (ETB) this references the Accelerator Pedal Position sensor instead.

### RPM upper limit(RPM)
The engine speed must be at or below the target RPM plus this value before closed loop idle can be entered. For example if the Idle Target RPM is 750 RPM and this value is set to 200, the engine speed must be at or below 950 RPM before closed loop idle can be entered.

### RPM deadzone
When the engine speed is within this many RPM of the target idle RPM, the closed loop idle algorithm is disabled. This is to prevent unwanted oscillation around the target.

### Max vehicle speed
The VSS must be at or below this speed before closed loop idle can be entered. Setting this to 0 disables this check.

## Idle target RPM

## TPS threshold

## RPM upper limit

## RPM deadzone

## Max Vehicle speed for idle

---
description: Use Lua to extend and customize firmware behavior
---

# Lua Scripting

## Introduction

FOME allows to extend and customize firmware functionality and behavior by providing a [Lua script
interpreter](https://www.lua.org/docs.html).  Various sensors, signals, and state are provided for reading and
manipulating , allowing to tailor a control strategy to fit the applications needs.

This page documents the most up-to-date version of FOME's Lua scripting support: not all interfaces are supported in
earlier versions.

For examples see the files in the [firmware's `.../lua/examples/` directory](https://github.com/FOME-Tech/fome-fw/tree/master/firmware/controllers/lua/examples).

For a basic introduction see [this wiki section](https://wiki.rusefi.com/Lua-Scripting/).

## Lua Types

### `Timer`

A Lua type that keeps track of seconds.  The timer does not initialize to a reset state; instead it initializes to a
"foreverish" value.

```lua
timer = Timer.new()
```

#### `Timer.getElapsedSeconds()`

Returns the number of seconds since the timer was last reset.

#### `Timer.reset()`

Resets the timer to begin counting from zero.

### `Sensor`

A Lua type that allows to control the value of sensors.  The type is implemented as a "stored-value" sensor, that
operates asynchronously and whose value is invalidated periodically upon a given timeout (initially: 100 milliseconds).

```lua
sensor = Sensor.new("OilPressure")
```

#### `Sensor.new(name)`

|parameter|type|description|
|-:|--|:-|
|`name`|string|the name of the sensor to control; see [`sensor_type.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/sensors/sensor_type.h#L18)|

#### `Sensor.set(value)`

Sets the controlled sensor's value as provided.

|parameter|type|description|
|-:|--|:-|
|`value`|float|the value to set the controlled sensor to|

#### `Sensor.setRedundant(isRedundant)`

Sets the redundancy-aspect of the controlled sensor.

|parameter|type|description|
|-:|--|:-|
|`isRedundant`|boolean|whether or not the controlled sensor is redundant|

#### `Sensor.setTimeout(timeoutMs)`

Sets the timeout for the controlled sensor's stored-value.

|parameter|type|description|
|-:|--|:-|
|`timeoutMs`|integer|how long the controlled sensors value is valid for, in milliseconds|

#### `Sensor.invalidate()`

Invalidates the controlled sensor's stored-value.

### `Pid`

A Lua type that implements a [PID (proportional-integral-derivative) controller](https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller#Fundamental_operation).

$$u(t) = K_\text{p} e(t) + K_\text{i} \int_0^t e(\tau) \,\mathrm{d}\tau + K_\text{d} \frac{\mathrm{d}e(t)}{\mathrm{d}t}$$

```lua
pid = Pid.new(1.5, 0.2, 0.1, -80, 80)
```

#### `Pid.new(kp, ki, kd, min, max)`

|parameter|type|description|
|-:|--|:-|
|`kp`|float|$$K_\text{p}$$, the proportional factor of the PID control|
|`ki`|float|$$K_\text{i}$$, the integral factor of the PID control|
|`kd`|float|$$K_\text{d}$$, the derivative factor of the PID control|
|`min`|float|the minimum output value of the PID control; output is limited above this value|
|`max`|float|the maximum output value of the PID control; output is limited below this value|

#### `Pid.get(target, input)`

TODO: description

|parameter|type|description|
|-:|--|:-|
|`target`|float|TODO: description|
|`input`|float|TODO: description|

#### `Pid.setOffset(offset)`

TODO: description

|parameter|type|description|
|-:|--|:-|
|`offset`|float|TODO: description|

#### `Pid.reset()`

Resets the PID controller.

## Lua Functions/Hooks

### Util

These hooks are included in all builds of FOME.

#### `print`

#### `interpolate`

#### `findCurveIndex`

#### `findTableIndex`

#### `findSetting`

#### `getNowSeconds`

currently not implemented

### Util (STM32F4 and STM32F7 only)

These hooks are included in all builds of FOME targetting an STM32F4 or STM32F7 board.

#### `mcu_standby`

### Core

These hooks are included in all builds of FOME.

#### `setTickRate(hertz)`

#### `readPin`

#### `vin`

#### `getAuxAnalog`

#### `getSensorByIndex`

#### `getSensor`

#### `getSensorRaw`

#### `hasSensor`

#### `table3d`

#### `curve`

#### `setLuaGauge(index, value)`

Sets the given Lua gauge to the provided value.  Currently two Lua guages are supported: `index = 1` and `index = 2`.
This can also be accomplished by using the Lua `Sensor` interface, but is more convenient to use.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|index of the Lua gauge to set|
|`value`|number|the value to set the Lua gauge identifed by `index` to|

#### `enableCanTx`

#### `restartEtb`

#### `crc8_j1850`

#### `setTimingAdd`

#### `setTimingMult`

#### `setFuelAdd`

#### `setFuelMult`

#### `setEtbAdd`

#### `setEtbDisabled`

#### `setIgnDisabled`

#### `setClutchUpState`

#### `setBrakePedalState`

#### `setAcRequestState`

#### `getCalibration`

#### `getOutput`

#### `setCalibration`

#### `getGlobalConfigurationVersion`

#### `setAcDisabled`

#### `getTimeSinceAcToggleMs`

#### `startPwm`

#### `setPwmDuty`

#### `setPwmFreq`

#### `getFan`

#### `getDigital`

#### `getAuxDigital`

#### `setDebug`

#### `getAirmass`

#### `setAirmass`

#### `resetOdometer`

### SENT (SAE J2716)

These hooks are included in builds of FOME that incorporate [SAE J2716 SENT](https://en.wikipedia.org/wiki/SENT_(protocol)) support.

#### `getSentValue`

#### `getSentValues`

### CAN

These hooks are included in builds of FOME that incorporate [CAN](https://en.wikipedia.org/wiki/CAN_bus) support.

#### `canRxAdd`

#### `canRxAddMask`

#### `txCan`

### Launch Control

#### `setSparkSkipRatio`

### Crankshaft Position Input

#### `selfStimulateRPM`

#### `getEngineState`

#### `getTimeSinceTriggerEventMs`

### Boost Control

#### `setBoostTargetAdd`

#### `setBoostTargetMult`

#### `setBoostDutyAdd`

### Idle Control

#### `setIdleAdd`

### Vehicle Speed

#### `getCurrentGear`

#### `getRpmInGear`

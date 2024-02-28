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

## Overview

FOME provides Lua interface with a number of functions and types to interface with the firmware and to discern and manipulate its state and configuration.  At a high level, the interface comprises these categories:

- A small utility library, including timers, and user-defined lookups; see the [Utilities](#utilities) reference.
- General input and output; see the [Input and Output](#input-and-output) reference.
- Firmware sensors and control; see the [Sensors](#sensors) reference.
- CAN bus communication; see the [CAN bus](#can-bus) reference.
- SENT protocol communication; see the [SENT protocol](#sent-protocol-sae-j2716) reference.
- Firmware state and configuration; see the [Firmware ... TODO](#firmware--todo) reference.

<!--

- Inputs from sensors can be read directly; see [Input](#input)
- Control of ECU general purpose outputs; see [Output](#output).
- Aspects of the engine can be controlled directly; see [Engine Control](#engine-control).
- FOME Configuration can be accessed via the [`getCalibration`](#getcalibrationname) hook, and manipulated via the [`setCalibration()`](#setcalibrationname-value-needevent) hook.
  - Configuration names are dynamically updated to match the current firmware; see here for the current list: ...
- ECU internal state, i.e. logic outputs from the firmware can be read via the universal [`getOutput()`](#getoutputname) hook, and some can be altered via correspondingly named hooks i.e. `setOutputName()` where `OutputName` is name of the output, e.g. [`setClutchUpState()`](#setclutchupstatevalue).  See also: [Output](#output).
  - Output names are dynamically updated to match the current firmware; see here for the current list: [https://github.com/rusefi/rusefi/blob/master/firmware/controllers/lua/generated/output_lookup_generated.cpp](https://github.com/rusefi/rusefi/blob/master/firmware/controllers/lua/generated/output_lookup_generated.cpp).

-->

For examples see the files in FOME's [`lua/examples/` directory](https://github.com/FOME-Tech/fome-fw/tree/master/firmware/controllers/lua/examples/).

For a basic introduction see [this wiki section](https://wiki.rusefi.com/Lua-Scripting/).

## Conventions

- The Lua interpreter will trigger an error if there is a mistake in the program: check the FOME Console to see errors and script output.
- Unless otherwise mentioned, all `index` parameters start with the first element at index 0.

## Writing Your Script

The entire Lua script is read and validated at startup, then a global script function named `onTick` is invoked periodically by the firmware.

Here is a simple script to illustrate this behavior:

```lua
print('Hello FOME via Lua!')

function onTick()
    print('FOME called onTick()')
end
```

## User-Defined Lookup Tables and Curves

FOME provides for user-defined lookup tables and curves for use with Lua scripting. These tables and curves are set in
the FOME configuration (via TunerStudio) and lookups are interpolated along their definition.

The tables and curves have user-defineable names up to sixteen characters long. Their names and definitions are
configurable in the *Advanced > Lua Calibrations* menu in TunerStudio.

### 3D Tables

FOME provides four user-definable three-dimensional tables for use with Lua scripting. The first table affords the most
precision, defined by single-precision floating-point values, while the remaining three tables are defined by 8-bit
integers; all tables are eight by eight in dimension, defined by 16-bit integer coordinates.

TODO: insert TunerStudio Script Table dialog screenshots

Two functions are provided to interact with the user-defined tables:

- [`findTableIndex(name)`](#findtableindexname)
- [`table3d(index, x, y)`](#table3dindex-x-y)

### 2D Curves

FOME provides six user-definable two-dimensional curves for use with Lua scripting. The first two curves affords the
most accuracy, defined by sixteen single-precision floating-point coordinates, while the remaining four curves are
defined by eight single-precision floating-point coordinates.

TODO: insert TunerStudio Script Curve dialog screenshots

Two functions are provided to interact with the user-defined curves:

- [`findCurveIndex(name)`](#findcurveindexname)
- [`curve(index, x)`](#curveindex-x)

## User-Defined Settings

FOME provides eight user-definable single-precision floating-point settings for use with Lua scripting.

- [`findSetting(name, defaultValue)`](#findsettingname-defaultvalue)

## Lua Interface Reference

### Utilities

:::info
These functions are included in all builds of FOME unless otherwise noted.
:::

<!--
#### `getNowSeconds()`

Currently not implemented.
-->

#### `mcu_standby()`

:::warning
`mcu_standby` is only availble in FOME builds targetting STM32 F4 and STM32 F7 MCUs.
:::

Causes the firmware to place the MCU into a low current consumption standby mode.

|*no parameters*|
|--|

#### `print(message)`

Print a line of text to the ECU's log.

|parameter|type|description|
|-:|--|:-|
|`message`|string|The message to print. Pass a string (or number) and it will be printed to the log.|

#### `setDebug(index, value)`

Sets the debug channel of the specified index to the given value.

:::note
`setDebug` only works when FOME's [debug mode](/Advanced-Features/Debug-Mode) is set to `Lua`.
:::

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the debug channel to set; 1 through 6.|
|`value`|float|The value to set the specified debug channel to.|

#### `setTickRate(frequency)`

Set the frequency at which the firmware passes context to the Lua script. Primarily, this controls how often FOME calls
the script's `onTick` function. Additionally, this affects how often other functions and callbacks of the script, like
`onCanRx`, are invoked.

The default rate set at startup is 10 times per second (10 Hz).

|parameter|type|description|
|-:|--|:-|
|`frequency`|float|The tick rate to set, in hertz. Values are clamped to be not less than 1 hertz and not more than 200 hertz.|

#### `crc8_j1850(data, length)`

TODO: computes the OBD-II (SAE J1850) CRC-8 cyclic redundancy check on up to eight bytes of data

|parameter|type|description|
|-:|--|:-|
|`data`|integer table||
|`length`|integer||

#### `interpolate(x1, y1, x2, y2, x)`

Linearly interpolate a value `x` along the line defined by two points `(x1, y1)` and `(x2, y2)`.

|parameter|type|description|
|-:|--|:-|
|`x1`|float|The x-axis value of the first point of the line.|
|`y1`|float|The y-axis value of the first point of the line.|
|`x2`|float|The x-axis value of the second point of the line.|
|`y2`|float|The y-axis value of the second point of the line.|
|`x`|float|The x-axis value of the point to interpolate along the line defined by `(x1, y1)` and `(x2, y2)`.|

#### `findTableIndex(name)`

Determine the user-defined Lua script table index identified by its name.

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the user-defined table to determine the index of.|

#### `table3d(index, x, y)`

Lookup a linearly interpolated value from the specified user-defined Lua script table. Tables are identified by their
1-based index: 1, 2, 3, 4.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the user-defined table to lookup into; 1 through 4.|
|`x`|float|The x-axis value to lookup in the specified table.|
|`y`|float|The y-axis value to lookup in the specified table.|

#### `findCurveIndex(name)`

Determine the user-defined Lua script curve index identified by its name.

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the user-defined curve to determine the index of.|

#### `curve(index, x)`

Lookup a linearly interpolated value from the specified user-defined Lua script curve. Curves are identified by their
1-based index: 1, 2, 3, 4, 5, 6.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the user-defined curve to lookup into; 1 through 6.|
|`x`|float|The x-axis value to lookup in the specified curve.|

#### `findSetting(name, defaultValue)`

Retrieve the value of the user-defined Lua setting identified by its name, or the supplied value if the setting does
not exist.

This is most useful when the script developer and consumer are different people, and also when editing the Lua script
in TunerStudio.

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the user-defined setting to retrieve the value of.|
|`defaultValue`|float|The value to use if specified user-defined setting does not exist.|

#### `Timer`

`Timer` is Lua type that keeps track of elapsed seconds. The timer does not initialize to a reset state; instead it
initializes to a "foreverish" value.

```lua
timer = Timer.new()
```

##### `Timer.new()`

|*no parameters*|
|--|

##### `Timer.getElapsedSeconds()`

Returns the number of seconds since the timer was last reset.

|*no parameters*|
|--|

##### `Timer.reset()`

Resets the timer to begin counting from zero.

|*no parameters*|
|--|

#### `Pid`

`Pid` is a Lua type that implements a [PID (proportional-integral-derivative) controller](https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller#Fundamental_operation).

$$u(t) = K_\text{p} e(t) + K_\text{i} \int_0^t e(\tau) \,\mathrm{d}\tau + K_\text{d} \frac{\mathrm{d}e(t)}{\mathrm{d}t}$$

The implementation automatically tracks the time delta between `Pid.get` invocations.

```lua
pid = Pid.new(1.5, 0.2, 0.1, -80, 80)
```

##### `Pid.new(kp, ki, kd, min, max)`

|parameter|type|description|
|-:|--|:-|
|`kp`|float|$$K_\text{p}$$, the proportional factor of the PID control.|
|`ki`|float|$$K_\text{i}$$, the integral factor of the PID control.|
|`kd`|float|$$K_\text{d}$$, the derivative factor of the PID control.|
|`min`|float|The minimum output value of the PID control; output is limited above this value.|
|`max`|float|The maximum output value of the PID control; output is limited below this value.|

##### `Pid.get(target, input)`

Retrieves the PID controller's output given the target setpoint and the output of the process or system the PID is controlling.

|parameter|type|description|
|-:|--|:-|
|`target`|float|The target setpoint of the PID controller.|
|`input`|float|The output of the process or system that is feedback to the PID controller.|

##### `Pid.setOffset(offset)`

Sets the amount to statically bias the PID controller output by.

|parameter|type|description|
|-:|--|:-|
|`offset`|float|The amount to add to the computed PID controller output.|

##### `Pid.reset()`

Resets the PID controller.

|*no parameters*|
|--|

### Input and Output

#### `getAuxAnalog(index)`

|parameter|type|description|
|-:|--|:-|
|`index`|integer||

#### `getAuxDigital(index)`

|parameter|type|description|
|-:|--|:-|
|`index`|integer||

#### `getDigital(index)`

|parameter|type|description|
|-:|--|:-|
|`index`|integer||

#### `readPin(name)`

Returns the physical value of an MCU pin by its name.

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the MCU pin to return the value of; e.g. "PD15".|

#### `startPwm(index, frequency, duty)`

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the PWM output to control; 0 through 7.|
|`frequency`|float|The frequency to set the PWM output to. Values are clamped to be not less than 1 hertz and not more than 1000 hertz.|
|`duty`|float|The duty cycle (on time) to set the PWM output to. Values are clamped to be not less than 0.0 and not more than 1.0.|

#### `setPwmDuty(index, duty)`

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the PWM output to control; 0 through 7.|
|`duty`|float|The duty cycle (on time) to set the PWM output to. Values are clamped to be not less than 0.0 and not more than 1.0.|

#### `setPwmFreq(index, frequency)`

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the PWM output to control; 0 through 7.|
|`frequency`|float|The frequency to set the PWM output to. Values are clamped to be not less than 1 hertz and not more than 1000 hertz.|

<!--
#### `setDacVoltage(index, value)`
-->

#### `setLuaGauge(index, value)`

Sets the given Lua gauge to the provided value. Currently two Lua guages are supported: indices 1 and 2.
This can also be accomplished by using [the Lua `Sensor` interface](#sensor), but `setLuaGauge` is more convenient to use.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the Lua gauge to set.|
|`value`|number|The value to set the Lua gauge to.|

### Sensors

#### `hasSensor(index)`

Checks whether a particular sensor is configured (whether it is currently valid or not).

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the sensor to check; see [`sensor_type.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/sensors/sensor_type.h#L18).|

#### `getSensor(name)`

Returns the value of a sensor by its name.

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the sensor to get the value of; see [`sensor_type.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/sensors/sensor_type.h#L18).|

#### `getSensorRaw(index)`

Returns the raw value of a sensor by its name. For most sensors this means the analog voltage on the relevant input pin.

:::note
Returns 0 if the sensor doesn't support raw readings, isn't configured/valid, or has failed.
:::

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the sensor to get the value of; see [`sensor_type.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/sensors/sensor_type.h#L18).|

#### `getSensorByIndex(index)`

Returns the value of a sensor by its index.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The index of the sensor to get the value of; see [`sensor_type.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/sensors/sensor_type.h#L18).|

#### `Sensor`

`Sensor` is a Lua type that allows to control the value of sensors. The type is implemented as a "stored-value" sensor,
that operates asynchronously and whose value is invalidated periodically upon a given timeout (initially: 100 milliseconds).

```lua
sensor = Sensor.new("OilPressure")
```

##### `Sensor.new(name)`

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of the sensor to control; see [`sensor_type.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/sensors/sensor_type.h#L18).|

##### `Sensor.set(value)`

Sets the controlled sensor's value as provided.

|parameter|type|description|
|-:|--|:-|
|`value`|float|The value to set the controlled sensor to.|

##### `Sensor.setRedundant(isRedundant)`

Sets the redundancy-aspect of the controlled sensor.

|parameter|type|description|
|-:|--|:-|
|`isRedundant`|boolean|Whether or not the controlled sensor is redundant.|

##### `Sensor.setTimeout(timeoutMs)`

Sets the timeout for the controlled sensor's stored-value.

|parameter|type|description|
|-:|--|:-|
|`timeoutMs`|integer|How long the controlled sensors value is valid for, in milliseconds.|

##### `Sensor.invalidate()`

Invalidates the controlled sensor's stored-value.

|*no parameters*|
|--|

### Firmware ... TODO

TODO

#### `getOutput(name)`

Returns the value of an "output" from FOME: allows to inspect "internal" firmware state.

TODO: reference list of valid outputs

|parameter|type|description|
|-:|--|:-|
|`name`|string|The name of a FOME output/state to return the value of.|

#### `setClutchUpState(isUp)`

Use `setClutchUpState` to tell FOME about CAN-based brake pedal.

|parameter|type|description|
|-:|--|:-|
|`isUp`|boolean|Whether the clutch is up or not.|

#### `setBrakePedalState(isUp)`

Use `setBrakePedalState` to tell FOME about CAN-based brake pedal.

|parameter|type|description|
|-:|--|:-|
|`isUp`|boolean|Whether the brake pedal is up or not.|

#### `setAcRequestState(isRequested)`

Use `setAcRequestState` to tell FOME about CAN-based A/C request.

|parameter|type|description|
|-:|--|:-|
|`isRequested`|boolean|Whether the A/C is requested on or not.|

#### `restartEtb()`

TODO

|*no parameters*|
|--|

#### `setEtbDisabled(isDisabled)`

TODO

|parameter|type|description|
|-:|--|:-|
|`isDisabled`|boolean|Whether the ETB is disabled or not.|

#### `setIgnDisabled(isDisabled)`

TODO: `setIgnDisabled` function for all kinds of cranking safety systems

|parameter|type|description|
|-:|--|:-|
|`isDisabled`|boolean|Whether the ignition is disabled or not.|

#### `setAcDisabled(isDisabled)`

TODO: Disable/suppress A/C functionality regardless of what and how enables it, an override kind of deal.

|parameter|type|description|
|-:|--|:-|
|`isDisabled`|boolean|Whether the A/C is disabled or not.|

#### `getTimeSinceAcToggleMs()`

TODO

|*no parameters*|
|--|

#### `getCalibration(name)`

TODO: Gets current calibration value for specified scalar setting ``name``. For example ``getCalibration("cranking.rpm")``

For complete list of possible calibration names (valid parameter values) and descriptions see `value_lookup_generated.md`.

|parameter|type|description|
|-:|--|:-|
|`name`|string|TODO|

#### `setCalibration(name, value, needEvent)`

TODO: Sets specified calibration setting to specified value. Fires calibration change event depending on needEvent parameter.

For example `setCalibration("cranking.rpm", 900, false)`

|parameter|type|description|
|-:|--|:-|
|`name`|string|TODO|
|`value`|number|TODO|
|`needEvent`|boolean|TODO|

#### `setTimingAdd(angle)`

TODO: Use negative values to retard timing.

|parameter|type|description|
|-:|--|:-|
|`angle`|float|TODO|

#### `setTimingMult(coefficient)`

TODO

|parameter|type|description|
|-:|--|:-|
|`coefficient`|float|TODO|

#### `setFuelAdd(amount)`

TODO: Amount of fuel mass to add to injection, scaled by fuel multiplier ([`setFuelMult(coefficient)`](#setfuelmultcoefficient)); initially 0.

|parameter|type|description|
|-:|--|:-|
|`amount`|float|TODO|

#### `setFuelMult(coefficient)`

TODO: Amount to scale added fuel mass by; initially 1.0;

|parameter|type|description|
|-:|--|:-|
|`coefficient`|float|TODO|

#### `setEtbAdd(percent)`

TODO: Amount of ETB to add, as a percent of the wide-open value: e.g. `10` for +10%.  The value is a static amount to add to
the determined value, e.g. TPS of 5% w/ `10` results in 15% ETB. #torque

|parameter|type|description|
|-:|--|:-|
|`percent`|float|TODO|

#### `getGlobalConfigurationVersion()`

TODO

|*no parameters*|
|--|

#### `getFan()`

TODO

|*no parameters*|
|--|

#### `getAirmass()`

TODO

|*no parameters*|
|--|

#### `setAirmass(airmass, load)`

TODO

|parameters|type|description|
|-:|--|:-|
|`airmass`|float|TODO|
|`load`|float|TODO: percent|

#### `resetOdometer()`

TODO

|*no parameters*|
|--|

#### `stopEngine()`

TODO

|*no parameters*|
|--|

#### `vin(index)`

Lookup a character of the set vehicle identification number (VIN) at the given index.

|parameter|type|description|
|-:|--|:-|
|`index`|number|The character index of the set VIN to return.|

### CAN Bus

:::info
These functions are included in builds of FOME that incorporate [CAN](/Advanced-Features/CAN) support.
:::

All FOME boards support at least one CAN bus, which has index 1. Some recent boards support multiple CAN buses, with
index 2 and higher.

The `canRxAdd` and `canRxAddMask` functions are available in various forms with differing number and types of
parameters. They are conceptually the same, with `canRxAddMask` providing an extra argument to filter specific frames
by a bit-mask. Currently, FOME allows for up to 48 different CAN frame reception filters, and will issue an error when
attempting to add more filters than the limit (*`OBD_PCM_Processor_Fault`: Too many Lua CAN RX filters*).

When not using the forms of `canRxAdd` and `canRxAddMask` with a `callback` argument, FOME will invoke the global
`onCanRx` function defined in the Lua script.  Otherwise, the function referenced in the `callback` argument will be
invoked.

The `callback` argument and `onCanRx` function is expected to be a Lua function with the following parameters:

|parameter|type|description|
|-:|--|:-|
|`bus`|integer|The CAN bus index the frame was received on.|
|`id`|integer|The CAN ID of the received frame.|
|`dlc`|integer|The received CAN frame's data length.|
|`data`|integer table|The received CAN frame's data; an integer table from index 0 through (`dlc` - 1).|

A script using the `canRxAdd`/`canRxAddMask` functions might look as follows:

```lua
function onCanRx(bus, id, dlc, data)
    -- Do things with received CAN frame data!
end

function handleSpecialCanRx(bus, id, dlc, data)
    -- Do things with received CAN frame data!
end

-- data handled in global onCanRx function
canRxAdd(1, 0x55)

-- data handled in special callback function
canRxAddMask(2, 0x40, 0x94, handleSpecialCanRx)
```

#### `canRxAdd(bus, id, callback)`

Adds a CAN frame receiption filter, filtering by CAN bus and CAN ID, which invokes the supplied function when a CAN
frame passes the filter.

|parameter|type|description|
|-:|--|:-|
|`bus`|integer|The CAN bus index to add the reception frame filter for.|
|`id`|integer|The CAN ID to add the reception frame filter for.|
|`callback`|function|The function to invoke when a received CAN frame passes the added filter.|

#### `canRxAdd(bus, id)`

Adds a CAN frame reception filter, filtering by CAN bus and CAN ID.

|parameter|type|description|
|-:|--|:-|
|`bus`|integer|The CAN bus index to add the reception frame filter for.|
|`id`|integer|The CAN ID to add the reception frame filter for.|

#### `canRxAdd(id, callback)`

Adds a CAN frame reception filter, filtering by CAN ID, on all available CAN buses, which invokes the supplied function
when a CAN frame passes the filter.

|parameter|type|description|
|-:|--|:-|
|`id`|integer|The CAN ID to add the reception frame filter for.|
|`callback`|function|The function to invoke when a received CAN frame passes the added filter.|

#### `canRxAdd(id)`

Adds a CAN frame reception filter, filtering by CAN ID on all CAN buses.

|parameter|type|description|
|-:|--|:-|
|`id`|integer|The CAN ID to add the reception frame filter for.|

#### `canRxAddMask(bus, id, mask, callback)`

Adds a CAN frame reception filter, filtering by CAN bus and CAN ID, which invokes the supplied function when a CAN frame
passes the filter.

|parameter|type|description|
|-:|--|:-|
|`bus`|integer|The CAN bus to add the reception frame filter for.|
|`id`|integer|The CAN ID to add the reception frame filter for.|
|`callback`|function|The function to invoke when a received CAN frame passes the added filter.|

#### `canRxAddMask(bus, id, mask)`

Adds a CAN frame reception filter, filtering by CAN bus and CAN ID.

|parameter|type|description|
|-:|--|:-|
|`bus`|integer|The CAN bus index to add the reception frame filter for.|
|`id`|integer|The CAN ID to add the reception frame filter for.|

#### `canRxAddMask(id, mask, callback)`

Adds a CAN frame reception filter, filtering by CAN ID, on all available CAN buses, which invokes the supplied function
when a CAN frame passes the filter.

|parameter|type|description|
|-:|--|:-|
|`id`|integer|The CAN ID to add the reception frame filter for.|
|`callback`|function|The function to invoke when a received CAN frame passes the added filter.|

#### `canRxAddMask(id, mask)`

Adds a CAN frame reception filter, filtering by CAN ID on all CAN buses.

|parameter|type|description|
|-:|--|:-|
|`id`|integer|The CAN ID to add the reception frame filter for.|

#### `enableCanTx(isEnabled)`

:::info
`enableCanTx` is available in all builds of FOME, regardless of incorporated CAN support.
:::

Used to enable or disable CAN transmission. CAN transmission is enabled by default at startup.

|parameter|type|description|
|-:|--|:-|
|`isEnabled`|boolean|Whether or not CAN transmission is enabled.|

#### `txCan(bus, id, isExtended, data)`

Transmits a CAN frame on the specified CAN bus, with the supplied CAN ID and data.

|parameter|type|description|
|-:|--|:-|
|`bus`|integer|The CAN bus index to transmit the frame on.|
|`id`|integer|The CAN ID to transmit with the frame.|
|`isExtended`|integer|Whether to transmit a standard (11-bit ID) or extended (29-bit ID) CAN frame.|
|`data`|integer table|The data to transmit with the CAN frame.|

### SENT Protocol (SAE J2716)

:::info
These functions are included in builds of FOME that incorporate [SAE J2716 SENT](https://en.wikipedia.org/wiki/SENT_(protocol)) support.
:::

:::warning
These functions are still in development and not fully documented or supported. Use is discouraged.
:::

#### `getSentValue(index)`

Retrieves the value of the last valid message of the specified SENT channel.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The SENT channel to retrieve the value of; 0 through 3.|

#### `getSentValues(index)`

Retrieves the values of the last valid message of the specified SENT channel.

|parameter|type|description|
|-:|--|:-|
|`index`|integer|The SENT channel to retrieve the values of; 0 through 3.|

----

<!-- TODO: re-structure the below into logical categories; see the bullet points near the top of the document -->

## Lua Functions/Hooks

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

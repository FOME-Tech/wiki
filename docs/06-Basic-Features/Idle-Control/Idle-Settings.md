# Idle settings
## Idle Control mode
_Open Loop_ disables the Closed Loop Idle strategy for the IACV/ETB. _Open Loop + Closed Loop_ enables the Closed Loop Idle Strategy for the IACV/ETB. _Closed Loop Idle Ignition Timing_ can be enabled separately.

## Idle Detection Thresholds
### TPS Threshold
The TPS value must be below this % before the idle state can be entered. When using an Electronic Throttle Body (ETB) this references the Accelerator Pedal Position sensor instead.

### RPM upper limit(RPM)
The engine speed must be at or below the target RPM plus this value before the idle state can be entered. For example, if the Idle Target RPM is 750 RPM and this value is set to 200, the engine speed must be at or below 950 RPM before closed loop idle can be entered.

### RPM deadzone
When the engine speed is within this many RPM of the target idle RPM, the closed loop idle algorithm is disabled. This is to prevent unwanted oscillation around the target.

### Max vehicle speed
The VSS must be at or below this speed before the idle state can be entered. Setting this to 0 disables this check.

## Open Loop Idle

### Open loop base position
Used to set the base value for idle control. Typically set to provide an idle slightly above the target RPM when the engine is fully warmed up. Log variable is _Idle: Open loop_.

### A/C adder
This percentage is added to the _open loop base position_ when the A/C is active, used to compensate for the additional load the A/C compressor puts on the engine.

### A/C target adder
Added to the closed loop _Idle Target RPM_ when the A/C is active, can be used to ensure the compressor is spinning quickly enough for desired cooling.

### Fan #1 adder

### Fan #2 adder

### Extra idle air if throttle pressed

## Closed Loop Idle
### P-factor
Sets the Proportional gain of the closed loop idle air strategy.

### I-factor
Sets the Integral gain of the closed loop idle air strategy.

### derivativeFilterLoss
### antiwindupFreq
Used to limit the Integral term (iTerm) windup when the closed loop idle air strategy output is being limited by the min/max duty cycle limit. Once the Integral term has been calculated and limited if appropriate (_iTerm Min_, _iTerm Max_), if the output of the closed loop idle air PID controller exceeds the overall PID _Min_ or _Max_ settings, the Integral term is further limited to prevent integral windup. As long as the output of the closed loop idle air strategy exceeds the limits set by _Min_ or _Max_, the I term is continuously modified.

`iTerm += dTime(sec) * antiwindupFreq * (ClosedLoopLimitedOutput - ClosedLoopOutput)`

_note: dTime is the delta time since the closed loop idle air PID controller last ran._

Keep in mind that the Integral term is updated every time the closed loop idle air PID control strategy runs and will continue to be modified based on the error and _I-factor_ gain. Additionally, if _ClosedLoopLimitedOutput_ equals _ClosedLoopOutput_, antiwindupFreq has no effect.

### D-factor
Sets the Derivative gain of the closed loop idle air strategy.

### Min, Max
Sets the minimum and maximum duty cycle modifier that can be commanded by the closed loop idle air strategy. The P, I and D-factors are added up then limited based on the Min and Max values to give the _Idle: Closed loop_ output. This is then added to the _open loop base position_ to result in the final output, _Idle: Position_.

### iTerm Min, iTerm Max
Sets the minimum and maximum duty cycle modifier for the _I-factor_ specifically.

### PID Extra for low RPM
### Use IAC PID Multiplier Table

## Extra Idle Features
### Use idle ignition table
Setting this to _true_ activates a separate ignition timing table (2D) for idle conditions; this can help idle stability by using ignition retard and advance either side of the desired idle speed. _False_ disables the timing table.

### Use idle VE table
Setting this to _true_ activates a separate fuel table (3D) for idle, which allows fine tuning of the idle fuelling. _False_ disables the VE table.

### Override idle VE table load axis
Override the Y axis (load) value used for only the Idle VE table. Setting this to _none_ disables the override.

### Use idle tables for cranking taper
This enables the separate ignition timing and VE tables not only for idle conditions, also during the postcranking-to-idle taper transition. See _Cranking_ > _Cranking settings_ > _Idle air valve_ > _After cranking IAC taper duration_.

### Use coasting idle table
Override the IAC position during overrun conditions. This can be used to help reduce engine braking, for large engines in light weight cars or for engines that have trouble returning to idle.

# Idle target RPM
Defines the target idle RPM used by the main Closed Loop Idle air strategy as well as _Closed Loop Idle Ignition Timing_. Log variable is _Idle: Target RPM_.

# Warmup idle multiplier/CLT multiplier
The _open loop base position_ value is multiplied by the value in this table. For example, if the _open loop base position_ value was 30% and the multiplier was 1.50 at 0 degC, the commanded base position at 0 degC would be 45%. A multiplier of 1 would simply output the open loop base position value.

# Closed-loop idle timing
## Enable closed loop idle ignition timing
_True_ enables the closed loop idle ignition timing loop strategy, _False_ disables it.

### Proportional gain
Unity gain results in 1 deg CKA for every 1 RPM of error between actual engine speed and target engine speed. For example, a gain of 0.1 results in 1 deg CKA for every 10 RPM of error. If the engine speed were 100 RPM below the Idle target RPM the resulting output would be +10 deg CKA (advance).

### Derivative gain
### Min Adjustment, Max Adjustment
Limits the minimum and maximum amount of timing adjustment output by the _closed loop idle ignition timing_ strategy. Keep these values to the minimum required to avoid excessive spark advance or retard at idle speeds.

# IAC PID Multiplier

# Coasting IAC Position

# Idle VE
Only enabled when _Use idle VE table_ is set to _true_. 3D table.

# Idle Ignition Advance
Only enabled when _Use idle ignition table_ is set to _true_. 2D table (curve).

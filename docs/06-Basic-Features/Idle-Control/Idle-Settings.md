# Idle settings
## Idle Control mode
_Open Loop_ disables the Closed Loop Idle strategy for the IACV/ETB. _Open Loop + Closed Loop_ enables the Closed Loop Idle Strategy for the IACV/ETB. _Closed Loop Idle Ignition Timing_ can be enabled separately.

## Idle Detection Thresholds
The below settings are utilized to prevent the closed loop idle air strategy from engaging when it is not desired.

### TPS Threshold
The TPS value must be below this % before the idle state can be entered. When using an Electronic Throttle Body (ETB) this references the Accelerator Pedal Position sensor instead.

### RPM upper limit(RPM)
The engine speed must be at or below the target RPM plus this value before the idle state can be entered. For example, if the Idle Target RPM is 750 RPM and this value is set to 200, the engine speed must be at or below 950 RPM before closed loop idle can be entered.

### RPM deadzone
When the engine speed is within this many RPM of the target idle RPM, the closed loop idle algorithm is disabled. This is to prevent unwanted oscillation around the target.

### Max vehicle speed
The VSS must be at or below this speed before the idle state can be entered. Setting this to 0 disables this check and enables closed loop idle air control at any speed.

## Open Loop Idle

### Open loop base position
Used to set the base value for idle control. Typically set to provide an idle slightly above the target RPM when the engine is fully warmed up. Log variable is _Idle: Open loop_.

### A/C adder
This percentage is added to the _open loop base position_ when the A/C is active, used to compensate for the additional load the A/C compressor puts on the engine.

### A/C target adder
Added to the closed loop _Idle Target RPM_ when the A/C is active, can be used to ensure the compressor is spinning quickly enough for desired cooling.

### Fan #1 adder, Fan #2 adder
Added to the _open loop base position_ when the fans are activated. May compensate for the additional electrical load on the alternator.

### Extra idle air if throttle pressed

## Closed Loop Idle
The closed loop idle air strategy can utilize all three terms (Proportional, Integral, Derivative) to provide accurate control of the IACV or ETB position and achieve a stable target idle. The 3 terms are calculated, added up and then limited by the _Min_ or _Max_ values to arrive at the final _Idle: Closed Loop_ output. The error (difference between the _Idle Target RPM_ and actual RPM) is written on the variable _idleStatus_Error_.

### P-factor
Sets the Proportional gain of the closed loop idle air strategy, used to generate the P Term. Unity gain results in a P term output equal to the error, (_Idle Target RPM_ - actual RPM). Log variable is _idleStatus_pTerm_. 

For example, an instantaneous error of 100 RPM with a P-factor gain of 0.5 would result in a P term output of 50%.

### I-factor
Sets the Integral gain of the closed loop idle air strategy, used to generate the I Term. Unity gain results in an I term output equal to the error/second (_Idle Target RPM_ - actual RPM)/sec. Log variable is _idleStatus_iTerm_.

For example, a consistent error of 100 RPM with an I-factor gain of 0.01 would result in an I term output that increases by 1% every second.

### derivativeFilterLoss
### antiwindupFreq
Used to limit the Integral term (iTerm) windup when the closed loop idle air strategy output is being limited by the min/max duty cycle limit. Once the Integral term has been calculated and limited if appropriate (_iTerm Min_, _iTerm Max_), if the output of the closed loop idle air PID controller exceeds the overall PID _Min_ or _Max_ settings, the Integral term is further limited to prevent integral windup. As long as the output of the closed loop idle air strategy exceeds the limits set by _Min_ or _Max_, the I term is continuously modified.

`iTerm += dTime(sec) * antiwindupFreq * (ClosedLoopLimitedOutput - ClosedLoopOutput)`

_note: dTime is the delta time since the closed loop idle air PID controller last ran._

Keep in mind that the Integral term is updated every time the closed loop idle air PID control strategy runs and will continue to be modified based on the error and _I-factor_ gain. Additionally, if _ClosedLoopLimitedOutput_ equals _ClosedLoopOutput_, antiwindupFreq has no effect.

### D-factor
Sets the Derivative gain of the closed loop idle air strategy, used to generate the D Term. Log variable is _idleStatus_dTerm_. 

### Min, Max
Sets the minimum and maximum duty cycle modifier that can be commanded by the closed loop idle air strategy. The P, I and D terms are added up then limited based on the _Min_ and _Max_ values to give the _Idle: Closed loop_ output. This is then added to the _open loop base position_ to result in the final output, _Idle: Position_.

### iTerm Min, iTerm Max
Sets the minimum and maximum duty cycle modifier for the _I-factor_ specifically.

### PID Extra for low RPM
### Use IAC PID Multiplier Table

## Extra Idle Features
### Use idle ignition table
Setting this to __true__ activates a separate ignition timing table (2D) for idle conditions; this can help idle stability by using ignition retard and advance either side of the desired idle speed. __false__ disables the timing table.

### Use idle VE table
Setting this to __true__ activates a separate fuel table (3D) for idle, which allows fine tuning of the idle fuelling. __false__ disables the VE table.

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
_True_ enables the closed loop idle ignition timing loop strategy, __false__ disables it.

### Proportional gain
Unity gain results in 1 deg CKA for every 1 RPM of error between actual engine speed and target engine speed. For example, a gain of 0.1 results in 1 deg CKA for every 10 RPM of error. If the engine speed were 100 RPM below the Idle target RPM the resulting output would be +10 deg CKA (advance).

### Derivative gain
### Min Adjustment, Max Adjustment
Limits the minimum and maximum amount of timing adjustment output by the _closed loop idle ignition timing_ strategy. Keep these values to the minimum required to avoid excessive spark advance or retard at idle speeds.

# IAC PID Multiplier
Only enabled when _Use IAC PID Multiplier Table_ is set to __true__.

# Coasting IAC Position
Only enabled when _Use coasting Idle Table_ is set to __true__. 2D Table. When the engine is in the _coasting_ phase, the IAC base position is set to the value defined by this table. This table is not used if the engine is not in the _coasting_ phase and the _open loop base position_ will be used instead. _Note: despite the "multiplier" label, this table sets the IAC position in % duty cycle just like _open loop base position_ - this is not a multiplier applied to the base position_.

# Idle VE
Only enabled when _Use idle VE table_ is set to __true__. 3D table. Used in place of the regular VE table when idle is active, or during the cranking taper if _Use idle tables for cranking taper_ is set to __true__.

# Idle Ignition Advance
Only enabled when _Use idle ignition table_ is set to __true__. 2D table (curve). The values in this table are used in place of the regular ignition curve when idle is active, or during the cranking taper if _Use idle tables for cranking taper_ is set to __true__. Unlike _Closed-loop Idle Timing_, this table does not react to _Idle target RPM_ and is open loop only.

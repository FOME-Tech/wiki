# Advanced Idle Control Features

## Idle tables for cranking taper
Setting this value to __true__ enables the use of the Idle Ignition Table and Idle VE Table during the cranking to idle taper period. See _Cranking Settings > After cranking IAC taper duration (cycles)_. If set to __false__ these tables are only active when idle is detected; see Idle Detection Thresholds section of the _Idle settings_ menu.

## Coasting Idle tables
Setting this value to __true__ will enable the _Coasting IAC Position_ table. This will manually over-ride the Idle Air Control valve position during the coasting phase. This can be used to help reduce engine braking and may be useful if the engine has difficulty returning to idle.

The coasting phase is determined by checking if the current RPM is greater than the maximum idle RPM (_Idle Target RPM_ + _RPM Upper limit_) and the engine is no longer in the cranking taper period.

# ETB PID and Autotune
## PID Settings
### pFactor, iFactor, dFactor
These are the Proportional, Integral and Derivative gains which apply to the Electronic Throttle Body (ETB) PID loop. Tuning these settings will affect how the ETB reacts. They output on log variables _etbStatus_pTerm_, _etbStatus_iTerm_ and _etbStatus_dTerm_ respectively.
### pid min, pid max
When the ETB PID loop updates, the pFactor, iFactor, and dFactor outputs are added together. They are clamped by _pid min_ and _pid max_ and will never be less than _pid min_ or greater than _pid max_.
### iTermMin, iTermMax
Similar to _pid min_ and _pid max_, these values apply specifically to the _iFactor_ output. The result of _iFactor_ will never be less than _iTermMin_ or greater than _iTermMax_.

## PID AutoTune
TODO: Flesh out this section

## Log Variables
### etbStatus_output
This value is the sum of all of the etbStatus_pTerm, etbStatus_iTerm and etbStatus_dTerm values. This value is clamped to upper and lower limits by _pid min_ and _pid max_. It is added to the _ETB Bias Curve_ value to give the final _ETB: Duty_ output.
### ETB: Duty
The sum of _etbStatus_Output_ added to the _ETB Bias Curve_ value.

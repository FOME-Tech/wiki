# ETB PID and Autotune

## Useful Log Variables
### etbStatus_output
This value is the sum of all of the etbStatus_pTerm, etbStatus_iTerm and etbStatus_dTerm values. This value is clamped to upper and lower limits by _pid min_ and _pid max_. It is added to the _ETB Bias Curve_ value to give the final _ETB: Duty_ output.
### ETB: Duty
The sum of _etbStatus_Output_ added to the _ETB Bias Curve_ value.

# Air Conditioning Settings

FOME supports controlling an air conditioning (AC) accessory powered from the engine. The settings menu for the AC is found under _Base Engine > Air Conditioning_ as shown below.

![image](Air-Conditioning-Settings/aircon.png)

## ECU Input/Outputs

The first input box selects the input switch for the AC and the second tells the ECU whether it is a pull up or pull down switch. A pull up switch will provide the ECU with a positive voltage (normally +12V) when enabled and a pull down will provide a ground signal. If unsure which your car is, set one and look at the "acButtonstate" indicator in the AC settings box to see if the state matches the orientation of the AC switch. If backwards, change the pull up/down around.

The next selection boxes define which ECU output pin is connected to the AC relay and the mode of the relay output. Default mode will turn the relay on by outputting a high 12V signal to the relay. Default inverted will go to ground when enabled. The open collector settings do the same but should only be required if the AC relay operates at a different voltage to the ECU. Open collector may also require additional circuitry such as an external pull up resistor or protection diode.

The AC compressor delay controls the timeout before engaging the AC compressor. Use this to prevent bogging at idle when AC engages by providing time for the car to increase the idle before enabling the AC. Set to 0 to engage immediately with no delay. 

## Maximum Condition Disable Settings

The maximum RPM disables AC above the set value. Set it to 0 to disable. This setting is useful for automatically disabling the AC at high RPM to provide full engine power and to prevent compressor damage from sustained high RPM operations.

The maximum coolant (CLT) temperature setting disables the AC once the CLT reaches this value. It is used to prevent engine overheating as using AC increases the amount of heat generated. Set to 0 to disable. 110 °C is a safe value to have this set to.

The maximum throttle position (TPS) operates like the maximum RPM and disables AC when the car is floored. 80-90% is a reasonable value and 0 disables it.

## Idle Controls

The AC idle controls are important as the extra engine load at idle requires more air and engine torque. It is recommended to set the AC RPM adder to 100-300 RPM from the base idle target. A good place to start is to google the idle RPM and AC idle RPM for your specific car. For the idle adder %, 10-20% is normal. An easy way to set this is to turn the AC on at idle with the adder set to 0% and let the closed loop idle controls bring the idle air up to a stable value. Observe this using an idle position gauge on the TS dashboard and record the increase in position from base idle and set that as the value.

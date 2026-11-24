# Fan Control

FOME can control two serrate fan circuits with the settings found under __Base Engine>Outputs__. The fans can be configured for a range of conditions to keep the car cool. You can never cool your car too much in most climates.

## Fan Outputs

The output should be configured to the corresponding fan output pin. The next selection boxe defines which ECU output pin is connected to the fan relay and the mode of the relay output. Default mode will turn the relay on by outputting a high 12V signal to the relay. Default inverted will go to ground when enabled. The open collector settings do the same but should only be required if the relay operates at a different voltage to the ECU. Open collector may also require additional circuitry such as an external pull up resistor or protection diode.

## On and Off Temperatures

The on and off temperatures should be configured to turn on the first "main" fan as the coolant temperature rises towards the upper end of operating temperature and the second fan to turn on as the temperature reaches the top of safe operating temperature. It is a good idea to have about 2 °C between each fan's on and off temperatures to prevent them from constantly flicking on and off.

The ideal operating temperature for each car varies but a reasonable starting spot is to turn the main fan on at 95 °C (off at 93 °C) and the secondary fan at 100 °C (off at 98 °C).

## Air Conditioning (AC) Enable

Using AC adds more load to the engine and creates more heat in the condenser which needs to be dissipated. It is recommended to enable both fans with AC.

## Disable When Engine Stopped

The fans can be configured to turn off when the engine is not running. This can usually be left as false.

## Idle Adder

Fans can draw a considerable amount of current which adds extra load onto the alternator. Like the AC idle adder, extra air at idle can be added to increase the engine torque to accommodate this load. To test how much idle air is required, observe the idle position on a TS gauge and turn on each fan individually. The closed loop idle should increase the idle position if the load increases. For each fan, note the increase in position and set that as the idle adder %.

If __Enable with AC__ is turned on, be careful not have the AC adder % in the idle settings turned too high or the fan adders will be added to the AC adders when the AC is on. An easy option to prevent this is just to use the AC adder not the individual fan adders.

## Fan Testing

The __Test Fan #__ buttons can be used to test fan operation. These buttons will enable the fans for a few seconds before shutting them off.
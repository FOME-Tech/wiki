# Legacy Hellen ECU Information

This page is for the legacy series of Miata Hellen ECU Boards

## Using an External Wideband Controller

In the case you wish to use an external wideband controller such as an _AEM X-Series Wideband UEGO AFR Sensor Controller Gauge_, the wideband sensor should be plugged into the wideband controller instead of directly into the ECU. The best way to wire in the controller is directly to the old narrow band oxygen sensor plug on the car based off the diagram below. In this diagram, pin 1 goes to the controller analogue output and pin 2 to the signal ground. The controller will also need 12V power and ground from another voltage source on the ECU. Make sure to double check the voltages on the pins before connecting the controller to them. The external controller also requires additional setup in Tuner Studio which will be covered later.

![image](Miata-MX5-Quick-Start-Images/o2v2.jpg)

### Additional Tuner Studio Steps for an External Wideband Controller

To set up the external wideband controller there are several additional steps in Tuner Studio. First, your display units should be set to AFR for this as already stated. If you forgot to do this earlier, press _CTRL + P_ to open the vehicle properties. Now, open the _Aux Sensors_ dialog under _Sensors_ and the _Full Pinout 3/3_ dialog under _Controllers_. As per the diagram below, set the _AFR ADC Input_ and _ADC Input_ to the pin corresponding with _O2S_ (pin 2C for the example). for the values in the _Aux Linear Sensor #1_ box you need to reference the manual of your wideband controller for what voltages correspond to its AFR outputs. In the example below, 0V corresponds to an AFR of 10.0 and 4.99V corresponds to an AFR of 19.98. Once these are set, click _Burn_.

![image](Miata-MX5-Quick-Start-Images/extwideband.png)
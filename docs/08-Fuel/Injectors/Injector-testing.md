# Injector Testing

Injector testing can be used to check injector operation, fuel pump operation, and to potentially conduct flow testing.

The injector test dialog found under the _Fuel_ or _Controller_ menus. Ensure the fuel pump is off if you just want to hear them click to verify correct cylinder position or wiring (or fuel may go everywhere or flood the cylinder).

## Injector Flow and Dead Time Practical Testing

In the case that you own an injector test stand or can make your own, the ECU can control the injectors to conduct various tests. 

To conduct a flow matching test, the injectors can be set to pulse for a large number of iterations to check the flow. If we want the injector to pulse at 25Hz (25 times a second), this equates to a 40ms maximum pulse length (1000ms/25). To test at a 10% duty cycle, set the on time to 4ms, off time to 36ms (40ms - 4 ms), and iterations to 25 multiplied by the number of seconds you want to test for (e.g. for 5s: 5*25 = 125 iterations). This testing can be done at different duty cycles to test for flow equality between injectors (provided you're spraying into volumetric flasks).

To test the injector dead times and flow rate using the ECU, you'll use the same setup. Set the injectors to run for 30s at 100% duty which is 750 iterations (30*25), 40ms on and 0ms off (assuming 25Hz still but this is an arbitrary frequency). This is bad to do for long periods of time but a 30s burst should be fine. Measure the volume of liquid sprayed for a single injector. At 100% duty cycle over 30s, the injector is open for a total of 30 seconds. Now we'll do another flow test at 5% duty cycle with the aim to have the injector theoretically open for 30s over the entire test time. The idea is that at a low pulse width, the dead time will make up a large portion of the 5% duty cycle. 5% is 2ms on and 38ms off which means 15,000 (30000ms/2ms) iterations are needed to achieve 30s of injector flow time. Run this test and measure the new volume, it should be less than the 100% test which is good. Now for some more math:

- Take the volume from the 100% test and divide it by the 30s on time. This will give the **injector flow rate**.
- Subtract the 5% duty cycle volume from the 100% volume to get the **volume difference**.
- Divide the **volume difference** by the **injector flow rate**. Take that result and divide it by 15,000 (the total number of iterations) to get the dead time in ms.
- Repeat this test at different battery voltages to get more data points.
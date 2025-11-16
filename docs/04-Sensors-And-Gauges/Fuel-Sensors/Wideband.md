# Wideband Oxygen Sensor

## What is a Wideband

A wideband O2 sensor (or WBO/WBO2) is a device that measures the exact air–fuel ratio in an engine’s exhaust. It gives a precise reading over a wide range, allowing the ECU to adjust fuel delivery accurately for better performance and lower emissions. Wideband sensors are able to measure the precise lambda within the approximate range of 0.68-1.36 (~10-20 AFR). Comparatively, older narrow-band sensors can only measure the lambda within the approximate range of 0.96-1.04 (~14.2-15 AFR). In EFI tuning, a wideband controller is an essential piece of hardware for properly tuning the VE fuelling tables as well as for the closed loop fuelling corrections during driving.

## How Does a Wideband Work

Widebands consist of several elements; the heater element, the Nesrnst cell, and the pump. The wideband controller on the ECU reads and controls these elements to take an accurate reading of the lambda.

The heater element has its duty cycle controlled to maintain the temperature of the WBO to within ~750-850^o^C. The heater enables the sensor to start working before the exhaust gas has fully heated up and allows for stable readings.

The Nernst cell is essentially a zirconia ceramic electrolyte sandwiched between two porous platinum electrodes. At high temperatures, the zirconia will conduct oxygen ions and conduct a voltage. This voltage is called the Nernst voltage which is measured by the wideband controller and actively controlled using the pump.

The oxygen cell pump works to move oxygen ions into or out of the sensor's sensing cavity by varing the pump duty cycle, and consequently current. By increasing or decreasing the amount of oxygen from the exhaust allowed inside the sensor, the controller can force the Nernst voltage to remain at a fixed value; typically 0.45V.

If the exhaust is rich (more fuel, less oxygen), the sensing cavity will have less oxygen inside it and the Nernst voltage will rise. Consequently, the ECU will command the pump current to increase which adds extra oxygen into the cavity to stabilise the Nernst voltage at 0.45V.

When the exhaust is lean (less fuel, more oxygen), the opposite occurs and the Nernst voltage drops requiring the pump current to drop in order to stabilise the Nernst voltage.

The pump current required to hold the Nernst voltage at 0.45V is directly proportional to the AFR/lambda of the exahust gas. Hence, this current is used to determine what the AFR is.

## Internal vs External WBO Controller

Most FOME ECUs have in internal wideband controller meaning they only need a wideband sensor plugged in (such as the Bosch LSU 4.9 sensor). There is also the option still of connecting an external wideband sensor to the ECU using an analog output, like the AEM 30-4110 and similar products or over CAN like the AEM X-Series wideband controller/gauge.

## Internal WBO Coding Documentation

The repository for the internal WBO firmware and hardware can be found [at the following link](https://github.com/mck1117/wideband).

## Troubleshooting using Wideband

### High Nernst Voltage

In the case that the Nernst voltage rises significantly above 0.45V, this indicates that the car is running very rich and ECU is unable to control the pump to stabilise the voltage. The lambda in this condition may also be in the 0.5-0.6 range or at 0 indicating an extreme rich condition and inability for the ECU to control the Nernst voltage.

### Low Nernst Voltage

When the Nernst voltage drops lower than 0.45V, this indicates an extreme lean condition where the pump cannot remove enough oxygen to stabilise it. This will commonly occur if deceleration fuel cut off (DFCO) is enabled in which case the lambda will go to the maximum of 2 to indicate an extreme lean condition. If the nernst voltage is reading low during normal engine operations, the car lis likely running extremely lean and needs more fuel to be added

### Low or Zero Lambda During DFCO

In the case that DFCO is triggered (turning off the injectors) and the WBO is reading 0 or less than 1, this could indicate an issue in the injectors causing fuel to leak into the exhaust. It is reccomended to check injectors for fuel leaks in this case. 

Alternatively, oil getting into the exhaust can also register rich on the WBO which may indicate issues in the engine or turbo.

### WBO Shuts Down from Excessively Hot Exhaust Gasses

The WBO heater can only raise the temperature of the sensor, in the case that the exhaust gas temperature is too hot, the WBO controller may shut down the wideband to prevent damage. Typically, the WBO controller is programmed to shut down if the WBO temperature sensor reads more than 100^o^C above target. In this event, the _WBO x:Fault Code_ parameter in the ECU logs should register a fault code of 4.

If this occurs, the vehicle may be running either too lean or too rich. Slightly lean or rich can increase EGTs however very lean or rich can decrease EGTs. EGT management is a fine balance best discussed seperately as
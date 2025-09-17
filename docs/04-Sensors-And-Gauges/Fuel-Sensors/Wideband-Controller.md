# Wideband Oxygen Sensor (WBO2) 

A wideband O2 sensor is a type of oxygen sensor used in modern engines to measure the air-fuel ratio more precisely than a traditional narrowband sensor. Instead of just detecting whether the mixture is rich or lean, it provides a continuous, accurate reading of the actual ratio across a wide range. This helps the engine control unit (ECU) adjust fueling more effectively for better performance, fuel economy, and lower emissions.

In EFI tuning, a wideband controller is an essential piece of hardware for properly tuning the VE fuelling tables as well as for the closed loop fuelling corrections during driving.

## Internal vs External WBO2

Most FOME ECUs have in internal wideband controller meaning they only need a wideband sensor plugged in (such as the Bosch LSU 4.9 sensor). There is also the option still of connecting an external wideband sensor to the ECU using an analog output, like the AEM 30-4110 and similar products or over CAN like the AEM X-Series wideband controller/gauge.

## Internal WBO2 Coding Documentation

The repository for the internal WBO firmware and hardware can be found [here](https://github.com/mck1117/wideband).

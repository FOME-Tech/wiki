# Oil Pressure Protection  

The oil pressure protection will cut fuel to the vehicle in the condition that a minimum oil pressure after start isn't reached or oil pressure drops below a threshold during operation. This is a useful safety feature to prevent engine damage in the event of oil pressure loss.

## Minimum Pressure After Start

This is the expected oil pressure after starting the engine. If oil pressure does not reach this level within 5 seconds of engine start, fuel will be cut. Set to 0 to disable and always allow starting. 

## Low Oil Pressure Protection

Enabling the low oil pressure protection will use the pressure vs RPM table to determine if the pressure is low, triggering a fuel cut. To set this up, observe a data log of your typical engine oil pressure range and set the table a reasonable amount below the normal operation range to prevent accidental triggering. To further prevent accidental triggers, the oil pressure protection timeout should also be set (0.5-1+ seconds is a reasonable value). This prevents triggers from sensor noise or temporary oil pressure dips e.g. oil slosh from high speed braking.
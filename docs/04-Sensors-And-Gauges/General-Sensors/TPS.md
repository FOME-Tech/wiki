# Throttle Position Sensor

Throttle Position Sensors are used to tell the FOME ECU the angle of the throttle blade. Most sensors are 3 wire:

1. Power (provided from FOME ECU Power Output)
2. Ground (provided from FOME ECU Ground Output)
3. Signal (sent to FOME ECU Lowside input)

Wiring power and ground from the FOME ECU will ensure a clean and consistent signal.

## ETB Throttle Position

Electronic Throttle Bodies typically have a **primary** and **secondary** throttle position sensor. This is to ensure safe operation of the vehicle. When connecting an ETB to a FOME ECU it is always required to have **two redundant signals** (e.g. primary 0-5v and secondary 5-0v).

For more info on ETB signal redundancy: [ETB redundancy](../../../Advanced-Features/ETB/Redundant-Sensors/)

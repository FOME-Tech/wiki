# Universal 112 Pinout

This is the FOME Universal 112 v1.2 Pinout.
It uses the Molex CMC 112-Pin Connector.
Based off 2026-03-03 Schematic

<!-- IMPORT IMAGES:  -->
import pinoutNoLabels from './Universal-112-Images/PinoutNoLabels.png';
import pinout1NL from './Universal-112-Images/Pinout1NL.png';
import pinout2NL from './Universal-112-Images/Pinout2NL.png';
import pinout3NL from './Universal-112-Images/Pinout3NL.png';

:::tip How to use this Pinout?
For ease of use and pinning, the following pinout layout and illustrations resembles the connectors when seen from the rear (wiring harness side). The order of the connector is descendent from left to right (3,2,1), as you will see on the image below. Additionaly, the Pin Naming convention is broken down into the following:

> (Connector Number)(Column)(Row)

_**2B4** - Means the pin is located in the Connector 2, Column B, Row 4._ 

:::

<img src={pinoutNoLabels} alt="PinoutNoLabels" style={{display:'block', margin:'6% auto'}} />

---

## Connector 1 

<img src={pinout1NL} alt="Pinout1NL" style={{display:'block', margin:'2% auto'}} />
<!--!  ![Connector1](./Universal-112-Images/Pinout1NL.png) -->

| Pin | Destination | Function                              | Notes / Suggestions                                                             |
|-----|-------------|---------------------------------------|---------------------------------------------------------------------------------|
| 1A1 | GND         | GND                                   |                                                                                 |
| 1A2 | GND         | GND                                   |                                                                                 |
| 1A3 | VR+D        | VR2 +                                 | Wired to the Discrete VR Conditioner, If enabled will need LS12 for VR Treshold |
| 1A4 | VR-D        | VR2 -                                 | Wired to the Discrete VR Conditioner, If enabled will need LS12 for VR Treshold |
| 1B1 | GND         | GND                                   |                                                                                 |
| 1B2 | GND         | GND                                   |                                                                                 |
| 1B3 | 5V_SENSOR_2 | 5V Power Supply 2                     |                                                                                 |
| 1B4 | 5V_SENSOR_2 | 5V Power Supply 2                     |                                                                                 |
| 1C1 | GND         | GND                                   |                                                                                 |
| 1C2 | GND         | GND                                   |                                                                                 |
| 1C3 | CAN2-       | CAN bus 2 CAN-Low                     |                                                                                 |
| 1C4 | 5V_SENSOR_2 | 5V Power Supply 2                     |                                                                                 |
| 1D1 | KNOCK_1     | Knock 1                               |                                                                                 |
| 1D2 | KNOCK_2     | Knock 2                               |                                                                                 |
| 1D3 | CAN2+       | CAN bus 2 CAN-High                    |                                                                                 |
| 1D4 | 5V_SENSOR_1 | 5V for sensors                        |                                                                                 |
| 1E1 | DIGITAL_1   | Digital Input 1                       |                                                                                 |
| 1E2 | DIGITAL_2   | Digital Input 2                       |                                                                                 |
| 1E3 | 5V_SENSOR_1 | 5V Power Supply 1                     |                                                                                 |
| 1E4 | 5V_SENSOR_1 | 5V Power Supply 1                     |                                                                                 |
| 1F1 | DIGI3       | Digital Input 3                       |                                                                                 |
| 1F2 | DIGI4       | Digital Input 4                       |                                                                                 |
| 1F3 | DIGI5       | Digital Input 5                       |                                                                                 |
| 1F4 | DIGI6       | Digital Input 6                       |                                                                                 |
| 1G1 | HS3         | High Side 3                           |                                                                                 |
| 1G2 | HS4         | High Side 4                           |                                                                                 |
| 1G3 | HS2         | High Side 2                           |                                                                                 |
| 1G4 | HS1         | High Side 1                           |                                                                                 |
| 1H1 | EXTRALSD    | (Extra Low Side D - from Ignition 12) | If enabled, will use Ignition 12 Driver, you won't be able to use both.         |
| 1H2 | EXTRALSC    | (Extra Low Side C - from Ignition 11) | If enabled, will use Ignition 11 Driver, you won't be able to use both.         |
| 1H3 | EXTRALSB    | (Extra Low Side B - from Ignition 10) | If enabled, will use Ignition 10 Driver, you won't be able to use both.         |
| 1H4 | EXTRALSA    | (Extra Low Side A - from Ignition 9 ) | If enabled, will use Ignition 9 Driver, you won't be able to use both.          |

## Connector 2 

<img src={pinout2NL} alt="Pinout2NL" style={{display:'block', margin:'2% auto'}} />

| Pin | Destination | Function                                | Notes / Suggestions                         |
|-----|-------------|-----------------------------------------|---------------------------------------------|
| 2A1 | IGBT8       | Dumb Coil 8                             |                                             |
| 2A2 | IGBT7       | Dumb Coil 7                             |                                             |
| 2A3 | IGBT6       | Dumb Coil 6                             |                                             |
| 2A4 | IGBT5       | Dumb Coil 5                             |                                             |
| 2B1 | LS2         | LowSide 2                               |                                             |
| 2B2 | IGN7        | Ignition Channel 7                      |                                             |
| 2B3 | IGN6        | Ignition Channel 76                     |                                             |
| 2B4 | STEPA2      | Stepper Motor A2 - From LS9             |                                             |
| 2C1 | LS1         | Lowside 1                               |                                             |
| 2C2 | IGN8        | Ignition Channel 8                      |                                             |
| 2C3 | IGN5        | Ignition Channel 5                      |                                             |
| 2C4 | STEPA1      | Stepper Motor A1 - From LS9             |                                             |
| 2D1 | 12V_KEY     | 12V from Ignition Switch                |                                             |
| 2D2 | CAN-        | CAN L                                   |                                             |
| 2D3 | CAN+        | CAN H                                   |                                             |
| 2D4 | STEPB1      | Stepper Motor B1 - From LS10            |                                             |
| 2E1 | AT3         | Analog Temp 3                           |                                             |
| 2E2 | AT4         | Analog Temp 4                           |                                             |
| 2E3 | GND         | Sensor GND                              |                                             |
| 2E4 | STEPB2      | Stepper Motor B2 - From LS10            |                                             |
| 2F1 | AT1         | Analog Temp 1                           |                                             |
| 2F2 | AT2         | Analog Temp 2                           |                                             |
| 2F3 | CRANK-      | VR1-                                    | Connected to MAX992x VR Conditioner onboard |
| 2F4 | GND         | Sensor GND                              |                                             |
| 2G1 | AV10        | Analog Input 10                         |                                             |
| 2G2 | AV11        | Analog Input 11                         |                                             |
| 2G3 | CRANK+      | VR1+                                    | Connected to MAX992x VR Conditioner onboard |
| 2G4 | LSU_IP2     | Wideband 2  - IP Pump Current           | LSU 4.9Pin 1                                |
| 2H1 | AV7         | Analog Input 7                          |                                             |
| 2H2 | AV8         | Analog Input 8                          |                                             |
| 2H3 | AV9         | Analog Input 9                          |                                             |
| 2H4 | LSU_VM2     | Wideband 2 - Virtual Ground VM IP-/VS   | LSU 4.9 Pin 2                               |
| 2J1 | AV4         | Analog Input 4                          |                                             |
| 2J2 | AV5         | Analog Input 5                          |                                             |
| 2J3 | AV6         | Analog Input 6                          |                                             |
| 2J4 | LSU_RTRIM2  | Wideband 2 - RTRIM                      | Cal Resistor, LSU 4.9 Pin 5                 |
| 2K1 | AV1         | Analog Input 1                          |                                             |
| 2K2 | AV2         | Analog Input 2                          |                                             |
| 2K3 | AV3         | Analog Input 3                          |                                             |
| 2K4 | LSU_UN2     | Wideband 2 - UN Nerst Cell Voltage VS   | LSU 4.9 Pin 6                               |
| 2L1 | 12V_MR_FUSE | 12V Fused Main Relay Output for Sensors |                                             |
| 2L2 | 12V_MR_FUSE | 12V Fused Main Relay Output for Sensors |                                             |
| 2L3 | GND         | GND PIn Gauge 14                        | Main Ground to Battery or Chassis           |
| 2L4 | HEATERNEG2  | Wideband 2 - Heater Neg                 | LSU 4.9 Pin 3                               |
| 2M1 | ETB1+       | ETB1 Motor Pos                          |                                             |
| 2M2 | ETB1-       | ETB1 Motor Neg                          |                                             |
| 2M3 | ETB2+       | ETB2 Motor Pos                          |                                             |
| 2M4 | ETB2-       | ETB2 Motor Neg                          |                                             |

## Connector 3

<img src={pinout3NL} alt="Pinout3NL" style={{display:'block', margin:'2% auto'}} />

:::warning
This connector layout is different from the first two. (It is phisically flipped 180 degrees) Verify twice before pinning and connecting.
:::

| Pin | Destination | Function                                     | Notes / Suggestions                   |
|-----|-------------|----------------------------------------------|---------------------------------------|
| 3A4 | IGBT1       | Dumb Coil 1                                  |                                       |
| 3A3 | IGBT2       | Dumb Coil 2                                  |                                       |
| 3A2 | IGBT3       | Dumb Coil 3                                  |                                       |
| 3A1 | IGBT4       | Dumb Coil 4                                  |                                       |
| 3B4 | LS3         | LowSide 3                                    |                                       |
| 3B3 | IGN2        | Ignition 2                                   |                                       |
| 3B2 | IGN3        | Ignition 3                                   |                                       |
| 3B1 | LSU_UN1     | Wideband 1 - UN Nerst Cell Voltage VS        | LSU 4.9 Pin 6                         |
| 3C4 | LS8         | LowSide 8                                    |                                       |
| 3C3 | IGN1        | Ignition 1                                   |                                       |
| 3C2 | IGN4        | Ignition 4                                   |                                       |
| 3C1 | LSU_RTRIM1  | Wideband 1 - Resistor Trim                   | Cal Resistor, LSU 4.9 Pin 5           |
| 3D4 | LS6         | LowSide 6                                    |                                       |
| 3D3 | LS7         | LowSide 7                                    |                                       |
| 3D2 | LS4         | LowSide 4                                    |                                       |
| 3D1 | LSU_VM1     | Wideband 1 - Virtual Ground VM IP-/VS        | LSU 4.9 Pin 2                         |
| 3E4 | LS15        | LowSide 15                                   |                                       |
| 3E3 | LS16        | LowSide 16                                   |                                       |
| 3E2 | LS5         | LowSide 5                                    |                                       |
| 3E1 | LSU_IP      | Wideband 1 - IP Pump Current                 | LSU 4.9 Pin 1                         |
| 3F4 | LS13        | Lowside 13                                   |                                       |
| 3F3 | LS14        | Lowside 14                                   |                                       |
| 3F2 | GND         | GND                                          |                                       |
| 3F1 | PERM_LIVE   | Permanent 12V Direct from battery (RTC)      | 12V Permanent for the Real Time Clock |
| 3G4 | 12V_MR      | 12V Input from Main Relay  (ECU Controlled?) |                                       |
| 3G3 | 12V_MR      | 12V Input from Main Relay  (ECU Controlled?) |                                       |
| 3G2 | GND         | Main Ground                                  | Main Ground to Battery or Chassis     |
| 3G1 | HEATERNEG1  | Wideband 1 - Heater NEG                      | LSU 4.9 Pin 3                         |
| 3H4 | LS9ADD      | Lowside 9                                    | High Power w/ Flywheel Diode          |
| 3H3 | LS10ADD     | Lowside 10                                   | High Power w/ Flywheel Diode          |
| 3H2 | LS11ADD     | Lowside 11 High Power w/ Flywheel Diode      | High Power w/ Flywheel Diode          |
| 3H1 | LS12ADD     | Lowside 12 High Power w/ Flywheel Diode      | High Power w/ Flywheel Diode          |
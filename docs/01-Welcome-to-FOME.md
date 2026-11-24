---
slug: /
# (Docusaurus 2.4.1 requires a root doc/page to have a "slug: /" directive, otherwise 404 is assumed as a welcome message)
# (also numbered prefixes are NOT to be used in links, because Docusaurus 2.4.1 matches them automatically )
---

# Welcome to FOME

FOME is a new project intending to deliver a user focused high feature ECU with open source hardware options and open firmware that give control back to the user, owner and driver.

As there are many complicated topics to cover we recommend that you start with the topics in the "intro" section to the left.
The first page to view should probably be [the FOME Overview page](Intro-Start-Here/Overview).

## Index

### Intro - Start here

- [FOME Overview](Intro-Start-Here/Overview)
- [Hardware Running FOME](Intro-Start-Here/Hardware-Running-FOME)
- [How to setup a board for first use](Intro-Start-Here/HT-Set-Up)
- [Updating the firmware](Intro-Start-Here/HT-Updating-The-Firmware)
- [Performing a safe first start](Intro-Start-Here/HT-First-Start-Safely)
- [How to test inputs and outputs](Intro-Start-Here/HT-Test-IO)
- [Tips and Tricks](Intro-Start-Here/Tips-and-Tricks)
- [How to pick the right fueling method](Intro-Start-Here/Which-Fuel-Method-For-Me)
- [Guide to ETB and VVT PIDs](Intro-Start-Here/HT-PID-ETB-And-VVT)

---

### Fundamentals of FOME tuning

- [Air Fuel Ratio](Fundamentals-Of-Tuning/AFR)
- [Acceleration Compensation](Fundamentals-Of-Tuning/Acceleration-Compensation)
- [What is Charge temperature estimation](Fundamentals-Of-Tuning/Charge-Temperature-Estimation)
- [What is knock and why it matters](Fundamentals-Of-Tuning/Knock)
- [Multi-dimensional mapping, what is it and how to benefit from it](Fundamentals-Of-Tuning/Multi-Dimensional-Mapping)
- [Spark timing, MBT and combustion](Fundamentals-Of-Tuning/Spark)

---

### Sensors and Gauges

#### Driver controls and feedback

- [Accelerator pedal](Sensors-And-Gauges/Driver-Controls-And-Feedback/APP)
- [Battery Settings](Sensors-And-Gauges/Driver-Controls-And-Feedback/Battery-Settings)
- [Brake pedal position and pressure sensor](Sensors-And-Gauges/Driver-Controls-And-Feedback/Brake)
- [CAN gauge](Vehicle-Specific/CAN-Gauge)
- [Clutch Pedal position and pressure sensing](Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch)
- [Rev Counter](Outputs/Tacho)

#### Fuel Sensors

- [Flex-fuel sensor](Sensors-And-Gauges/Fuel-Sensors/Flex-Fuel-Sensor)
- [Fuel level](Sensors-And-Gauges/Fuel-Sensors/Fuel-Level)
- [Fuel pressure](Sensors-And-Gauges/Fuel-Sensors/Fuel-Pressure)
- [WBO2 Wideband Lambda](Sensors-And-Gauges/Fuel-Sensors/Wideband)

#### General Sensors

- [Analogue input settings](Sensors-And-Gauges/General-Sensors/Analogue-Input-Settings)
- [Aux sensors](Sensors-And-Gauges/General-Sensors/Aux-Sensors)
- [Cam sync](Base-Engine/Trigger/Cam-Sync)
- [Trigger setup](Base-Engine/Trigger/Trigger-Setup)
- [Mass Air Flow Sensor](Sensors-And-Gauges/General-Sensors/MAF)
- [TPS](Sensors-And-Gauges/General-Sensors/TPS)
- [Turbo Speed Sensor](Sensors-And-Gauges/General-Sensors/Turbo-Speed)
- [VSS](Sensors-And-Gauges/General-Sensors/VSS)

#### Pressure sensors

- [Barometric](Sensors-And-Gauges/Pressure-Sensors/Barometric)
- [Manifold absolute pressure](Sensors-And-Gauges/Pressure-Sensors/MAP)
- [Oil Pressure](Sensors-And-Gauges/Pressure-Sensors/Oil-pressure)

#### Temperature Sensors

- [Aux temperature sensors](Sensors-And-Gauges/Temperature-Sensors/Aux-Temp)
- [Coolant temperature](Sensors-And-Gauges/Temperature-Sensors/CLT)
- [Intake Air temperature](Sensors-And-Gauges/Temperature-Sensors/IAT)

---

### Limits and protections

- [Boost Pressure Limit](Limits-And-Protections/Boost-Cut)
- [Coolant based RPM limit](Limits-And-Protections/CLT-RPM-Limit)
- [Fuel Pressure Compensation](Limits-And-Protections/Fuel-Pressure-Compensation)
- [Minimum Oil Pressure Protection](Limits-And-Protections/Min-Oil-Pressure)
- [Rev limiters](Limits-And-Protections/RPM-Limit)

---

### Basic Features

- [Bench test commands](Tools/Bench-Test)
- [Boost control](Air-Path/Boost-Control)
- [Cylinder Bank Selection](Fuel/Injectors/Cylinder-Bank-Selection)
- [Data Logging Settings](Tools/Data-Logging)
- [Fan Control](Outputs/Fan-Control)
- [Fuel pump relay control](Outputs/Fuel-Pump-Relay)
- [GPPWM General purpose PWM](Outputs/GPPWM)
- [Main Relay control](Outputs/Main-Relay)

#### Cranking Control

- [Advanced cranking features](Cranking-Control/Adv-Cranking)
- [Cranking idle air control](Cranking-Control/Cranking-IAC)
- [Cranking RPM limit](Cranking-Control/Cranking-RPM-Limit)

#### Cranking fuel

- [Cranking Duration](Cranking-Control/Cranking-Fuel/Cranking-Duration)
- [Cranking Fuel coolant multiplier](Cranking-Control/Cranking-Fuel/Cranking-Fuel-CLT)
- [Priming Pulse](Cranking-Control/Cranking-Fuel/Priming-Pulse)

#### Idle control

- [Advanced Idle control](Idle-Control/Advanced-Idle)
- [Closed loop idle control](Idle-Control/Advanced-Idle)
- [Idle hardware](Idle-Control/Idle-Hardware)
- [Idle ignition table](Idle-Control/Idle-Ignition-Table)
- [Idle settings](Idle-Control/Idle-Settings)
- [Idle VE Table](Idle-Control/Idle-VE-Table)
- [Idle tuning](Idle-Control/Idle-Tuning)

---

### Advanced Features

- [CAN settings](CAN)
- [Cylinder Angle Offset](Base-Engine/Cylinder-Angle-Offset)
- [Knock control](Ignition/Knock-Control)
- [Launch Control](Air-Path/Launch-Control)
- [Lua Scripting](Lua/Lua-Scripting)
- [MAP sampling angle](Sensors-And-Gauges/Pressure-Sensors/MAP-Sampling-Angle)
- [Override Table Axis](Fuel/Fuel-Settings/Override-Table-Axis)
- [Smart Alternator](Air-Path/Smart-Alternator)

#### ETB

- [Electronic throttle body setup](Air-Path/ETB/ETB-Setup)
- [ETB throttle position sensors](Air-Path/ETB/ETB-TPS)
- [Redundant sensors](Air-Path/ETB/Redundant-Sensors)
- [ETB bias curve](Air-Path/ETB/ETB-Bias-Table)
- [ETB PID and auto tune](Air-Path/ETB/ETB-PID)
- [ETB pedal target](Air-Path/ETB/ETB-Pedal-Target)
- [ETB idle control](Air-Path/ETB/ETB-Idle)
- [ETB #2 trim](Air-Path/ETB/ETB-2-Trim)

#### Fuel related

- [Barometric pressure compensation](Fuel/Fuel-Settings/Barometric-Pressure-Compensation)
- [Charge Temperature estimation](Fuel/Fuel-Settings/Charge-Temp-Estimation)
- [Closed loop fueling](Fuel/Fuel-Settings/Closed-Loop-Fuel)
- [Injection Phase settings](/Fuel/Injectors/Injector-configuration#injection-phase)
- [Injector tester](/Fuel/Injectors/Injector-configuration#injector-test)

#### GDI

- [High pressure fuel pump settings](Fuel/GDI/High-Pressure-Pump)

#### Rotary

- [Rotary engine specific settings](Base-Engine/Rotary/Rotary-Settings)

#### Spark related

- [Multispark](Ignition/Ignition-Settings/Multispark)

#### Variable cam timing

- [Variable cam timing (VVT)](Air-Path/VVT)

---

### Fuel

#### Acceleration

- [TPS based](Fuel/Acceleration/TPS-Based)
- [Wall Wetting](Fuel/Acceleration/Wall-Wetting)

#### Fuel Algorithms

- [AlphaN](Fuel/Fuel-Algorithms/AlphaN)
- [Mass Air Flow](Fuel/Fuel-Algorithms/MAF)
- [Speed Density](Fuel/Fuel-Algorithms/SD)

#### Fuel Settings

- [AFR settings](Fuel/Fuel-Settings/AFR-setting)
- [Coolant Multiplier](Fuel/Fuel-Settings/CLT-Multiplier)
- [Per-Cylinder Fuel trim](Fuel/Fuel-Settings/Cylinder-Fuel-Trim)
- [Deceleration Fuel Cut Off](Fuel/Fuel-Settings/DFCO)
- [Flex Fuel](Fuel/Fuel-Settings/Flex-Fuel)
- [Fuel Injection Mode](/Fuel/Injectors/Injector-configuration#injection)
- [TPS Multiplier](Fuel/Fuel-Settings/Fuel-TPS-multi)
- [Intake Air Temperature Multiplier](Fuel/Fuel-Settings/IAT_Multiplier)
- [Injector Deadtime settings](/Fuel/Injectors/Injector-configuration#injector-dead-time)
- [Small Pulse width correction](/Fuel/Injectors/Injector-configuration#injector-small-pulse-correction)

### Software

- [Flashing Software Notes](Tools/Flashing-Software-Notes)

#### Hardware Circuits

- [High/Low circuits](Hardware/Hardware-Circuits/High-Low)
- [Highside circuits](Hardware/Hardware-Circuits/Highsides)
- [Lowside circuits](Hardware/Hardware-Circuits/Lowsides)
- [Power supply circuits](Hardware/Hardware-Circuits/Power-Supply)
- [Discrete VR](Hardware/Hardware-Circuits/Discrete-VR)
- [PT2001](Hardware/Hardware-Circuits/PT2001)
- [STM32 Compatibility](Hardware/Hardware-Circuits/STM32-Compatability)

#### Hardware Details

- [Base boards](category/base-boards/)
- [Brain boards](category/brain-boards/)
- [Gauges, Controllers and Auxiliar Hardware](Hardware/Aux-Hardware)

---

### Ignition

#### Ignition Hardware

- [Good ignition drivers](Ignition/Ignition-Hardware/Good-Ignition-Drivers)
- [Good ignition coils](Ignition/Ignition-Hardware/Good-Igntion-Coils)
- [Smart vs Dumb coils](Ignition/Ignition-Hardware/Smart-vs-Dumb-Coils)

#### Ignition Settings

- [Dwell](Ignition/Ignition-Settings/Dwell)
- [Firing Order](Base-Engine/Firing-Order)
- [IAT ignition adder](Ignition/Ignition-Settings/IAT-Ignition-Adder)
- [Ignition Mode](Ignition/Ignition-Settings/Ignition_Mode)
- [Ignition Advance Table](Ignition/Ignition-Settings/Ignition-Advance-Table)
- [Ignition Coolant Correction](Ignition/Ignition-Settings/Ignition-Coolant-Correction)
- [Ignition Per-Cylinder trim](Ignition/Ignition-Settings/Ignition-Cylinder-Trim)

#### Ignition Types

- [Ignition Types Description](Ignition/Ignition-Types/Coil-configuration)

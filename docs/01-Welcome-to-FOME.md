---
slug: /
# (Docusaurus 2.4.1 requires a root doc/page to have a "slug: /" directive, otherwise 404 is assumed as a welcome message)
# (also numbered prefixes are NOT to be used in links, because Docusaurus 2.4.1 matches them automatically )
---

# Welcome to FOME

Fome is a new project intending to deliver a user focused high feature ECU with open source hardware options and open firmware that give control back to the user, owner and driver.

As there are many complicated topics to cover we recommend that you start with the topics in the "intro" section to the left.
The first page to view should probably be [the FOME Overview page](Intro-Start-Here/Overview).

## Index

### Intro - Start here

- [FOME Overview](Intro-Start-Here/Overview)
- [Which FOME hardware to choose](Intro-Start-Here/Which-Hardware-For-Me)
- [Where to get firmware](Intro-Start-Here/Where-To-Get-Firmware)
- [Updating the firmware](Intro-Start-Here/HT-Updating-The-Firmware)
- [Performing a safe first start](Intro-Start-Here/HT-First-Start-Safely)
- [How to setup a board for first use](Intro-Start-Here/HT-Set-Up)
- [How to test inputs and outputs](Intro-Start-Here/HT-Test-IO)
- [Tips and Tricks](Intro-Start-Here/Tips-and-Tricks)
- [How to pick the right fueling method](Intro-Start-Here/Which-Fuel-Method-For-Me)
- [Guide to ETB and VVT PIDs](Intro-Start-Here/HT-PID-ETB-And-VVT)
- [Miata MX5 Quick Start Guide](Intro-Start-Here/Miata-MX5-Quick-Start)

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
- [CAN gauge](Sensors-And-Gauges/Driver-Controls-And-Feedback/CAN-Gauge)
- [Clutch Pedal position and pressure sensing](Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch)
- [Rev Counter](Sensors-And-Gauges/Driver-Controls-And-Feedback/Tacho)
- [WBO2 Wideband Lambda](Sensors-And-Gauges/Driver-Controls-And-Feedback/Wideband)

#### Fuel Sensors

- [Flex-fuel sensor](Sensors-And-Gauges/Fuel-Sensors/Flex-Fuel-Sensor)
- [Fuel level](Sensors-And-Gauges/Fuel-Sensors/Fuel-Level)
- [Fuel pressure](Sensors-And-Gauges/Fuel-Sensors/Fuel-Pressure)

#### General Sensors

- [Analogue input settings](Sensors-And-Gauges/General-Sensors/Analogue-Input-Settings)
- [Aux sensors](Sensors-And-Gauges/General-Sensors/Aux-Sensors)
- [Cam sensor](Sensors-And-Gauges/General-Sensors/CAM)
- [Crank sensor](Sensors-And-Gauges/General-Sensors/CPS)
- [ETB TPS](Sensors-And-Gauges/General-Sensors/ETB-TPS)
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

- [Bench test commands](Basic-Features/Bench-Test)
- [Boost control](Basic-Features/Boost-Control)
- [Cylinder Bank Selection](Basic-Features/Cylinder-Bank-Selection)
- [Data Logging Settings](Basic-Features/Data-Logging)
- [Fan Control](Basic-Features/Fan-Control)
- [Fuel pump relay control](Basic-Features/Fuel-Pump-Relay)
- [GPPWM General purpose PWM](Basic-Features/GPPWM)
- [Main Relay control](Basic-Features/Main-Relay)

#### Cranking Control

- [Advanced cranking features](Basic-Features/Cranking-Control/Adv-Cranking)
- [Cranking idle air control](Basic-Features/Cranking-Control/Cranking-IAC)
- [Cranking RPM limit](Basic-Features/Cranking-Control/Cranking-RPM-Limit)

#### Cranking fuel

- [Cranking Duration](Basic-Features/Cranking-Control/Cranking-Fuel/Cranking-Duration)
- [Cranking Fuel coolant multiplier](Basic-Features/Cranking-Control/Cranking-Fuel/Cranking-Fuel-CLT)
- [Priming Pulse](Basic-Features/Cranking-Control/Cranking-Fuel/Priming-Pulse)

#### Idle control

- [Advanced Idle control](Basic-Features/Idle-Control/Advanced-Idle)
- [Closed loop idle control](Basic-Features/Idle-Control/Advanced-Idle)
- [Idle hardware](Basic-Features/Idle-Control/Idle-Hardware)
- [Idle ignition table](Basic-Features/Idle-Control/Idle-Ignition-Table)
- [Idle settings](Basic-Features/Idle-Control/Idle-Settings)
- [Idle VE Table](Basic-Features/Idle-Control/Idle-VE-Table)
- [Idle tuning](Basic-Features/Idle-Control/Idle-Tuning)

---

### Advanced Features

- [CAN settings](Advanced-Features/CAN)
- [Cylinder Angle Offset](Advanced-Features/Cylinder-Angle-Offset)
- [Knock control](Advanced-Features/Knock-Control)
- [Launch Control](Advanced-Features/Launch-Control)
- [Lua Scripting](Advanced-Features/Lua-Scripting)
- [MAP sampling angle](Advanced-Features/MAP-Sampling-Angle)
- [Multi-Dimensional Mapping](Advanced-Features/Multi-Dimensional-Mapping)
- [Override Table Axis](Advanced-Features/Override-Table-Axis)
- [Smart Alternator](Advanced-Features/Smart-Alternator)

#### ETB

- [ETB bias table](Advanced-Features/ETB/ETB-Bias-Table)
- [ETB idle control](Advanced-Features/ETB/ETB-Idle)
- [ETB pedal target](Advanced-Features/ETB/ETB-Pedal-Target)
- [ETB PID and auto tune](Advanced-Features/ETB/ETB-PID)
- [ETB Settings](Advanced-Features/ETB/ETB-settings)
- [Redundant sensors](Advanced-Features/ETB/Redundant-Sensors)

#### Fuel related

- [Barometric pressure compensation](Advanced-Features/Fuel-Related/Barometric-Pressure-Compensation)
- [Charge Temperature estimation](Advanced-Features/Fuel-Related/Charge-Temp-Estimation)
- [Closed loop fueling](Advanced-Features/Fuel-Related/Closed-Loop-Fuel)
- [Injection Phase settings](Advanced-Features/Fuel-Related/Injecton-Phase)
- [Injector tester](Advanced-Features/Fuel-Related/Injector-Tester)

#### GDI

- [High pressure fuel pump settings](Advanced-Features/GDI/High-Pressure-Pump)

#### Rotary

- [Rotary engine specific settings](Advanced-Features/Rotary/Rotary-Settings)

#### Spark related

- [Multispark](Advanced-Features/Spark-Related/Multispark)

#### Variable cam timing

- [On/Off VVT](Advanced-Features/Variable-Cam-Timing/On-Off-VVT)
- [VVT PID](Advanced-Features/Variable-Cam-Timing/VVT-PID)
- [VVT target tables](Advanced-Features/Variable-Cam-Timing/VVT-Target-Tables)

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
- [Deceleration Fuel Cut Off](Fuel/Fuel-Settings/DCFO)
- [Flex Fuel](Fuel/Fuel-Settings/Flex-Fuel)
- [Fuel Injection Mode](Fuel/Fuel-Settings/Fuel-Injection-Mode)
- [TPS Multiplier](Fuel/Fuel-Settings/Fuel-TPS-multi)
- [Intake Air Temperature Multiplier](Fuel/Fuel-Settings/IAT_Multiplier)
- [Injector Deadtime settings](Fuel/Fuel-Settings/Injection-Deadtime)
- [Small Pulse width correction](Fuel/Fuel-Settings/Small-Pulse)

### Hardware

- [Flashing Software Notes](Hardware/Flashing-Software-Notes)

#### Hardware Circuits

- [High/Low circuits](Hardware/Hardware-Circuits/High-Low)
- [Highside circuits](Hardware/Hardware-Circuits/Highsides)
- [Lowside circuits](Hardware/Hardware-Circuits/Lowsides)
- [Power supply circuits](Hardware/Hardware-Circuits/Power-Supply)
- [Discrete VR](Hardware/Hardware-Circuits/Discrete-VR)
- [PT2001](Hardware/Hardware-Circuits/PT2001)
- [STM32 Compatibility](Hardware/Hardware-Circuits/STM32-Compatability)

#### Hardware Details

- [Base boards](Hardware/Hardware-Details/Base-Board)
- [Brain boards](Hardware/Hardware-Details/Brain-Board)
- [CAN Gauge](Hardware/Hardware-Details/CAN-Gauge)
- [Low-Z Driver board](Hardware/Hardware-Details/Low-Z-Injector-Driver)
- [Power Steering Controller](Hardware/Hardware-Details/PSC)
- [Wideband Lambda module](Hardware/Hardware-Details/Wideband-Module)

---

### Ignition

#### Ignition Hardware

- [Good ignition drivers](Ignition/Ignition-Hardware/Good-Ignition-Dirvers)
- [Good ignition coils](Ignition/Ignition-Hardware/Good-Igntion-Coils)
- [Smart vs Dumb coils](Ignition/Ignition-Hardware/Smart-vs-Dumb-Coils)

#### Ignition Settings

- [Dwell](Ignition/Ignition-Settings/Dwell)
- [Firing Order](Ignition/Ignition-Settings/Firing-Order)
- [IAT ignition adder](Ignition/Ignition-Settings/IAT-Ignition-Adder)
- [Ignition Mode](Ignition/Ignition-Settings/Ignition_Mode)
- [Ignition Advance Table](Ignition/Ignition-Settings/Ignition-Advance-Table)
- [Ignition Coolant Correction](Ignition/Ignition-Settings/Ignition-Coolant-Correction)
- [Ignition Per-Cylinder trim](Ignition/Ignition-Settings/Ignition-Cylinder-Trim)

#### Ignition Types

- [Individual Coils](Ignition/Ignition-Types/Individual-Coils)
- [Sequential Ignition](Ignition/Ignition-Types/Sequential)
- [Wasted Spark](Ignition/Ignition-Types/Wasted-Spark)
- [Single Coil/Distributor](Ignition/Ignition-Types/Single-Coil)

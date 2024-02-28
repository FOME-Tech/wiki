# Multi-Dimensional Mapping, what is it and how to benefit from it  

## This page is under construction

Multi-dimensional mapping is a new feature that has been recently introduced to FOME.  
It is a method of overlaying multiple compensation maps over the simple Load vs RPM ignition and fuel table.  
The term Multi-dimensional comes from tha fact that each compensation table adds an extra dimension to the basic 3d map.  
In FOME you are currently able to activate up to 4 additional compensation maps, each with it's own configurable blend curve.  

The purpose of these tables is to be able to configure an additional input that changes the fuelling or timing, for instance to compensate for things like Ethanol content, Different fuel octane rating or simple variable valve timing.  

## How it works

FOME allows the following inputs to be used as the input for each of the compensation maps:  
TPS,  
MAP,  
CLT,  
IAT,  
Fuel Load,  
Ignition Load,  
Aux Temp 1,  
Aux Temp 2,  
Accelerator Pedal Position,  
Battery Voltage,  
VVT Position for bank 1 or 2 intake and exhaust,  
Ethanol % sensed from the Flex Fuel,  
Aux Linear Sensors 1 and 2,  
GPPWM Outputs 1 to 4,  
Lua outputs 1 and 2, RPM,  
Detected Gear,  

All of the above can be considered the additional dimensions the system is able to be mapped for once selected.  
These are selectable in the four "blend config" tables.

Once one of these inputs is chosen in the Compensation table a blend table will become available.  
This table is a 0 to 100% table that chooses how much of the adjustment in the compensation will be applied to the main table for each combination of the dimension and RPM. 

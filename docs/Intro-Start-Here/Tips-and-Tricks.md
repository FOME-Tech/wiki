# Tips and Tricks

## Power cycle ECU

Any change that you make to the tune or ecu should be followed by a power cycle of the ecu. The only exception to this is for tuning tables (VE Timing etc.)

## Always have a main relay

The main relay is an essential component of the FOME ECU system. It is responsible for delivering power to the ECU when the key is turned on. Without the main relay, the ECU would not receive any power and would not be able to function properly.

#### Why use a main relay? 

Using a main relay has several benefits. First, it helps to protect the ECU from power surges and voltage spikes that can occur when the engine is starting. Second, it allows for a more secure and stable connection between the ECU and the power source, which can help to prevent electrical interference and noise.

It's important to note that the wiring of the main relay may vary depending on the specific ECU and vehicle configuration. Always refer to the manufacturer's instructions and wiring diagrams when installing the main relay to ensure proper installation and operation.

## Why do I have XYZ error?

Check error code and compare to this list (grab list out of firmware)

## Table Axis

Make sure these are always numerically ascending (i.e. 1, 2 ,3 not 1, 1, 3, or 1, 3, 2.)

If you have these going from a large number to a small, stuff is not going to work.

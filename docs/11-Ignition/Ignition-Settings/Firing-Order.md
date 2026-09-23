# How to correctly configure the firing order and ignition pins  

The firing order, cylinder number, and ignition pins are directly correlated. The ignition pin number needs to be wired to the corresponding cylinder in the firing order. For example if the engine firing order is 1-3-4-2, ignition pin 1 needs to be wired to cylinder number one, ignition pin 2 to cylinder 2, and ditto for pin 3 to cylinder 3 and so on.

The firing order for the engine is found under __Base Engine>Base Engine Settings>Firing Order__. This must be configured as stated by the engine manufacturer. A miata uses the 1-3-4-2 firing order but that may not be the same for your specific engine.

The ignition pin selection menu is found under __Ignition>Ignition Settings>Ignition Outputs__.

For wasted spark or double distributor engines where a single output controls several cylinder ignitions, the ignition output pins only need to correspond with one of cylinder numbers in the bank of cylinders being controlled. For a wasted spark example using 1-3-4-2, 1/4 are linked and 2/3 are linked so ignition output 1 would be used for cylinders 1/4 and ignition output 3 would be used for cylinders 2/3.

To correctly check everything is wired correctly, use the [ignition coil testing feature](/Ignition/Ignition-Settings/Ignition-coil-testing). For sequential ignition, spark #1 should correspond with cylinder 1, spark #2 to cylinder 2 and so on. For wasted spark ignition, when spark #1 is fired, cylinder 1 and 4 should spark and for spark #3, cylinder 2 and 3 should spark.

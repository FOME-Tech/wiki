# Ignition Types

Vehicles can have an array of coil configurations. FOME supports the four most common.

## Individual coils   

Individual coils means that the vehicle has a separate ignition coil for every cylinder. This includes systems such as coil on plug (COP) or coil-near-plug. Individual coils allows for one cylinder to be ignited at a time.

## Shared coils

Shared coils means that a pair of cylinders share a single ignition coil. This is the default coil arrangement for the NA and NB Miata. This configuration means that a spark will be wasted every time a coil fires as only one of the two connected cylinders will be in its compression stroke, the other will be in the exhaust stroke.

## Shared wiring individual coils

One common upgrade for the NA and NB miatas is to add individual coils onto each cylinder instead of the stock shared coil arrangement. An important note for this setup is that although there will be four ignition coils, they will be wired togethor to fire in pairs like a shared coil configuration. To convert this configuration to a true individual configuration two more ignition output wires need to be run from the ECU to the coils. [Miata COP conversion is covered in this guide](/Vehicle-Specific/Mazda-MX5-Miata/Miata-COP-Conversion) however it does not cover the wiring of additional outputs.

## Single coil

A single-ignition-coil distributor system uses one ignition coil to generate spark, which is mechanically routed by a distributor to each spark plug in firing order. Common on older car engines, this design relies on a rotating rotor and distributor cap to time and direct the spark, making it simple but more maintenance-intensive than modern distributor-less systems.

## Two distributors

A two-distributor ignition system in car engines uses two separate distributors, each firing half of the engine’s cylinders, typically with its own ignition coil, cap, and rotor. This design was used mainly on older V-type automotive engines to improve packaging and ignition reliability at higher engine speeds, and it is distinct from wasted-spark, dual-plug, or coil-on-plug ignition systems.
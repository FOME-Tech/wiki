# Ignition Mode

The ignition mode can be configured differently depending on the type of ignition system on the vehicle. See [ignition types for more information](/Ignition/Ignition-Types/Coil-configuration).

## Sequential ignition mode

Sequential ignition fires one spark plug at a time by firing them sequentially. This requires that the vehicle has individually wired ignition coils. Sequential ignition has several advantages compared to wasted spark. It decreases spark plug wear by only firing the coil on the cylinder undergoing the compression stroke. By firing one at a time it also increases the delay between the same coil firing again which provides more coil charging time and stronger sparks at higher RPM. Under __Ignition>Ignition Settings__, the vehicle will be correctly wired for sequential ignition if there are separate outputs for every ignition pin.

## Wasted spark mode

Wasted spark ignition causes two cylinders to spark at the same time. It is referred to as 'wasted' because only once cylinder will be undergoing its compression stroke and the other spark is then effectively wasted. Miata NA and NBs use wasted spark mode as they only have two ignition coils. Even if a [Miata COP conversion is undertaken](/Vehicle-Specific/Mazda-MX5-Miata/Miata-COP-Conversion), wasted spark mode will still need to be used unless an additional pair of ignition output wires are connected to the COPs to truly separate them.

FOME always fires in wasted spark mode while cranking. This is because it doubles the chances of igniting the mixture at very low RPM, when conditions are poor for combustion. At cranking speed, airflow is weak, fuel atomization is uneven, and mixture quality varies between cylinders. By firing a spark on every crankshaft revolution instead of every other one, the system ensures that each cylinder receives a spark both when it’s on the compression stroke (useful) and when it’s on the exhaust stroke (wasted). This increases ignition reliability, improves cold starts, and reduces the need for precise camshaft position information during startup.

## Single coil mode

In single coil mode, a spark is fired for every compression stroke for every cylinder. This is used for cars with a single distributor as the distributor distributes which cylinder the spark is distributed to.

## Two distributor mode

In two distributor mode, the spark outputs alternate between distributors as a distributor looks after one bank of cylinders each.
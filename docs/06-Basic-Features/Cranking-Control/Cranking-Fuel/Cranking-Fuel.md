# Cranking Fuel

## Injection Mode

Four injection modes can be selected; simultaneous, batch, single and sequential. The main difference between simultaneous, batch, single, and sequential injection comes down to when and how often each injector fires relative to the engine cycle. Simultaneous injection fires all injectors at the same time, regardless of which cylinders are on their intake stroke/ This provides lots of fuel quickly and is very reliable for cold starts, but not very precise. Batch injection fires injectors in groups (usually two or three at a time in multi-cylinder engines), improving some timing over simultaneous but still not tied to individual cylinder events. Single (or paired) injection fires each injector once per engine cycle but still without precise synchronization to each cylinder’s intake stroke; it’s somewhat more efficient yet still simple. Sequential injection is the most advanced, firing each injector exactly when its intake valve opens, giving the best atomization, lowest emissions, and cleanest starts although during cranking, because the RPM is so low and the timing is inconsistent, sequential doesn’t offer a huge advantage until the engine starts running steadily.

Simultaneous is recommended for most users to begin with.

## Fuel Source for Cranking

The fuel source can be selected between a fixed base fuel mass, or running off the fuelling VE table. For most users, it is recommended to use the fixed mass setting so as to isolate the cranking fuel quantity from the steady state running fuel table.

## Base Fuel Mass (mg)

The base fuel mass is the quantity of fuel each injector should inject into the cylinder for each fuelling pulse. The rule of thumb for calculating this value is to add 60mg of fuel per liter of engine displacement per cylinder. For example, a 2 liter 4 cylinder engine has a displacement of 0.5L/500cc per cylinder and 60mg x 0.5 = 30mg. From this value, the base fuel mass can then be either increases or decreased as necessary or, the cranking multipliers can be used.
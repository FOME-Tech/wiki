# After Start Enrichment

After-start enrichment is important because an engine that has just fired up is still stabilizing and needs extra fuel for a short period before it can idle cleanly. Even if cranking enrichment got the engine to start, the intake ports, combustion chambers, and sensors are still cold, fuel isn’t atomizing well yet, and airflow is uneven. This creates a natural tendency for the mixture to go lean right after the engine catches. After-start enrichment temporarily adds extra fuel to prevent stumbling, stalling, or surging during these first few seconds. As the engine warms slightly and airflow smooths out, the enrichment tapers off, handing control back to the base fuel table. Without after-start enrichment, engines often start but won’t stay running or will run very roughly right after ignition.

## Basic After Start Enrichment 

The basic enrichment holds a set fuel multiplier for a set timing duration before switching over to the main VE table. This is usually good enough for most users although it will use the same multiplier regardless of coolant temperature.

Reasonable values to start with would be between 1.05-1.15 for the multiplier and 5-20 seconds for the duration

## Table After Start Enrichment

The table after start enrichment allows for the fuelling multiplier to vary depending on both the elapsed duration and coolant temperature. In the event the car is already warm, the table allows for the enrichment multiplier to be lowered quicker as the port walls on the engine will already be warm enough to aid in atomizing the fuel. In the event of a cold winter morning, the table allows for a larger multiplier to be used to accommodate for the lack of atomization. When creating a table, it is ideal to taper the multipliers for a cold and hot engine down to 1 to create a smooth fuelling transition between the enrichment table and the main VE table.

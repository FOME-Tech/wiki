# Dwell

Ignition dwell is the time an ignition coil is switched on for before it creates a spark. Think of it as "coil charging up time". Dwell needs to be set for the specific ignition coils as it varies from coil to coil. **An ignition coil upgrade will require the dwell to be adjusted**. Low dwell can result in weak sparks and dwells set too long can result in coils overheating and burning out. The good news is that dwell settings can typically be researched and copied for the specific coils you are using. Just note that some settings will be shown in a 3D RPM vs battery voltage table in which case, some basic math will need to be done to convert those values to dwell time base and voltage correction.

## Dwell Time Base

The dwell time base maps the ignition dwell to engine RPM. Typically dwell will decrease as RPM increases because the faster the engine spins, the less time the coil has to charge up and cool down. Setting high RPM dwell is a balance between getting the strongest spark and not not overheating the coils.

## Dwell Voltage Correction

Coil charging time is dependent on the battery voltage where the charging speed increases with battery voltage. The voltage correction table allows for this to be compensated for multiplying the dwell by the listed multiplication factor for a given battery voltage.

## Fixed Cranking Dwell

Cranking usually requires a dwell higher than the running dwell times for two reasons. Firstly, a larger spark is needed to get the engine running as a cold engine doesn't atomize the fuel as well because the port walls haven't heated up enough to vaporize the fuel properly. Secondly, cranking can make the battery voltage drop in which case a larger dwell time is needed to compensate for the lower battery voltage.
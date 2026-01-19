# MAF Fuelling Strategy

MAF-based fuelling is an engine management strategy that calculates fuel delivery using the mass air flow (MAF) sensor’s measurement of the air entering the engine. Because it measures actual air mass rather than estimating it, the ECU can deliver very accurate fueling across a wide range of operating conditions. This approach automatically compensates for changes in temperature, altitude, and engine modifications that affect airflow. As a result, MAF-based systems typically offer good drivability, fuel economy, and emissions control.

## MAF fuel setup and tuning

To tune FOME using the MAF is probably the quickest and easiest method provided you have a working MAF sensor and the correct information to input in the Transfer Function Table. Details on tuning and setting up the MAF sensor can be found in the [MAF sensor page](/General-Sensors/MAF).

## MAF fuel theory - The detail

The implementation of the MAF in FOME is intended to replicate the functionality of OEM systems and as such is more complex than some other systems.

The foundation of the MAF system is the Mass Air Flow sensor itself, this is a device using a hot wire, hot film or vane to directly measure the flow of air into the engine.
Obviously this sensor does not give out an airflow value, it gives us a voltage, current or PWM signal that represents the flow. FOME can interpret a voltage or current MAF at this time via a transfer function table.

[//]: # "todo: Insert the MAF transfer function screen shot"

The Transfer function table is used to convert the raw MAF sensor reading into a Kg/h (Kilogram Per Hour) airflow.

This Kg/h value is then processed into a required fuel quantity by the following calculations:

    g/s = Kg/h * 1000 / 3600

 n/s = rpm / 60

 airPerRevolution = g/s / n/s

 cylinder Airmass = airPerRevolution / half Cylinder number

In FOME we use a correction factor table to modify this measured air mass to allow correction of any errors in the measurement due to dynamic air flow effects.
To do this we need to have a "load" value that allows us to have a Load Vs Speed fuel table.

    StandardAirCharge = engine displacement / number of cylinders * 1.2929 

This produces the air mass for cylinder filling at 100% VE under standard SAE conditions.
Using this we can relate our cylinder air mass back to a standardised 100% cylinder filling and thus we have a "load" value to use when tuning.

    airChargeLoad = 100 * cylinder Airmass / Standard AirCharge

The required fuel is now simply corrected by adjusting the measured air by the value in the VE table, this value is simply a %.

    corrected Cylinder Airmass = cylinder Airmass * (VE map value / 100)

 fuelMassGram = corrected Cylinder Airmass / desired AFR

    pulse Width = fuelMass / injector flow (in g/s)

Using this method FOME is able to directly measure the air flow into an engine and calculate the required fuel with minimal tuning.

For those interested, [this link](https://www.efunda.com/designstandards/sensors/hot_wires/hot_wires_theory.cfm) details the MAF sensor equations in more detail.

## MAF plenum filling model

The MAF fuelling strategy also uses a plenum filling model. This model describes how the ECU accounts for the air mass stored in the intake plenum between the MAF sensor and the engine. During rapid throttle changes, the airflow measured by the MAF does not immediately match the air actually entering the cylinders because the plenum is filling or emptying. The model estimates this transient air storage effect and corrects fueling accordingly to prevent lean or rich spikes. This improves throttle response and maintains accurate air–fuel ratios during dynamic engine operation.
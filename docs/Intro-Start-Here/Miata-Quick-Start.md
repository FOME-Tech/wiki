# Miata/MX5 Quick Start Guide

So you've just got yourself a shiny new BMM Miata ECU for your NA or NB, nice! If you're wondering how to install and get it running, you've come to the right place. This guide will cover how install the ECU to the car with an LSU 4.9 wideband oxygen sensor and a mass air pressure (MAP) line. Installation of additional sensors or peripherals is covered in the advanced guides.

> **_NOTE:_**  Before commencing the ECU installation, it is recommended to jack up the car or drive it onto ramps in the case when the oxygen sensor location is under the vehicle.

## Required Tools and Components

- BMM Miata ECU
- BMM wideband adapter harness
- BMM options port pigtail
- Genuine Bosch LSU 4.9 oxygen sensor
- 3 metres of silicone vacuum hose 5/32" or 4mm internal diameter
- 22mm wrench or 22mm oxygen sensor socket
- Timing light
- USB cable (included with ECU)
- Windows, Mac or Linux laptop with an installed copy of [EFI Analytics TunerStudio](<https://www.tunerstudio.com/index.php/tuner-studio>)

## Removing Original ECU

The stock ECU location for a Miata will be in one of three spots depending on the driving side and year:

### Left Hand Drive NB

The ECU can be found above the pedals, next to the steering column.

### 90-93 Left Hand Drive NA and Right Hand Drive NA/NB

The ECU can be found under the carpet in the passenger side footwell. To access this, the passenger door sill needs to be removed with a philips head screwdriver so that the carpet can be pulled back. The ECU kick plate will also need to be removed after taking off the five 10mm nuts and bolts holding it in place.

### 94-97 Right Hand Drive NA

The ECU can be found behind the passengers seat, under the carpet. Move the seat forwards all the way. Next, the passenger door sill needs to be removed with a philips head screwdriver so that the carpet towards the back of the seat can be pulled back to reveal the ECU.

Once the ECU has been located, disconnect the car battery then remove all electrical plugs going to the ECU. It should now be free from the car. The last step is to use a philips head to remove the factory ECU mounting brackets for these will be needed to mount the BMM ECU.

## Connecting Wideband Oxygen Sensor

> **_NOTE:_**  It is imperative that you use a genuine Bosch LSU 4.9 sensor rather than a cloned product. A fake LSU 4.9 will not provide accurate readings and can provide a lot of headaches down the track. The best way of avoiding a fake sensor is to buy directly from a reputable supplier.

Find the factory oxygen sensor on the exhaust and unplug it from the wiring harness. In the case that the car has multiple oxygen sensors, the one to remove is the closest sensor to the engine block before any catalytic converters. Next, unscrew the sensor and replace it with a Bosch LSU 4.9 wide-band sensor. Connect the sensor to the BMM wideband adapter harness. The trailing end of the harness will need to be fed through the firewall into the cabin. The easist way of doing this is to cut a hole in the nearest firwall bung to the stock ECU location, and feed the cable through that. Cable tie the wiring away from any hot areas of the engine bay. Inside the cabin, connect the wideband adaptor harness plug to the options port pigtail and plug it into the ECU.

## Connecting MAP Line

Look around the intake manifold for any spare vacuum ports that lie after the throttle body and connect the vacuum line. If there are no spare ports, pick one and attach the vacuum line to it using a tee piece. Optionally, cable tie the vacuum line to the tee. Like the oxygen sensor, feed the line through the bung in the firewall to the ECU. Open up the BMM ECU case with a philips head and feed the vacuum line through the case. Mock up the position of the case in the car before cutting the vacuum line to length. Push the vacuum line onto the MAP sensor on the ECU (the one with the nipple on it) and optionally fasten it with a small cable tie. The ECU can be put back into its case. 

Using the MAP line combined with an intake air temperature (IAT) sensor, the BMM ECU can run the car using what is known as speed-density air metering. This means that you can unplug the mass air flow (MAF) sensor or the air flow meter (AFM) for the NA 1.6L vehicles.

## Additional Steps for NA6 Vehicles

The NA6 1.6L vehicles which use an AFM instead of a MAF require a few additional modifications to run with a BMM ECU. These vehicles do not have a variable throttle position sensor (TPS) or an intake air temperature (IAT) sensor like the rest of the later model NAs and all NBs. They also require a jumper for the ECU to control the fuel pump which was previously the job of the air flow meter.

The first step is to disconnect the factory TPS sensor. **This is very important or it will cause a short circuit later.** The BMM ECUs for this vehicle include a KIA TPS and adapter. The KIA TPS can be wired straight to the OEM TPS plug as per the wiring diagram below: 
[TPS Adapter](<http://sadfab.com/16%20VTPS%20bracket.html>),  [Diagram](<https://trubokitty.com/#tps>)

The next step is to wire up the IAT sensor and to add a jumper wire to the AFM connector as per the wiring diagram below:
[Diagram](<https://trubokitty.com/#ait>)

## Connecting the ECU

Now that the MAP line and wideband are connected to the ECU, the remaining wiring harness plugs from the OEM wiring loom can be plugged into the ECU. Take the factory ECU mounts and attach them to the BMM ECU case. The ECU can now be re-installed into the factory location. The car battery can now be re-connected.

## Tuner Studio Setup

Make sure that you have downloaded the latest version of TunerStudio (TS) from [here](<https://www.tunerstudio.com/index.php/tuner-studio>). Although the base version of the software is free, it is strongly recommended to buy a license for the additional features including auto-tuning. 

Plug the ECU into the laptop and open TS. Create a new project and click *detect* under firmware. Select the COM port corresponding to the FOME ECU and click *next*. 

In the next dialog choose between lambda or air fuel ratio (AFR) as your display units. lambda is recommended as it is easier to comprehend and tune with. For example, the ideal or stoichiometric AFR for regular petrol is 14.7 (14.7 parts air to 1 part fuel) which corresponds with a lambda of 1. Lambda represents the percentage of air in the combustion chamber compared to the amount needed for ideal or stoichiometric combustion to occur. If a car is running 10% lean, the AFR would be 16.17 and lambda would be 1.1. If the car is 10% rich, AFR would be 13.36 and lambda would be 0.9. Looking at lambda, it is instantly obvious what percentage rich or lean the engine is running but with AFR, it requires more effort.

In the final dialog box, select the default gauge layout (you can change this later as you wish) and click *finish*. The last step before cranking the engine is to click the *Ignition* button to open the ignition settings and change the timing mode from *dynamic* to *fixed* and the fixed timing setting to 10 degrees. This will lock the engine to operate at 10 degrees of timing so that you can set the base timing.

## Updating ECU Firmware

The ECU should already be loaded with the base map and one of the latest firmware versions but it is useful to know how to update it when more features are added.

## Set Base Timing

The car should start on the base map although once it is running, the base timing needs to be set up. This syncs the timing between the ECU and the car so that they are both reading the same values. Typically the base timing will be a few degrees out from the base map as it varies slightly from car to car.

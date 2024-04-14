# Miata Knock Sensor

For NA6 & NA8 there is a M10x1.25 threaded blind hole that should be u􀆟lized for a knock sensor located above the Factory Oil Pressure sending unit below the intake manifold. You can access this with the intake manifold installed.

1. **Create Clearance for the Knock Sensor**
   - Utilize the factory Mazda oil pressure sender unit:
     - Install a 1/8 BPST spacer (male to female).
     - Relocate using Oil sender remote mount kit.
   - Or, replace OEM sender unit with a Pressure Transducer:
     - Adapt from 1/8 BPST to Required fitting type (ensure spacing for knock sensor).

2. **Mount the Knock Sensor to the Block and Torque it to 20Nm**
   - Given the engine's M10x1.25 specs, options include:
     - Employing a M10x1.25 threadsert with a M8 X 1.25 Internal Thread.
     - Crafting a custom M10x1.25 to M8x1.25 threaded stud.
     - Using a m8x1.25 Allen Bolt and using a Die to cut m10x1.25 threads onto the external section of the bolt head.

For NB models and onwards, a factory knock sensor is pre-installed on the block. However, replacing it with a Bosch KS4-P knock sensor can offer a broader frequency bandwidth for knock detection. Similar steps apply, necessitating the use of a M10x1.25 threadsert with a M8 X 1.25 Internal Thread, a custom M10x1.25 to M8x1.25 threaded stud, or a m8x1.25 Allen Bolt with threads cut using a Die onto the bolt head's external section. Once the Knock Sensor is torqued to the block, wiring it into the correct pinout on the ECU is the subsequent step.

Wiring might entail additional pins and connectors depending on the Miata's model year. Below are the pinouts for the current rev of ECUs:

- 90-95 – 2P
- 96-97 – 1S
- NB1 – 1S
- NB2 – 4M

## Tuner Studio Setup

When knock occurs due to factors like advanced ignition timing or high cylinder pressures, the sensor detects these vibrations. The ECU then adjusts ignition timing to prevent further knock. This constant monitoring and adjustment help protect against damage. To set this up, follow these steps:

1. **Enable the Knock Sensor and Calculate the Knock Frequency**
   - Use the approximation formula: Knock Frequency = 900,000/(π *0.5*cylinder bore diameter)
   - Use the second-order harmonics of the estimated frequency for improved sensitivity and signal-to-noise ratio.

2. **Adjust Ignition Timing and Record Engine Performance Logs**
   - Remove ignition timing from the ignition map and adjust other parameters to prevent pre-detonation events.
   - Record a log at a minimum of 100 Samples per second from idle to redline.

3. **Review and Set Up Knock Retard Aggression**
   - Review log data to create a baseline curve for knock detection.
   - Adjust knock retard aggression to determine the level of response.

4. **Set Up the Max Knock Retard Table**
   - Define maximum allowable knock values for ignition timing retardation.

Installing a knock sensor in a Mazda Miata involves accessing a threaded hole above the oil pressure sending unit under the intake manifold. For models NB and onwards, a factory-installed knock sensor is available, but upgrading to a Bosch KS4-P sensor broadens the frequency bandwidth for better knock detection. Installation requires creating clearance for the sensor and mounting it to the block, followed by wiring it into the correct pinout on the ECU. Once installed, the knock sensor continuously monitors knock events, allowing the ECU to adjust ignition timing and prevent damage from subsequent knock events. Setting up knock detection involves calculating the knock frequency, recording engine performance logs, and adjusting parameters such as knock retard aggression and the Max Knock Retard table to optimize engine protection and performance.
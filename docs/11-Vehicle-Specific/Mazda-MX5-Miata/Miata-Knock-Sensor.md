# Miata Knock Sensor Upgrade

## Installation of Knock sensor

For __NA6 & NA8__ there is a M10x1.25 threaded blind hole that should be utilized for a knock sensor located above the Factory Oil Pressure sending unit below the intake manifold. You can access this with the intake manifold installed.

There are two steps required to install a __Bosch KS4-P__ sensor onto a 90-97 Miata block.

1. **Create clearance for the Knock Sensor**
    - Utilizing the factory Mazda oil pressure sender unit
        - Install a 1/8 BPST spacer (male to female)
        - Relocate using Oil sender remote mount kit
    - Replace OEM sender unit with a Pressure Transducer
        - Adapt from 1/8 BPST to Required fitting type (make sure to account for the spacing of the knock sensor)
   
2. **Mounting the knock sensor to the block and torquing it to 20nm.**
    - Given the engine's M10x1.25 specs, options include employing a M10x1.25 threadsert with a M8 X 1.25 Internal Thread, crafting a custom M10x1.25 to M8x1.25 threaded stud, or using a m8x1.25 Allen Bolt and using a Die to cut m10x1.25 threads onto the external section of the bolt head.

For __NB models__, a factory knock sensor is pre-installed on the block. However, replacing it with a Bosch KS4-P knock sensor can offer a broader frequency bandwidth for knock detection. To make the switch, similar steps apply, necessitating the use of a M10x1.25 threadsert with a M8 X 1.25 Internal Thread, a custom M10x1.25 to M8x1.25 threaded stud, or a m8x1.25 Allen Bolt with threads cut using a Die onto the bolt head's external section. Once the Knock Sensor is torqued to the block, wiring it into the correct pinout on the ECU is the subsequent step

Wiring might entail additional pins and connectors depending on the Miata's model year. Below are the pinouts for the current rev of ecu’s:

- 90-95 – 2P
- 96-97 – 1S
- NB1 – 1S
- NB2 – 4M

# Overview of the Block

![image](<Knock Sensor/block overview 1.png>)
![image](<Knock Sensor/block overview 2.png>)
![image](<Knock Sensor/block overview 3.png>)
![image](<Knock Sensor/block overview 4.png>)
![image](<Knock Sensor/block overview 5.png>)

## Tuner studio Setup

When knock occurs due to factors like advanced ignition timing or high cylinder pressures, the sensor detects these vibrations. The ECU then adjusts ignition timing to prevent further knock. This constant monitoring and adjustment help protect against damage. To set this up requires the following steps:

**Summary of knock detection and protection:**

1. Enable the knock sensor and calculate the knock frequency using an approximation formula.
2. Remove ignition timing from the ignition map, adjust other parameters to prevent pre-detonation events.
3. Record a log of engine performance and knock sensor levels across full RPM range.
4. Restore the tune and maps to its original configuration.
5. Review log data to create a baseline curve for knock detection.
6. Adjust knock retard aggression to determine the level of response.
7. Set up the Max Knock Retard table to define maximum allowable ignition timing retardation.

__The following steps assumes your ECU is on the latest release of FOME__

**1. Enable the knock sensor**, and calculate the estimated knock filter frequency (kHz). For now, configure the first setting “cylinder bore” as 0.00mm.

- An adequate approximation formula for Knock Frequency is “Knock Frequency = 900,000/(π {'*'} 0.5 {'*'} cylinder bore diameter )” $=5
- Once the approximated knock frequency is calculated, use the second-order harmonics of the estimated frequency. The second-order frequency are multiples of the original calculated frequency. So twice the Knock Frequency. We do this to increase sensitivity, improve signal to noise ratio, and general “robustness” in frequency analysis.
- For now, Set knock detection window start to 0.00, This feature is for advanced users only.

  - <sub>This formula is derived from the relationship between the speed of sound, the bore diameter, and the frequency of knock waves. It assumes that the speed of sound is approximately constant and that the knock waves travel at a specific angle through the combustion chamber. As an example, the NA6’s estimated knock frequency is 7300 Hz or 7.3kHz & its 2nd order harmonic would be 14.60Khz.</sub>

__The next few steps assume your car is running well enough to take a low-load full rpm log to define the engine knock threshold curve.__ <sub>An engine knock threshold curve shows how the sensitivity of knock sensors changes with engine speed. It's a graph where the horizontal axis represents engine speed (in RPM) and the vertical axis shows the knock sensor's sensitivity level (in dBV). Tuning this curve ensures the ECU reacts appropriately to protect the engine while maximizing performance.</sub>

**2. Start by removing ignition timing** from the ignition map, an approach is to remove 3 degrees of timing, increase octane rating, decrease boost and any other parameters that can contribute to pre-detonation events.

**3. Record a log at a minimum of 100 Samples per second from idle to redline** (Under Communications/Data Rate). This can be performed in a few ways. The better the Data, the better the Threshold curve:
    - On Jack stands with slight load applied such as brakes
    - Driving on the road in a controlled fashion

**4. Restore the tune back to the previous configuration** (for example, add 3 degrees of ignition timing).

**5. Review the log in MegaLog Viewer and generate a scatter plot** of the “Knock: Current Level” vs RPM:
    - Ideally the plot is the low-load noise of the engine throughout the whole rpm range. It should look something like this below. 
        - Further filtering can be applied in megalog viewer to remove high manifold pressure and deceleration noise. Use these expressions to help analysis the measured data.
            - Deceleration : “ [RPM-4]{'<='}[Field.RPM]&&[TPS]{'<'}50 “
            - High Load : “ [Ign: Load]>60 “
    ![image](<Knock Sensor\knock current vs rpm.png>)
    - Once the above plot for your engine has been generated, we can use this data to create a plot that will be used in Tunerstudio’s table on the bottom right. This is a baseline curve, further logs can be taken and more data reduction can used to refine the curve.
    - The curve used in Tunerstudio should fit over the top of the low-load noise and also be “tight” to the measured data. As shown below, the orange scater is all the data less than 60kpa and the grey is a curve can be used as a baseline threshold in Tunerstudio.
        - An active system is better than one missing low level knocks
    ![image](<Knock Sensor\knock threshold curve fitted.png>)
    ![image](<Knock Sensor\Software knock.png>)
    
**6. Set up the Response of the Knock controller’s parameter “Knock retard aggression”** A generalized rule of thumb would be 5% is considered adequate where as 15% being very aggressive:
    - The knock retardation amount is determined by calculating the distortion from the optimal ignition timing, multiplying it by the configured knock retard aggression percentage to determine the desired retardation, and then applying this retardation to the current knock retardation value.

**7. Set up the Max Knock Retard table**:
    - The max knock table defines the maximum allowable knock values that the knock controller can use to retard ignition timing, with the Y-axis representing ignition load, the X-axis engine speed in RPM, and the Z-axis indicating the degree of timing retardation permitted for each combination of load and speed.
    ![image](<Knock Sensor\max retard allowable.png>)

## Conclusion

Installing a knock sensor in a Mazda Miata involves accessing a threaded hole above the oil pressure sending unit under the intake manifold. For models NB and onwards, a factory-installed knock sensor is available, but upgrading to a Bosch KS4-P sensor broadens the frequency bandwidth for better knock detection. Installation requires creating clearance for the sensor and mounting it to the block, followed by wiring it into the correct pinout on the ECU. Once installed, the knock sensor continuously monitors knock events, allowing the ECU to adjust ignition timing and prevent damage from subsequent knock events. Setting up knock detection involves calculating the knock frequency, recording engine performance logs, and adjusting parameters such as knock retard aggression and the Max Knock Retard table to optimize engine protection and performance.

## Knock Sensor Part list

| Knock | Bosch - Off the Shelf |  |
| --- | --- | --- |
| Bosch KS4-P | 0 261 231 173 | FCP Euro 2-Pin RB-Kp.1 (F02U.B00.966-01) or 0 261 231 188 Ballenger 2-Pin Jetronic (D261.205.288-01) [LK-2 Connector] |
| Bosch KS4-R | 0 261 231 218 | eBay 2-Pin RB-Kp.1 or 0 261 231 223 eBay 2-Pin RB-Kp.3 (F02U.B00.967-01) |
| Bosch KS-1-S | 0 261 231 120 | FCP Euro Amazon 2-Pin RB-Kp.1 (F02U.B00.966-01) or 2-Pin Jetronic (D261.205.288-01) [LK-2 Connector] |

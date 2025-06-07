# Performing a Safe First Start

## Safety Considerations
 - Never perform the first start alone; have a second person monitor surroundings and assist in emergencies.
 - Keep a fire extinguisher rated for fuel and electrical fires within arm’s reach.
 - Ensure the workspace is clear of all flammable liquids, loose tools, and debris.
 - Ensure the workspace has proper ventilation.
 - Stop immediately if you detect strong fuel smells.

## 1. Preparation
 - Sensor Verification: Ensure all sensors—MAP/MAF, CLT, IAT, TPS, and fuel pressure—are functional and correctly calibrated.
 - Cranking Readiness: Confirm the engine cranks robustly with a consistent speed; address any starter or battery issues beforehand.
 - Fuel System Check: Verify the fuel pump and pressure regulator are operational, and that there is sufficient fuel in the tank.
 - Injector and Ignition Setup: Ensure injectors and ignition coils are correctly wired and configured to the appropriate ECU channels.
 - Trigger Wheel Information: Obtain accurate details about your crank trigger wheel, including the number of teeth and TDC offset.
## 2. Initial Steps
 - Disable Fuel and Ignition: In TunerStudio, disable fuel injection and ignition to safely test the crank sensor.
 - Crank Sensor Verification: In TunerStudio, navigate to Diagnostics & High-Speed Logger → Tooth Logger. Use the high-speed logger to confirm that the crank sensor accurately reads the trigger wheel pattern.
 - TDC Confirmation: Set the cranking advance angle to zero. (Later on, you will need to use a timing light while cranking to verify the TDC position).

## 3. Connect TunerStudio to Your ECU
 - Bring Your Dashboard to Life: Connect your FOME ECU to TunerStudio. Once connected, the dashboard should display sensor inputs and output values like ignition timing and dwell.
 - Verify Sensor Readings:
  - Coolant Temperature (CLT): Should match the ambient temperature initially.
  - Intake Air Temperature (IAT): Similar to CLT, depending on engine setup.
  - Battery Voltage (BV): Should read 12.5V or higher.
  - Manifold Air Pressure (MAP/MAF): For MAP-based setups, expect a reading near 100kPa at atmospheric pressure.
  - Throttle Position Sensor (TPS): Push the throttle pedal and confirm a response on the dashboard. ( Check ETB calibration section if you have Electronic Throttle Body ETB)
 - Initial System Check:
  - Look for any erratic sensor values or error codes.
  - Ensure RPM displays "0" when the engine is not running.

## 4. Calibrate Throttle Pedal (TPS)
 - In TunerStudio:
  - Navigate to Tools → Calibrate TPS.
  - Without touching the throttle, click Get Current for "Closed Throttle ADC Count."
  - Fully depress the throttle pedal and click Get Current for "Full Throttle ADC Count."
  - Save (Burn) the calibration to the ECU.
 - Verify the calibration by observing smooth TPS values as you operate the pedal.

## 5. Test Outputs (Fuel, Spark, and More)
 - Fuel Pump Test:
  - If your fuel pump is ECU-controlled, go to Controller → Bench Test & Commands in TunerStudio.
  - Test the "Fuel Pump" output; you should hear the pump running.
 - Ignition Spark Test:
  - **Only carry a spark test if necessary since it is dangerous!**
  - Test spark outputs, starting with primary cylinders (e.g., Spark #1 and Spark #3 for a 4-cylinder engine).
  - To visually confirm, connect a spark plug to the ignition coil, ground it, and observe the spark while testing. Handle with care—HIGH VOLTAGE don’t harm yourself.
 - Injector Test:
  - Test injectors using the same menu. For sequential systems, test all injectors individually (e.g., Injector #1, Injector #2, etc.).
  - Listen for a distinct clicking sound during testing.
 - Other Outputs:
  - Test auxiliary outputs like the Check Engine Light, cooling fan, and AC-related controls if applicable.
 - Safety Reminder:
  - Keep a fire extinguisher nearby during output testing.
  - Ensure the engine bay is free from flammable materials.

## 6. Cranking and First Start
1. Reset the ECU:
 - Turn off the ignition and disconnect the USB cable to ensure a clean state.
 - Reconnect the USB cable and turn on the ignition. Wait for TunerStudio to establish a connection.
 - Make sure Fuel and Ignition are enabled in TunerStudio,
2. Monitor During Cranking:
 - Start cranking the engine and observe RPM on the dashboard.
 - Typical cranking RPM is between 150–400 RPM.
3. Initial Firing:
 - If RPMs are registering but the engine isn’t catching, continue cranking.
 - It may take several seconds for the ECU to synchronize with the VPS and determine crankshaft position.
4. Adjust During Startup:
 - If the engine sputters, adjust throttle input slightly to help it catch.
 - Monitor RPM and listen to any abnormal noise closely.
 - STOP immediately if you detect any of the below:
  - Strong fuel smells
  - Rapid temperature rises
  - Unusual engine noises
5. Post-Start Adjustments:
 - Once the engine starts, stabilize idle by monitoring coolant temperature, Intake Air temperature and RPM.
 - Allow the engine to warm up for few seconds while observing for leaks or abnormal behavior.

## Final Notes
 - If the engine does not start after several attempts, revisit your sensor calibration and outputs in TunerStudio.
 - Engage with the FOME community forums for troubleshooting support.
 - **CONGRATULATIONS**

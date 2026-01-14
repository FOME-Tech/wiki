# Data Logging Settings

FOME ECUs and TunerStudio both have powerful and useful data logging abilities to aid with tuning. The TS logging allows high fidelity logs to be taken with a laptop connected directly to the ECU and on-board logging records to an SD card inside the ECU for later analysis.

## Basic Data TunderStudio logging settings

The TS logging settings can be found in the __Data Logging__ tab up the top.

### Start & Stop Logging

Logging can be started and stopped with CTRL+L & CTRL+K respectively. 

### Logging Profiles

Custom logging profiles can be configured to add or take away specific parameters. Typically the default profile is acceptable as it logs all parameters.

### Triggered Logging

Triggered logging is useful in that it allows the user to set the conditions of when a log should begin. The manual setting has the logs started and stopped by the user. The simple settings allow for logging to be started and stopped when a parameter is above, below or equal to a user-specified value e.g. start logging when CLT is above 75. Expressions are more complex but allow for a series of conditions to be used e.g. [RPM] > 6000 && [TPS] > 90 will activate when the TPS is over 90% and the RPM is over 6000.

### Data Logging Preferences

The preferences allow for the data log formatting and naming to be modified. Typically these can be left as the default settings of MLG format and naming on log start with the tune saved to the log.

### Other Settings

By pressing ALT+V, the log can be viewed in mega-log-viewer, another piece of software by EFI Analytics specifically designed for viewing logs.

By pressing ALT+L, the selected data log folder will be shown.

## SD card logging

The SD card logger works only when the ECU is powered without a USB connection (or if usb is connected a few seconds after the car has been started). When the ECU is powered by USB, the SD card connects to the PC as a USB storage device for retrieving the logs.

### Data Rate

In TS, the logging data rate can be set under __Communications>Data Rate__. 100 reads per second (100Hz) is a reasonable default to capture high fidelity readings. Higher rates may be required for certain high speed events in which case the rate can be set up to 500Hz or "max reads per second".

### SD logging settings

The SD logging settings are found under __Controller>SD Card Logger__. The SD logger rate can be configured for higher or lower fidelity logs depending on user preference. 20Hz is a reasonable default that will result in log sizes less than ~ 100MB per hour of running. 50Hz will produce larger file sizes buy higher fidelity logs which will better capture knock events or quick spikes.

For the __SD logger mode__, 'Trigger' mode will write a high speed log of trigger events (warning: uses lots of space!). 'Normal' mode will write a standard MLG file type of sensors, engine function, etc. similar to the one captured in TunerStudio. For most users most of the time, normal mode is recommended.

## Diagnostic and High speed logger
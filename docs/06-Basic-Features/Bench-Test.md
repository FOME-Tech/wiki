# Bench Test & Commands  

The bench testing menu under __Controller>Bench Test__ is a useful way of testing a range of engine outputs and commands.

## Engine outputs

The solenoids and relays will operate for the number of cycles set on the count setting. Each output pulse will stay on for the set on time and off for the set off time.

Below is a list of the bench test engine outputs and what to look out for when testing:

- Transmission control unit (TCU) solenoids: This controls the gear selection in an automatic transmission vehicle. Listen for a clicking sound as each solenoid is triggered.
- Main relay: This controls power to vital engine components like the fuel pump and ignition system. Listen for a click.
- Fuel pump: turning this on should make a whirring sound as fuel is pumped.
- Cooling fans: this will enable the cooling fans.
- A/C relay: this will enable the A/C relay, listen for a click.
- Check engine light: this will enable the check engine light on the dash.
- Idle air valve & second air valve: this will pulse the idle air valve, listen for a series of clicks as it is pulsed.
- High-Pressure Fuel Pump (HPFP) valve: this is only for direct injection vehicles such as a diesel. Listen for a click.
- Starter relay: listen for a click indicating the starter motor has engaged with the flywheel.

## Commands

The commands section allows for up to 8 LUA scripts to be triggered on the engine. See the [section on LUA scripting for more information](/Advanced-Features/Lua-Scripting).

## Additional Settings

Additional settings are as follows:

- Stop engine: in the case the engine is running, this stops it.
- Force resync: this forces the trigger to attempt to resync.
- Write config: this writes the current TS settings to the ECU.
- Reset ECU: this forces the ECU to restart or reboot.
- Reset to DFU: DFU mode is used only to load the ECU firmware in the case that the standard firmware upload program fails.
- Reset to OpenBLT: This initiates the firmware update mode using the OpenBLT bootloader.
- No flash burn mode:
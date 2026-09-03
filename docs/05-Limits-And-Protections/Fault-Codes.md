# Fault Codes

FOME reports problems as OBD-II style fault codes (DTCs). Most of them are standard `P0xxx`/`P2xxx` codes with their usual meanings, so a code you see here means roughly what it would mean on a factory ECU.

## Reading a code

There are three places a fault shows up, and they don't all show the same thing.

### In TunerStudio

The `Last error` and `Error#1`–`Error#8` gauges show the eight most recent faults. **They are shown as a plain decimal number, not as a `P` code.** To convert, read the decimal number as hexadecimal — those digits are the P-code:

| TunerStudio shows | Read as hex | Fault code |
|---|---|---|
| 263 | 0x107 | P0107 |
| 279 | 0x117 | P0117 |
| 822 | 0x336 | P0336 |
| 8501 | 0x2135 | P2135 |

The tables below list both forms, so you can just look up the number you see.

The FOME console also prints a plain-English line when the fault happens, for example `WARNING: Sensor fault: CLT input too low`. That's usually faster to read than the code.

### On the check engine light

If your board has a MIL output configured, it blinks stored codes out as **hexadecimal** digits, with a 1 second gap between digits and 5 seconds between codes. Each digit is blinked `n+1` times, so `0` is one blink and `7` is eight blinks. P0107 blinks as 2, 1, 8.

### Over CAN

FOME answers OBD-II service `0x03` (read stored DTCs) on the CAN bus, so a generic scan tool will read the codes normally. Pending and permanent DTCs (services `0x07` and `0x0A`) are not supported.

## Clearing codes

Stored codes live in RAM only, so **power cycling the ECU clears them**. Nothing is written to flash, and codes do not survive a reboot.

While the ECU is running, most sensor faults latch: once set, the code stays until reboot even if the sensor starts reading correctly again.

## Choosing what a code does

Several codes have a configurable severity, set in TunerStudio next to the relevant sensor's settings (look for a "DTC Pxxxx severity" field):

- **Warning only** — the fault is logged, the code is stored, and the MIL is lit.
- **Ignore** — the fault is still logged as a warning, but no code is stored and the MIL stays off.

Use *Ignore* for codes that are noise on your setup — for example P0176 on a car with no flex sensor wiring, or the cam sensor codes on an engine where the cam signal is intentionally marginal.

Codes without a severity setting are always reported.

## Sensor circuit codes

These come from the sensor checker, which runs once the ECU has been powered for a second and the battery voltage has been stable for 5 seconds. "Low"/"High" mean the raw input is outside the range that could possibly be real — almost always wiring, not calibration. "Timeout" means no reading has
arrived at all.

| Code | Dec | Meaning | What to check |
|---|---:|---|---|
| P0101 | 257 | MAF signal timeout | MAF unplugged, wrong pin assigned, no signal on the wire |
| P0102 | 258 | MAF input below `mafMinVoltage` | Short to ground, open signal wire, or `mafMinVoltage` set too high for your sensor |
| P0103 | 259 | MAF input above `mafMaxVoltage` | Short to 5V, open ground on the MAF, or `mafMaxVoltage` set too low |
| P0106 | 262 | MAP signal timeout | MAP sensor unplugged or wrong input pin assigned |
| P0107 | 263 | MAP below the configured minimum | Short to ground, broken signal wire, or `mapErrorDetectionTooLow` set too high for your sensor |
| P0108 | 264 | MAP above the configured maximum | Short to 5V, missing sensor ground, or `mapErrorDetectionTooHigh` set too low for a boosted engine |
| P0110 | 272 | IAT signal timeout | IAT input not configured or not sampling |
| P0112 | 274 | IAT input below 0.05V | Sensor shorted to ground, or a short in the harness |
| P0113 | 275 | IAT input above 4.9V | Open circuit — unplugged sensor, broken wire, or missing bias resistor |
| P0115 | 277 | CLT signal timeout | CLT input not configured or not sampling |
| P0117 | 279 | CLT input below 0.05V | Sensor or harness shorted to ground |
| P0118 | 280 | CLT input above 4.9V | Open circuit — unplugged sensor or broken wire |
| P0120 | 288 | TPS1 primary timeout | TPS input not configured or not sampling |
| P0122 | 290 | TPS1 primary below `tpsErrorDetectionTooLow` | Open or shorted signal wire, or closed-throttle calibration is wrong |
| P0123 | 291 | TPS1 primary above `tpsErrorDetectionTooHigh` | Short to 5V, or wide-open calibration is wrong |
| P0176 | 374 | Flex sensor signal lost | Sensor unplugged, broken wire, or missing pull-up resistor on the signal line |
| P0178 | 376 | Flex frequency too low (\<45 Hz) | Marginal signal, noise, or a failing sensor |
| P0179 | 377 | Flex frequency too high (>155 Hz) | Failing sensor, or methanol contamination in the fuel |
| P0196 | 406 | Oil temperature signal timeout | Oil temp input not configured or not sampling |
| P0197 | 407 | Oil temp input below 0.05V | Sensor or harness shorted to ground |
| P0198 | 408 | Oil temp input above 4.9V | Open circuit — unplugged sensor or broken wire |
| P0220 | 544 | TPS1 secondary timeout | Second TPS channel not configured or not sampling |
| P0222 | 546 | TPS1 secondary too low | Open or shorted wire on the second TPS channel |
| P0223 | 547 | TPS1 secondary too high | Short to 5V on the second TPS channel |
| P0225 | 549 | TPS2 primary timeout | See P0120, for the second throttle body |
| P0227 | 551 | TPS2 primary too low | See P0122 |
| P0228 | 552 | TPS2 primary too high | See P0123 |
| P0521 | 1313 | Oil pressure signal timeout | Oil pressure input not configured or not sampling |
| P0522 | 1314 | Oil pressure below sensor range | Short to ground or broken signal wire |
| P0523 | 1315 | Oil pressure above sensor range | Short to 5V, or the sensor's configured pressure range is too small |
| P2120 | 8480 | TPS2 secondary timeout | See P0220, for the second throttle body |
| P2122 | 8482 | TPS2 secondary too low | See P0222 |
| P2123 | 8483 | TPS2 secondary too high | See P0223 |
| P2125 | 8485 | Pedal primary timeout | Pedal input not configured or not sampling |
| P2127 | 8487 | Pedal primary too low | Open or shorted pedal signal wire, or bad closed-pedal calibration |
| P2128 | 8488 | Pedal primary too high | Short to 5V, or bad full-travel calibration |
| P2130 | 8496 | Pedal secondary timeout | Second pedal channel not configured or not sampling |
| P2132 | 8498 | Pedal secondary too low | Open or shorted wire on the second pedal channel |
| P2133 | 8499 | Pedal secondary too high | Short to 5V on the second pedal channel |
| P2226 | 8742 | Implausible barometric pressure at startup | MAP reading was not close to atmospheric when the ECU booted — check the MAP sensor calibration and that the engine was actually stopped |

### Redundancy correlation codes

Redundant sensor pairs (TPS and pedal) are cross-checked against each other. If the two channels disagree by more than 5% (10% on Hellen 121 Nissan), the combined sensor is invalidated:

| Code | Dec | Meaning |
|---|---:|---|
| P2135 | 8501 | TPS1 primary and secondary disagree |
| P2136 | 8502 | TPS2 primary and secondary disagree |
| P2137 | 8503 | Pedal primary and secondary disagree |

A correlation fault almost always means one of the two channels has drifted, is noisy, or was calibrated against the wrong end of its travel. Log both raw channels and compare them across the whole range of travel — they should track each other everywhere, not just at idle.

:::warning
On an electronic throttle car, a correlation fault will cut the throttle. Fix it before driving.
:::

## Trigger and cam codes

| Code | Dec | Meaning | What to check |
|---|---:|---|---|
| P0336 | 822 | 50+ crank trigger decode errors in one run | Noise on the crank signal, wrong trigger wheel selected, bad sensor gap, or a damaged reluctor |
| P0340 | 832 | Bank 1 intake cam: no signal | Cam sensor unplugged, wrong input pin, or no signal reaching the ECU while the crank signal is fine |
| P0341 | 833 | Bank 1 intake cam: 50+ decode errors | Noisy or intermittent cam signal, or the wrong VVT mode selected |
| P0345 | 837 | Bank 2 intake cam: no signal | As P0340 |
| P0346 | 838 | Bank 2 intake cam: 50+ decode errors | As P0341 |
| P0365 | 869 | Bank 1 exhaust cam: no signal | As P0340 |
| P0366 | 870 | Bank 1 exhaust cam: 50+ decode errors | As P0341 |
| P0385 | 901 | Bank 2 exhaust cam: no signal | As P0340 |
| P0386 | 902 | Bank 2 exhaust cam: 50+ decode errors | As P0341 |

Cam codes are only checked once the crank trigger has synced 20 times, and only for cam inputs that actually have a pin assigned. Crank checking is skipped below the cranking RPM threshold so that a stalling engine doesn't set a code on the way down.

## Knock sensor codes

| Code | Dec | Meaning |
|---|---:|---|
| P0327 | 807 | Knock sensor 1 signal too low |
| P0332 | 818 | Knock sensor 2 signal too low |

Set when a knock sensor that was previously working reads below `knockNoiseThreshold` for longer than `knockNoiseTimeout` while the engine is running. A healthy sensor reads roughly -50 to -20 dBv; a disconnected one sits near the noise floor below -80 dBv. Check the sensor connector, the shield ground, and the sensor's mounting torque. Setting `knockNoiseTimeout` to 0 disables the check.

## Injector and ignition circuit codes

| Code | Dec | Meaning |
|---|---:|---|
| P0201–P0212 | 513–530 | Injector circuit 1–12 fault |
| P0351–P0362 | 849–866 | Ignition circuit 1–12 fault |

These require a board with smart driver chips capable of reporting output diagnostics — boards without them never set these codes. The TunerStudio console message includes the specific fault the driver reported (open load, short to ground, short to battery, over temperature). Check the injector or coil connector and the wiring to it first.

## Power supply and system codes

| Code | Dec | Meaning | What to check |
|---|---:|---|---|
| P0612 | 1554 | Main relay fault | The main relay voltage sense input reads more than 3V below battery voltage, 0.5s after the relay was commanded on. Check the relay, its fuse, and the wiring to the ECU's main relay feed |
| P0642 | 1602 | 5V sensor supply below 4.75V | A sensor is overloading or shorting the 5V rail. Unplug sensors one at a time to find it. Note that sensor checking is suspended while this is set |
| P0643 | 1603 | 5V sensor supply above 5.25V | ECU internal regulator problem, or something back-feeding the 5V rail |
| P0652 | 1618 | Second 5V sensor supply low | As P0642, for boards with a second sensor supply (Proteus) |
| P2900 | 10496 | Wideband controller 1 fault | The controller is reporting a fault of its own. The console message names it — usually sensor heater, sensor open, or overheating |
| P2901 | 10497 | Wideband controller 2 fault | As P2900 |
| P2902 | 10498 | Wideband controller firmware too old | Update the wideband controller's firmware to match this FOME build |

P2900–P2902 are FOME-specific codes, not standard OBD codes — a generic scan tool will not have a description for them.

## Configuration errors

These are *fatal* — the ECU refuses to run the engine and TunerStudio shows a critical error banner with a message explaining the problem. They mean the tune is wrong, not that hardware failed. Fix the setting named in the message and reboot.

| Code | Dec | Meaning |
|---|---:|---|
| P0090 | 144 | Injector compensation is set to use a fuel pressure sensor, but no sensor is configured |
| P0111 | 273 | Thermistor calibration points are not in ascending temperature order |
| P0121 | 289 | Throttle/pedal configuration problem — open and closed calibration voltages too close together, a redundant pair that isn't actually redundant, both channels of a "redundant" pair wired to one sensor, or a failed ETB autotune |
| P0606 | 1542 | General ECU fault. Used for internal assertion failures and for prompting a power cycle after applying a preset. The console message says what happened |
| P0638 | 1592 | ETB startup position was more than 5% away from the configured neutral position. Check for a stuck throttle plate, a wrong `etbNeutralPosition`, or bad TPS calibration |
| P2158 | 8536 | An invalid CAN DBC was selected for CAN vehicle speed input |

## Internal codes (6000 and above)

Codes numbered 6000 and up are FOME internal diagnostics, not OBD codes. They aren't sent over CAN and they're rarely actionable — they indicate either a firmware bug or a configuration so far out of range that the firmware couldn't cope.

If you see one, the TunerStudio console message next to it is the useful part. Report the code together with that message and your tune on the [Discord](https://discord.gg/GXPEbcM) `#firmware`
channel.

The full list is in
[`firmware/controllers/algo/obd_error_codes.h`](https://github.com/FOME-Tech/fome-fw/blob/master/firmware/controllers/algo/obd_error_codes.h).

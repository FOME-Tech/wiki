# Turbo Speed

FOME can read the speed of a turbocharger from a speed sensor on the compressor, and report it in RPM. The turbo speed is for information only. No engine control feature uses it, but it is useful in logs for matching a turbo, and can drive a general purpose PWM output or a Lua script.

Settings are under **Sensors > Misc sensors**.

## How it works

The sensor gives a pulse train, one pulse per blade pass or per target on the shaft. FOME counts the falling edge of each pulse and measures the time between edges to get a frequency. It multiplies that by **Turbo Speed Multiplier** and by 60 to get RPM. The result is smoothed by a filter.

The reading only updates as pulses arrive. If no pulse arrives for 500 ms the reading becomes invalid, so a stopped turbo shows 0.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Turbo Speed Sensor | - | Input pin the sensor is wired to. Leave unset if there is no sensor |
| Turbo Speed Multiplier | mult | Shaft revolutions per input pulse |
| turbochargerFilter | - | Smoothing of the reading. Smaller values smooth more. Found under **Controller > Experimental/Broken** |

### Turbo Speed Multiplier

Set this to the number of turbo shaft revolutions for each pulse. For a sensor that gives 4 pulses per revolution, enter 0.25.

### turbochargerFilter

Values are limited to between 0.001 and 0.35 inside the ECU. The reading is averaged over about 1 divided by this many pulses, so the default of 0.01 is roughly 100 pulses.

## Setup

1. Choose the input pin in **Turbo Speed Sensor**. The input counts falling edges, so the signal must be a clean digital pulse train.
2. Set **Turbo Speed Multiplier** from the pulses per revolution.
3. Burn, and check the reading against a known speed, if you have one.

## Checking it works

The gauge is **Turbocharger Speed**, and the log channel is the same. Both are in RPM, at 10 RPM resolution, and the gauge reads up to 300,000 RPM.

- With the engine off it should read 0.
- With the engine running it should rise with boost.

## If it fails

There is no fault code. If the input isn't configured, there are no pulses for 500 ms, or the signal is lost, the reading is invalid. **Turbocharger Speed** reads 0, general purpose PWM outputs using **Turbo speed** as an axis use their error duty, and the reading is nil in Lua. Nothing else depends on it.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Always 0 | No pin chosen, sensor not connected, or the signal isn't a clean digital pulse train |
| Reads a multiple or fraction of the correct speed | Wrong **Turbo Speed Multiplier**, or noise causing extra edges |
| Reading jumps around | Noisy signal, or the filter value is too high |

## Related

- [Boost Control](/Basic-Features/Boost-Control)

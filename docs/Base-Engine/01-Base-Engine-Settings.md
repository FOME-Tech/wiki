# Base Engine Settings

This is the first dialog to fill in on a new tune. It describes the engine to the ECU: how large it is, how many cylinders it has and in what order they fire. Fuel and ignition calculations are built on these values, so set them before you touch anything else.

Settings are under **Base Engine > Base engine**. The **Controller > Popular vehicles** menu, covered at the end of this page, loads a whole preset instead.

## How it works

FOME has no separate "number of cylinders" setting. The cylinder count comes from the **Firing order** you pick, so choosing a 6-cylinder order makes the ECU a 6-cylinder ECU. Every per-cylinder menu and output in TunerStudio follows from it.

The **Displacement** is used in the air mass calculation. For each cylinder, the ECU works out how much air the engine could hold at the current manifold pressure and charge temperature, and then scales that by the VE table. This applies to every **Fuel strategy**, not just speed density: Alpha-N uses the same calculation at atmospheric pressure, and the MAF load calculation compares the measured air to a full cylinder filling. The same displacement is used for the throttle model's estimate of maximum engine airflow. Fuel mass is therefore proportional to displacement multiplied by VE, so if you change the displacement later, the VE table needs retuning by the same ratio.

The fields in the two metadata groups and **Vehicle weight** are not used by the ECU's control logic.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Displacement | L | Total displacement of all cylinders together, used in the air mass calculation |
| Firing order | - | Firing order of the engine, which also sets the cylinder count (see [Firing Order](/Base-Engine/Firing-Order)) |
| Vehicle weight | kg | For reference only |
| Engine Make | - | Free text, for example BMW, GM or Chevrolet |
| Manufacturer Engine Code | - | Free text, for example LS1 or NB2 |
| Vehicle Name | - | Free text. Should be unique between your vehicles |
| Compression Ratio | CR | For reference only |
| Forced Induction? | - | Whether the engine has a turbo or supercharger. For reference only |
| Fuel strategy | - | How the ECU works out the air mass in each cylinder (see below) |

### Displacement

Enter the total displacement of the engine in litres, for example 1.8 for a 1.8 L four. Do not enter the size of one cylinder. A displacement that is too small or too large doesn't cause any fault. It simply makes the base fuel wrong by the same proportion, which the VE table then has to absorb.

### Metadata fields

**Engine Make**, **Manufacturer Engine Code**, **Vehicle Name**, **Compression Ratio**, **Forced Induction?** and **Vehicle weight** are stored in the tune so that it can be identified and shared. The make, code and name are used to describe the tune on the FOME tunes website. None of them changes how the engine runs. Filling them in is worthwhile if you share your tune, because it makes it findable.

### Fuel strategy

This chooses where the air mass comes from.

- **Speed Density**: calculated from the MAP sensor, the charge temperature and the VE table. This is the usual choice.
- **MAF Air Charge**: measured by a mass air flow sensor.
- **Alpha-N**: calculated from throttle position and the VE table, with no MAP sensor needed.
- **Lua**: a Lua script supplies the air mass.

See [How to pick a fuel method](/Intro-Start-Here/Which-Fuel-Method-For-Me) for help choosing. With **Alpha-N**, the ECU can't calculate fuel if the throttle position sensor has failed, since it has nothing else to work from.

## Setup

1. Set **Firing order** to the order specified by the engine's manufacturer. See [Firing Order](/Base-Engine/Firing-Order).
2. Enter **Displacement** in litres for the whole engine.
3. Pick the **Fuel strategy** that matches the sensors you have fitted.
4. Optionally fill in the metadata fields.
5. Burn the tune.

## Popular vehicles

**Controller > Popular vehicles** has a button for each preset available for your board. The list depends on the board the firmware was built for.

:::warning
Pressing a preset button replaces your **entire** tune. The ECU wipes all of its stored settings, including tables, calibrations and pin assignments, and then loads the board defaults followed by the preset's values. The result is saved to the ECU immediately, and it can't be undone. Save your current tune to your computer first.
:::

After the preset is applied, the ECU reports a fault asking you to close TunerStudio, power cycle the ECU and reconnect. This is expected. The new settings are loaded after the power cycle.

A preset is a starting point. It holds the settings the preset's author used for that engine and trigger, which gets you much closer to a running engine than defaults, but it will not match your engine's injectors, fuel, camshafts or sensors exactly. Check each of the dialogs in the setup order below, and expect to tune it. For tunes made by other FOME users, see [Where to Find Tunes](/Intro-Start-Here/Where-to-Find-Tunes).

## Next steps

1. [Firing Order](/Base-Engine/Firing-Order)
2. [Trigger Setup](/Base-Engine/Trigger/Trigger-Setup)
3. The sensor pages, starting with [Coolant Temperature](/Sensors-And-Gauges/Temperature-Sensors/CLT)

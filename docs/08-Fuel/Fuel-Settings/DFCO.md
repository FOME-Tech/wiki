# Deceleration Fuel Cutoff

Deceleration fuel cutoff (DFCO) stops injecting fuel while the engine is being driven by the car's momentum with your foot off the throttle. It saves fuel and helps prevent backfires on overrun. Fuel returns before the engine drops to idle, so it doesn't stall.

Settings are under **Fuel > Deceleration fuel cutoff (DFCO)**. If you pick the table option for the MAP threshold, the curve is under **Fuel > DFCO MAP to RPM threshold**.

## How it works

DFCO is on and the injectors are cut when all of these are true:

- The engine is running (not cranking).
- Throttle (or pedal position, with an electronic throttle) is below **Cut fuel below TPS**.
- Coolant temperature is above **No cut below CLT**.
- If a MAP sensor is configured, MAP is below the threshold (see below).
- If **Disable fuel cut on clutch** is on and a clutch switch is configured, the clutch is not pressed.
- Engine speed is above **RPM cut fuel above**.
- Vehicle speed is above **Vehicle speed cut above**, unless the vehicle speed check is turned off (see below).

Once active, DFCO ends when the throttle, coolant, MAP or clutch condition stops being met, when engine speed falls below **RPM restore fuel below**, or when vehicle speed falls below **Vehicle speed restore below**. Between the "cut above" and "restore below" values nothing changes, which gives the hysteresis that stops fuel cutting in and out around a single value.

If **Fuel cut delay** is set, the conditions must hold for that long before fuel is actually cut. If they stop being met during the delay, the timer starts again.

Opening the throttle ends DFCO straight away, whatever the RPM.

While DFCO is active, ignition timing is retarded by **Ignition retard during cut**. When fuel returns, the retard is removed gradually over **After cut timing ramp-in time**. Closed loop fuel correction and the lambda protection check are paused for **Inhibit closed loop fuel after cut** after the cut ends.

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Enable Coasting Fuel Cutoff | - | Master enable |
| Disable fuel cut on clutch | - | Don't cut fuel while the clutch is pressed. Only shown when a clutch switch input is configured |
| No cut below CLT | C | No DFCO while coolant is at or below this temperature |
| RPM cut fuel above | rpm | Engine speed that must be exceeded to start cutting |
| RPM restore fuel below | rpm | Fuel returns when engine speed falls below this |
| Vehicle speed cut above | kph | Vehicle speed that must be reached to start cutting |
| Vehicle speed restore below | kph | Fuel returns when vehicle speed falls below this |
| Cut fuel below TPS | % | DFCO only when throttle or pedal is below this |
| Cut fuel below MAP mode | - | **Fixed** uses one MAP value, **Table** varies it with RPM |
| Cut fuel below MAP | kPa | Fixed MAP threshold. Shown in Fixed mode |
| Fuel cut delay | sec | How long conditions must hold before fuel is cut. 0 cuts immediately |
| Inhibit closed loop fuel after cut | sec | Pause closed loop fuel correction for this long after a cut |
| Ignition retard during cut | deg | Timing retard while cut |
| After cut timing ramp-in time | sec | Time to return to normal timing once fuel is restored |

### MAP threshold

With a MAP sensor, DFCO is only allowed when manifold pressure is low, meaning the throttle is closed and the engine is pulling vacuum. The cut starts when MAP is more than 1 kPa below the threshold and stops when it rises more than 1 kPa above it.

In **Table** mode, the threshold comes from the **DFCO RPM MAP Correction** curve, which is interpolated by engine speed. Use it when the engine makes less vacuum at low RPM, so a higher threshold is needed there than at high RPM. Without a MAP sensor configured, the MAP condition is ignored.

### Vehicle speed

If either **Vehicle speed cut above** or **Vehicle speed restore below** is 0, vehicle speed is ignored. Otherwise a [vehicle speed sensor](/Sensors-And-Gauges/General-Sensors/VSS) is required. Vehicle speed that is missing reads as 0 kph, so DFCO never activates.

Vehicle speed limits help in low gears, where cutting fuel at low road speed makes the car jerk.

### Clutch

When **Disable fuel cut on clutch** is on, DFCO is blocked while the clutch is pressed, which helps avoid knock during shifts. It has an effect only if a [clutch](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch) input is configured.

## Setup

1. Set **Enable Coasting Fuel Cutoff**.
2. Choose a TPS limit just above your closed-throttle reading, for example 2 to 5 %.
3. Set **No cut below CLT** so the engine is fully warm before cutting, around 60 °C is typical.
4. Set **RPM cut fuel above** comfortably above idle, and **RPM restore fuel below** a few hundred RPM lower, but still above idle so fuel returns before the engine falls to idle speed.
5. Choose a MAP threshold. Closed-throttle overrun typically pulls well under 40 kPa, so start around 30 kPa. Raise it if DFCO never engages.
6. Optional: set vehicle speed limits to stop DFCO in low gears, a fuel cut delay to avoid cutting on brief lifts, and a small timing retard to soften the return of fuel.
7. Set **Inhibit closed loop fuel after cut** a bit longer than it takes the mixture to settle after fuel returns, so closed loop doesn't react to the lean transient.

## Checking it works

Watch the **Decel fuel cut** indicator (log channel **DFCO: Active**), along with RPM, TPS, CLT and MAP. It shows active only once the fuel cut delay has passed. Lift off at speed: the indicator should light and fuel should be cut, then return as RPM falls through the restore value. On a wideband, the reading goes very lean during the cut. That is normal.

## If it fails

DFCO is inhibited, with fuel injected normally, if any of these is true:

- The throttle or pedal position sensor has failed.
- The coolant sensor has failed. See [CLT](/Sensors-And-Gauges/Temperature-Sensors/CLT).
- A MAP sensor is configured but has failed. See [MAP](/Sensors-And-Gauges/Pressure-Sensors/MAP). With no MAP sensor configured, the MAP condition is skipped.
- Vehicle speed limits are set but the vehicle speed signal is missing.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Never activates | Sensor failure, vehicle speed limit set with no speed signal, MAP threshold too low, or CLT below the limit |
| Cuts in and out repeatedly | RPM cut and restore values too close together, or MAP threshold near the real overrun MAP |
| Jerky when fuel returns | Restore RPM too close to idle. Add some timing retard and ramp-in time |
| Pops and rumbles from the exhaust | Fuel cut delay of 0. Try a short delay |
| Fuel trims go wrong after decel | **Inhibit closed loop fuel after cut** too short |

## Related

- [Closed Loop Fuel](/Advanced-Features/Fuel-Related/Closed-Loop-Fuel)
- [Clutch](/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch)
- [Throttle Position Sensor](/Sensors-And-Gauges/General-Sensors/TPS)

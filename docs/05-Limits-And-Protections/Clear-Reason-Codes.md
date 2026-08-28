# FOME Fuel and Ignition Cut Codes ("Clear Reason")

The log channels `Fuel: Cut Code` and `Ign: Cut Code` indicate why fuel or spark is being cut using one of the codes below. These are not necessarily errors, but just indicate why the particular cut was performed.

|Code|`enum ClearReason`|TunerStudio Text|Description|
|---:|---|---|---|
|0|`None`|None|No fuel/ignition cut active|
|1|`Fatal`|Fatal Error|Disabled due to fatal error|
|2|`Settings`|Setting Disabled|Disabled by setting:`isInjectionEnabled`/`isIgnitionEnabled`|
|3|`HardLimit`|RPM Limit|Disabled by hard (normal) RPM limit:`useCltBasedRpmLimit`/`cltRevLimitRpmBins`/`cltRevLimitRpm`/`rpmHardLimit`/`rpmHardLimitHyst`|
|4|`FaultRevLimit`|Fault RPM Limit|Disabled by (fault) RPM limit|
|5|`BoostCut`|Boost Cut|Disabled by boost cut pressure threshold:`boostCutPressure`|
|6|`OilPressure`|Oil Pressure|Disabled due to low oil pressure after 5 seconds:`minOilPressureAfterStart`|
|7|`StopRequested`|Stop Requested|Disabled due to engine stop request|
|8|`EtbProblem`|ETB Problem|Disabled due to detected ETB jam or control problem|
|9|`LaunchCut`|Launch Control|Disabled by launch control RPM retard condition: `launchRpm`/`launchFuelCutEnable`/`launchSparkCutEnable`/`launchControlEnable`|
|10|`InjectorDutyCycle`|Max Injector Duty|Disabled due to injector duty cycle limits: `maxInjectorDutyInstant`/`maxInjectorDutySustained`/`maxInjectorDutySustainedTimeout`. Resets after falling below 20% duty.|
|11|`FloodClear`|Flood Clear|Disabled to allow flood clear mode: `isCylinderCleanupEnabled` enabled and TPS > 95% while cranking|
|12|`EnginePhase`|Engine Sync|Disabled due to lacking engine-cam sync to avoid non-sync spark on engines with symmetrical crank (NB2, Nissan VQ/MR) or odd firing order (VTwin Harley, Viper)|
|14|`IgnitionOff`|Ignition Off|The ignition switch is turned off|
|15|`Lua`|Lua requested|A Lua script requested a cut|
|17|`LambdaProtection`|Lambda protect|Lambda protection cut to protect the engine. Lambda was leaner than the configured allowed for the current operating condition.| 
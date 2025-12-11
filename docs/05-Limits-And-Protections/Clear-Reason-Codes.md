# FOME Fuel and Ignition Cut Codes ("Clear Reason")

|Code|`enum ClearReason`|TunerStudio Text|Description|
|---:|---|---|---|
|0|`None`|None|no fuel/ignition cut|
|1|`Fatal`|Fatal Error|disabled due to fatal error|
|2|`Settings`|Setting Disabled|disabled by setting:`isInjectionEnabled`/`isIgnitionEnabled`|
|3|`HardLimit`|RPM Limit|disabled by hard (normal) RPM limit:`useCltBasedRpmLimit`/`cltRevLimitRpmBins`/`cltRevLimitRpm`/`rpmHardLimit`/`rpmHardLimitHyst`|
|4|`FaultRevLimit`|Fault RPM Limit|disabled by (fault) RPM limit -- ETB Problem:1500,Fatal Error:0|
|5|`BoostCut`|Boost Cut|disabled by boost cut pressure threshold:`boostCutPressure`|
|6|`OilPressure`|Oil Pressure|disabled due to low oil pressure after 5 seconds:`minOilPressureAfterStart`|
|7|`StopRequested`|Stop Requested|disabled due to engine stop|
|8|`EtbProblem`|ETB Problem|disabled due to detected ETB problem ("10 percent-seconds of integral error")--**currently not implemented**|
|9|`LaunchCut`|Launch Control|disabled by launch control RPM retard condition:`launchRpm`/`launchFuelCutEnable`/`launchSparkCutEnable`/`launchControlEnable`|
|10|`InjectorDutyCycle`|Max Injector Duty|disabled due to injector duty cycle limits:`maxInjectorDutyInstant`/`maxInjectorDutySustained`/`maxInjectorDutySustainedTimeout`--resets after falling below 20% duty|
|11|`FloodClear`|Flood Clear|disabled to allow flood clear mode:`isCylinderCleanupEnabled`--TPS>95% while cranking|
|12|`EnginePhase`|Engine Sync|disabled due to lacking engine-cam sync to avoid non-sync spark:`vvtMode[0]`--ex:symmetrical crank (NB2,Nissan VQ/MR),uneven firing order (VTwin Harley)|
|13|`KickStart`|Kick Start|**currently not implemented**|
|14|`IgnitionOff`|Ignition Off|disabled because the ignition is off,

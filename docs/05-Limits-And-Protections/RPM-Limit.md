# Rev limiters  

Rev limiters can be found under _Base Engine > Limits and fallbacks_.

## Hard cuts  

![image](RPM-Limit/revLimitHardCuts.png)

Hard cuts apply when an engine reaches the _RPM hard limit_. In most cases, it is recommended to use fuel cut instead of spark cut.

### Fuel cut  

If _Cut fuel on RPM limit_ is set to __yes__, FOME will stop injecting fuel once the engine reaches the _RPM hard limit_. The engine speed must drop below the _RPM hard limit_ by the number of RPM specified in _Hard limit hysteresis_ before fuel injection is resumed.

### Spark cut  

If _Cut spark on RPM limit_ is set to __yes__, FOME will stop firing the ignition coil(s) once the engine reaches the _RPM hard limit_. The engine speed must drop below the _RPM hard limit_ by the number of RPM specified in _Hard limit hysteresis_ before ignition is resumed.

:::danger  

If _Cut fuel on RPM limit_ is set to __no__ then fuel will continue to be injected during the spark cut. This can cause a build-up of unburned fuel in the exhaust system which may ignite when ignition resumes and can cause damage to the engine and exhaust system.

:::

:::warning

Cutting spark can lead to engine valvetrain damage due to the immediate reduction in torque. It is recommended to use fuel cut instead of spark cut in most cases.

:::

### Both cut  

Both fuel cut and spark cut can be used together. This reduces the risk of unburned fuel in the exhaust when using spark cut, but the risk of valvetrain damage still applies. 

## Soft limiting  

### Electronic Throttle Limiting  

![image](RPM-Limit/ElectronicThrottleLimiting.png)

Engines equipped with an Electronic Throttle Body (ETB) can utilize Electronic Throttle Limiting. This will smoothly close the throttle starting at the _Soft limiter start_ engine speed and fully close it once the engine speed has increased by the number of RPM defined in _Soft limiter range_.

For example, if _Soft limiter start_ is 6000 RPM and _Soft limiter range_ is 200 RPM, the maximum ETB position possible at 6100 RPM is 50%, and at 6200 RPM the electronic throttle will be fully closed even if the accelerator pedal is commanding a larger opening.

# Speed Density Strategy

> Engine Load is a function of MAP, VE and target AFR
Out of the fuelling strategies, speed density is the most commonly used in modified cars and ECU tuning.Speed density fuelling is an engine management strategy that estimates the amount of air entering the engine using engine speed (RPM), manifold absolute pressure (MAP), and intake air temperature. Instead of directly measuring airflow like a MAF sensor, the ECU calculates air mass based on a volumetric efficiency (VE) model of the engine. This approach is simple, fast to respond, and works well with aggressive camshafts or setups where MAF sensors are impractical. However, it relies heavily on accurate VE tuning to maintain precise fueling across all operating conditions.

Information on the equations used for speed density tuning can be found [at the following link explaining it](https://www.mathworks.com/help/autoblks/ug/compression-ignition-engine-speed-density-breathing-model.html).

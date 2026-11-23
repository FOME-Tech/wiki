# How to pick a fuel method

The best fuel method for you, will depend on a few factors. Which boil down to, available sensors for load measuring or estimation. (MAP, MAF, TPS). And what does your particular Air Induction setup looks like (Single Throttle Body Naturally Aspirated, Open trumpets ITB, Forced Induction.)

An over-simplified way to quickly choose is this 

- [Alpha N](/Fuel/Fuel-Algorithms/AlphaN) Works best for scenarios when you have a Naturally Aspirated engine and your only available or most reliable source of load information is the TPS. (i.e. NA Cars without MAP or MAF sensor, Cars with ITBs and/or high overlap camfshafts where vacuum behaves non linearly)

- [Speed Density](/Fuel/Fuel-Algorithms/SD) Is the most popular fuel algorithm, widely supported by aftermarket ecu's. It requires a MAP sensor. And works very well for single Throttle Body, common plenum naturally aspirated engines and boosted applications. 

- [MAF Air Charge](/Fuel/Fuel-Algorithms/MAF). The underdog in the tuning scene. But by far one of the most precise ways of calculating fueling for an engine. Requires a MAF sensor installed on the Intake tubing (or Turbo Inlet on turbo cars) and known calibration curve (MAF Transfer Function) for said sensor.

- [LUA](/Fuel/Fuel-Algorithms/Lua) - If you feel brave enough to control the fueling through the FOME console using LUA, this is the option to do so.
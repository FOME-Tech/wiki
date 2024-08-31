# Wall Wetting Based Acceleration Compensation

## Wall Wetting (alpha version)

- __Wall fueling model type__: _Basic (constants)_ use the _Evaporation Time Constant_ and _Added to Wall Coefficient_ values for Beta and Tau respectively, _Advanced (tables)_ uses the _Wall Wetting AE Evaporation Time_ and _Wall Weeting AE Impact Fraction_ tables to calculate the Beta and Tau values respectively.

### Basic

- __Evaporation Time Constant / Tau__: Length of time in seconds the deposited wall fuel takes to dissipate after the start of acceleration. _wwaeTau_
- __Added to Wall Coeff / beta__: Fractional representation of fuel settling on the intake/port walls. 0 = No fuel settling on port walls 1 = All the fuel settling on port walls. Setting this to 0 disables the wall wetting enrichment. _wwaeBeta_

### Advanced

#### Wall wetting AE evaporation time

Used to calculate the Tau value (_wwaeTau_) of wall-wetting function.

- __Evap time vs. CLT__: Sets the base evaporation time based on CLT. Warmer engines will have a lower evaporation time.
- __Evap time vs. MAP__: Sets the multiplier of the base evaporation time based on MAP. Lower MAP values will have a lower multiplier (shorter evaporation time), higher MAP values will have a higher multiplier (longer evaporation time).

#### Wall wetting AE impact fraction

Used to calculate the Beta value (_wwaeBeta_) of wall-wetting function.

- __Impact fraction vs. CLT__: Sets the base impact fraction based on CLT. Colder engines will have a higher impact fraction (more fuel sticks to the walls), warmer engines will have a lower fraction (more fuel sucked into the intake). Values range from 0 to 1.
- __Impact fraction vs. MAP__: Sets the multiplier of the base impact fraction based on MAP. Lower MAP values will have a lower multiplier (more fuel sucked into the intake, higher MAP values will have a higher multiplier (more fuel sticks to the walls).

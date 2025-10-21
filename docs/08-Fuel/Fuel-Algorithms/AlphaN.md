
# Alpha-N Strategy

## Introduction

Alpha-N is a fuel strategy that implies calculating engine load using the TPS (Throttle Position Sensor). Initially it was a fallback mode built into BMW engine management units, used only if the MAF (Mass Air-Flow) sensor had a failure or was missing. Nowadays, it can be a suitable method for estimating load and tuning engines with certain setups, and even better if combined with other strategies we will discuss further.

## How does it work?
![](https://github.com/user-attachments/assets/a14d036c-af46-45d7-bb8d-dfef62e3c413)

In essence, this fueling method is quite similar to Speed Density, you're equally presented with both a VE table and a target AFR table. Where X axis means RPM, Y Axis means Load and the cell value means VE (or target AFR on said table). The main difference is that the Y Axis will represent **Throttle Position** instead of MAP (Manifold Air Pressure). 

## Why should I use this instead of Speed Density or MAF Air Charge?

Speed Density works best on engines where vacuum is relatively linear when compared to the load the engine is facing. This is almost always the case on naturally aspirated engines with stock to mild aftermarket camshafts. And a single throttle body manifold with a plenum.

On heavily modified N/A engines, specifically ones fitted with really long duration camshafts, a big throttle body or **ITBs (Individual Throttle Bodies)** specially, you will find that the MAP sensor readings are non linear and mid to high throttle openings can make them jump to almost atmospheric pressure. Which can lead to scenarios where you set your fueling and AFRs right at a certain vacuum-rpm only to find out later that under that same group of cells its richer or leaner than what you desired. Engine load changed and therefore the airmass entering the engine, but the vacuum at the intake runners/plenum/vacuum block didn't change as much. 

In these cases, actually the most suitable strategy is actually using MAF Air Charge. But for this method to work, you require an enclosed intake manifold with a common plenum and intake tubing with the MAF sensor in  place measuring **all** the air entering the engine through the intake. But, What if you plan on running open trumpets/velocity stacks on those ITBS? 

That's when Alpha-N comes handy.

## Any downsides? 

While estimating load based on TPS can be useful for mid-high loads. Idle and events where the throttle isn't pressed aren't taken into consideration in alpha N, and will need to get compensated in other ways. _See, blend tables._

## How do I set it up?

  1. On your Tuner Studio project, go to Base Engine Settings.
  
    ![](https://github.com/user-attachments/assets/41982508-bbba-425e-9859-8296f233548d)
  
  2. Under fuel strtegy, select Alpha-N.
  
    ![](https://github.com/user-attachments/assets/74ed753a-b30a-4c06-9eae-bf31c02066d1)

  3. Now, **all** the tables where you have Load as a Y axis, will correspond to Throttle Position, except for manually set Y-Axis overrides on specific tables.
    _As of right now (Feb. 2025 Firmware), certain tables will erraticaly show "load kpa" as its unit on tunerstudio but they will be based on Throttle Position_ 
  
  4. Scale your tables accordingly. Starting from 0% TPS to 100% TPS. Keep in mind that low throttle openings will have the most air diference, compared to high throttle oppenings. Ideally will need more resolution at the lower values, and less resolution at higher TPS values.
    
    ![](https://github.com/user-attachments/assets/4d28635c-2260-4d19-9c76-047d39633044)

  5. If your cranking fuel amount is set to table instead of fixed, take it into consideration. Prefferably by switching to fixed fueling.  Or alternatively, compensating in the CLT Cranking Multiplier for the Engine Off cell position difference in values (Top Left on MAP vs Bottom Left on TPS), **keep in mind** choosing the latter method will cause fuel to be multiplied **EXPONENTIALLY** if you happen to press the throttle whle cranking the engine.

  6. Finally, check that your cell values make sense and you're set up to start tuning!

## Bonus: Using blend Tables to combine Alpha N + MAP (Hybrid Approach)

This basically gives you the best of both worlds. MAP corrections for events where throttle isn't pressed (idle changes, Cooling Fan On, A/C, heavy alternator electrical load), deceleration  or  low throttle openings where you feel like MAP can help to correct fueling. And TPS for everything else. 

1. In the fuel menu, go to VE Blend Tables > VE Blend 1 Bias
  
  ![](https://github.com/user-attachments/assets/2e4e687c-6e0b-4b5a-8851-7993946f919d)

2. Select a blend paramter. (In this example we want the blend table to be active at all times, so i'll choose Coolant Temp, and give it a 100% blend bias on all cells.

3. Select MAP as your Y-axis override. (As the name says, this will make the Y-Axis on the blend table correspond to MAP sensor values)
  
   ![](https://github.com/user-attachments/assets/03ff4dd6-408f-4c43-98d7-5290da0ccc7c)
   
4.  Go to blend table 1, and set all cells to 0. This is so that it doesnt make any changes to the _current VE. 
   
    ![](https://github.com/user-attachments/assets/184191bb-f54b-4394-b8e5-a8e79e0b90b8)
    
5. Scale it accordingly and tune as you see fit. (Turn on the A/C and add fuel as you see fit, slowly let off the clutch and add fuel if it leans out, go into overrun/coassting and remove fuel if needed.)

8. Profit.

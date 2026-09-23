# Ignition Cylinder Trim

Every cylinder on an engine will have differences in the temperature, shape and by extension, resistance to knock. FOME ECUs have the ability to detect which cylinder is knocking and the ignition cylinder trim tables allow you to put that data to some use.

Looking through data logs of your car, observe the amount of engine knock; where it occurs, when it occurs, and on what cylinders. If you notice a pattern with a particular cylinder or group of cylinders misfiring more than the others, some trim can be used to retard the ignition timing on that particular cylinder.

This table has the same X and Y axis as the main ignition table however the cell values are added onto the ignition table so a value of -1 would subtract one from the corresponding cell in the main ignition table.
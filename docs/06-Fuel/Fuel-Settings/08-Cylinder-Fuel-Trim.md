# Individual Cylinder Trim  

Every cylinder is slightly different from one another. Individual cylinder fuel trim tables allow the ECU to adjust fueling on a per-cylinder basis to correct for airflow and combustion differences between cylinders. These differences can be caused by intake manifold design, injector variation, or uneven cooling. By applying small fuel corrections to each cylinder, the system improves air–fuel balance, combustion stability, and overall engine smoothness. This results in more consistent power delivery and reduced knock and emissions.

## How to determine which cylinder needs trimming

Which cylinder needs trimming is identified by comparing how evenly each cylinder is combusting relative to the others. Common ways to determine this include:

- Exhaust gas temperature (EGT) per cylinder: A hotter cylinder is often running lean; a cooler one may be rich or misfiring. Connecting EGT probes to each runner will allow for comparison between the cylinders.

- Wideband O2 with cylinder balancing / sequential cutoff: Momentarily disabling or leaning each cylinder and observing RPM or lambda change—cylinders that cause a larger change are contributing more and may need trimming. For example, richening one cylinder by 10% on a 4-cyl engine should in theory result in a 2.5% overall (10%/4 cylinders) WBO2 reading increase. If it results in less of a percentage change, that cylinder is likely running lean and needs a slight trim increase.

- Knock sensor data per cylinder: Cylinders that knock earlier are often leaner or more efficient and may need additional fuel. FOME logs the knock data for each cylinder so this can be a useful way of determining if one cylinder needs slightly more fuel added.

- Spark plug reading: Differences in color or deposits indicate relative richness or leanness.

- Torque contribution tests: some ECUs or dynos can measure how much torque drops when each cylinder is altered, revealing imbalance.

The goal is to make all cylinders contribute as evenly as possible under the same operating conditions, then apply small fuel trims to correct the outliers.
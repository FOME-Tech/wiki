---
sidebar_position: 10
---

# Guide to Tuning the ETB and VVT PIDs

Here we will discuss the ETB and VVT PID controls and some give techniques for tuning these loops.

$$
u(t) = K_\text{p}\left(e(t) + \frac{1}{T_\text{i}} \int_0^t e(\tau) \,\mathrm{d}\tau + T_\text{d}
\frac{\mathrm{d}e(t)}{\mathrm{d}t}\right)
$$

TODO: Write something here about the ETB setup and the VVT PIDs

More details about ETB PID control are found in the Advanced Features section's page [ETB
PID](/Advanced-Features/ETB/ETB-PID.md).

More details about VVT PID control are found in the Advanced Features section's page [VVT PID Control](/Advanced-Features/Variable-Cam-Timing/VVT-PID.md).

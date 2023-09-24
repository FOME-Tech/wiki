# Guide to Tuning the ETB and VVT PIDs

Let's discuss the ETB and VVT PID controls and some give techniques for tuning these loops.

$$
u(t) = K_\text{p} e(t) + K_\text{i} \int_0^t e(\tau) \,\mathrm{d}\tau + K_\text{d} \frac{\mathrm{d}e(t)}{\mathrm{d}t}
$$

## More Details

Wikipedia's PID Controller page's [operational description](https://en.wikipedia.org/wiki/PID_controller#Fundamental_operation).

More details about ETB PID control are found in the Advanced Features section's page [ETB PID and Autotune](/Advanced-Features/ETB/ETB-PID).

More details about VVT PID control are found in the Advanced Features section's page [VVT PID Control](/Advanced-Features/Variable-Cam-Timing/VVT-PID).

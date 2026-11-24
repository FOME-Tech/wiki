# Fuel Pump Control

FOME can switch the fuel pump relay. The pump runs for a short prime when the ignition comes on, then keeps running while the engine is turning, and stops soon after the engine stops.

Settings are under **Outputs > Fuel Pump**.

## How it works

The pump is on only while the ignition is on (the battery voltage input above 5 V) and one of these is true:

- The ignition just came on and the **Prime duration** has not run out.
- The engine has moved recently. This is judged from crank trigger edges, not RPM, so the pump runs during cranking before the ECU has synchronised.

When the engine stops turning, the pump stops after a short delay. The delay is at least 0.1 seconds and scales with the trigger wheel. It is never more than 2.4 seconds. Turning the ignition off turns the pump off immediately, once the ECU has seen the voltage stay low for 0.2 seconds.

The **Fuel pump on** and **Fuel pump off** buttons in Bench Test override this. See [Bench Test](/Basic-Features/Bench-Test).

## Settings

| Setting | Units | Description |
| --- | --- | --- |
| Output | - | Pin that drives the fuel pump relay |
| Output mode | - | Polarity and drive type of the output |
| Prime duration | seconds | How long the pump runs when the ignition comes on. 0 disables the prime |

## Setup

1. Set **Output** to the pin wired to the fuel pump relay, and **Output mode** to match the driver.
2. Set **Prime duration** long enough for the fuel rail to reach pressure. A couple of seconds is typical.
3. Burn, switch the ignition on, and listen for the pump priming.

## Checking it works

The **Fuel pump on** indicator is lit whenever the pump is commanded on. Switch the ignition on and it should light for the prime time and go out. It should light again during cranking and stay lit while the engine runs.

## If it fails

- Stalling or losing the crank signal stops the pump within the delay above. It then restarts as soon as trigger edges return, for example on the next crank.
- The prime only happens when the ignition goes from off to on. It doesn't repeat on its own.
- The **Fuel pump off** button only cancels a forced on. It does not hold the pump off while the engine is running.

:::note
The pump stops whenever the ignition input drops. If your ignition voltage input is faulty, the pump will not run.
:::

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Pump never runs | **Output** not set, wrong **Output mode**, or battery voltage input not reading |
| Pump primes but stops during cranking | Crank signal not being seen, check the trigger |
| Pump runs only during prime | Same cause as above |
| No prime on key-on | **Prime duration** is 0 |

## Related

- [Main Relay](/Basic-Features/Main-Relay)
- [Bench Test](/Basic-Features/Bench-Test)

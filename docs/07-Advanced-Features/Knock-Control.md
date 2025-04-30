# Knock Detection Setup Guide

## Basic Setup Process

1. In TunerStudio, navigate to the ignition settings and set up your cylinder mappings
2. Enter a known safe timing map (conservative timing values)
3. Drive the vehicle at different loads while collecting data
4. Listen carefully to ensure there's no audible knock during data collection
5. Set your knock threshold just above the normal noise levels

## Recommended Threshold Settings

A good starting point is setting your threshold approximately 4dB above normal engine sound levels. This provides enough margin to avoid false positives while still detecting actual knock events.

## Interpreting Knock Data

Knock appears as sharp spikes in the time domain. Since knock is a stochastic process, you won't necessarily get the same knock on every cycle. Look for patterns such as:

- Correlation between knock level and throttle position at constant RPM
- Spikes in knock level that correspond to specific load conditions
- Cylinder-specific knock patterns

Here's an example of sharp spikes which are knock
![knock time domain](./knock-time.png)

The scatter plot is also useful. Knock generally shows up as outliers outside of the normal noise envelope, especially at high load
![sad pistons](./knock-example-2.webp)

Contrast the image above to a normal noise scatter plot (no knock), which might look like this
![no knock](./un-knock-example.png)


## Reapply Rate Configuration

Setting the reapply rate can be tricky:
- Low load conditions need faster reapply rates
- High load conditions need slower reapply rates

Some users implement a workaround by using zeros in the bottom line of the max knock retard table.

## Hardware Connections

The knock sensor is essentially a piezo microphone element:
- For testing/analysis, you can attach a 3.5mm connector to your knock sensor wires and plug into a laptop
- The knock input on ECUs (like Proteus) is very different from a normal analog input
- The sensor connection is balanced, similar to audio equipment principles

## Common Issues & Debugging

1. **No Timing Retard**: Ensure your max knock retard table isn't all zeros
2. **False Positives**: If you're getting knock detection without audible knock, recalibrate your threshold
3. **Noise Filtering**: In TunerStudio, set filter level to 2 to clean up MAP signals and reduce noise
4. **Rich Mixtures**: Beyond 0.8 lambda, additional fuel enrichment won't help with knock mitigation

## Advanced Analysis

For deeper knock analysis, consider using a spectrogram to visualize the frequency characteristics of engine noise and knock events.

_Remember: When setting up knock detection, it's prudent to start with conservative timing and gradually optimize rather than risking engine damage._

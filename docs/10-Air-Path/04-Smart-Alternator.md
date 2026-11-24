# Smart Alternator Control  

FOME ECUs have the ability to control the alternator voltage which is useful for some vehicles like the NB2 Miata where the voltage is controlled through the ECU rather than directly on the alternator (like the NA Miata).

## How to Tune the Alternator Control

As a quick warning, mis-tuning the battery voltage controller can lead to voltage spikes or droops and damage to the vehicle electronics if not done correctly. If you don't know what you're doing, either use the base map provided for your vehicle or take it slowly with the controller setting configuration.

If you are not familiar with PID controllers, it is recommended to familiarize yourself with their inter-workings. RC Model Reviews has a fantastic video on [what PIDs do and how they do it](https://www.youtube.com/watch?v=0vqWyramGy8).

### Basic Setup

Next, under the _Base Engine_ settings, open the _Battery and Alternator Settings_ menu. The vBatt ADC input will need to be set to the analogue to digital (ADC) converter input pin that reads the battery voltage. By right clicking a gauge on the TS dashboard, it will open the gauges menu where the _Battery - VBattGauge_ under _Sensors-Basic_ can be selected. With the car off, measure the voltage at the battery with a multimeter and compare the voltage to the battery voltage gauge. Modify the _Battery Input Divider Coefficient_ until the gauge voltage matches the multimeter voltage.

Under the alternator settings, set _Enabled_ to true and the _Target(Volts)_ to 14-14.2V which is the nominal alternator output voltage when the car is running.

The _Control output_ should be set to ECU pin that controls the alternator duty cycle. The _Control output mode_ should be left at default nominally **unless** you later realize the battery voltage controller is correcting the wrong way in which case change it to default inverted. Open collector is not required unless using a transistor or MOSFET to control the alternator duty cycle input.

The _PWM frequency(Hz)_ should be set to the manufacturer recommended value for the specific alternator. If in doubt, google what other tuners have used.

### PID Tuning

Turn off the car's AC, headlights, fan, and any other high current accessories. In TS, open a high speed logger tab with values for the battery voltage, alternator PID output, error, Pterm, Iterm and Dterm. In the alternator settings, set the _A/C duty adder(%), P factor, I factor, D factor, and Min_ to 0. Set _offset_ to 1-5 and _Max_ to 90. 

Now start the car and watch the battery voltage, it will likely be lower than 14V in which case, increase the _offset_ until ~14V is reached. Now turn on the A/C and increase the _A/C duty cycle adder_ until ~14V is reached. Turn the A/C back off. 

To tune the PIDs, the general idea is to have the P/proportional gain as high as possible without inducing a lot of overshoot then using the D term to damp it and the I term to keep the output voltage tracking the voltage setpoint. This is difficult to achieve in all scenarios as the error and response will vary depending on the engine load. 

To start tuning the P factor, start with a value of 1 and turn on/off the headlights or fans to change the alternator load. Watch the battery voltage and Pterm logs to observe the effect of the proportional gain. Increase the P term until there is less than 0.5V of overshoot and the nominal alternator voltage is starting to oscillate. Next, slowly increase the D factor in increments of 0.1 to damp the proportional gain which should reduce the overshoot and oscillations. Don't increase the D factor too high or it can become too reactive and increase the oscillations. Lastly, increase the I factor until the voltage is able to quickly settle at ~14V when a load is applied or taken off. It is not uncommon for the I factor to be the largest integer, followed by the P term (also in the integer range) then the D factor in the decimal range. If you want to be safer, a lower P factor can be used to induce less voltage overshoot however this will also increase the response time for the controller so it is ideal to find a balance between acceptable amount of overshoot and response time. 

The ideal controller should quickly increase duty cycle when load is applied and settle on a relatively stable value such that there is little fluctuation in the alternator voltage. The voltage range should also stay between 13-15V ideally. This is easier to achieve for the A/C as the controller knows to increase the duty cycle a fixed amount when turned on but is harder to achieve for turning on headlights, fans, or other accessories that don't tell the ECU when they're on. 

After settling on reasonably responsive and well tracking PID values, experiment with difference combinations of accessories turned on/off to test the robustness of the controller in all scenarios. Also observe the response when the engine is revved or the throttle is held at different positions. All of these will change the response of the controller and as long as the controller doesn't spike the voltage largely in all tested conditions and can settle the voltage reasonably quickly, it should be alright.
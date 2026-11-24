# BeerMoneyMotorsports KaN (CAN) Gauge

Product description and purchase link: [BMM KaN Multi Fit CAN Gauge](https://www.beermoneymotorsports.com/products/kan-gauge-for-rusefi).

![image](Pictures/Kan2.png)

The KaN gauge is a multi function, multi fit gauge designed exclusively for Fome ECUs. The gauge has generic mounting options to fit any car and specific mounting solutions to fit into multiple locations on a Miata including the oil pressure gauge hole, an air conditioning vent or into a standard 52mm gauge pod. Data is sent to the gauge via CAN bus communication wires coming from the ECU and the layout of the gauge can be configured wirelessly using its standalone WiFi network.

## Wiring

Open your ECU casing and locate a 12V output, ground, CAN High, and CAN Low pins. Match each of these pins to one of the four corresponding wires on the gauge. For best signal over long distances, twist the pair of CAN lines. The gauge must be powered from the 12V power plug on the gauge circuit board to work correctly, the micro USB port is for re-programming which must also be done while the gauge is powered from 12V.

Snake the pair of CAN wires from your ECU to the gauge mounting location. This can be difficult and a cable snake, solid wire, or patience can help. The gauge can be optionally powered from the ECU with 12V or from the accessory/radio fuze using a piggyback fuze.

To attach the CAN wires to the ECU, they can either be soldered directly to the PCB or fitted to the wiring harness plugs at the correct locations. In either case, check the wiring diagram for your ECU to determine where the CAN pins are.

### Layout Button Setup

The gauge can optionally have a button attached to the wire labelled D2 to cycle through different gauge layouts. The button should be wired to D2 and to GND such that D2 is grounded when the button is pushed.

### Dimmer Setup

The wire labelled A1 on the gauge is the dimmer wire and will dimm the gauge brightness when 12V is applied to it.

## WiFi Configuration

When powered, the gauge will start its own standalone wifi network. In the WiFi settings for your device, connect to this network with a phone or laptop and open your browser of choice. Next find the IP address of your gauge. It should be a number like "192.168.X.XXX" which was included with your gauge purchase. In the browser's web address bar, input this IP address of the device into the browser and go to the web page. 

The web page should detail the gauge settings to allow for customization of the theme and displayed values.

If using multiple gauges, it is reccomended to change the network name of one of them to allow for differentiation.

## Dash Interface Setup

Once connected to the WIFI, the user interface on the gauge can be configured.

## Physical Installation

Several options are available to mount the gauge on a Miata depending on where you like your gauges, how much you like air conditioning, and how much you like removing your dashboard. When ordering the gauge you can opt for the bare PCB and design your own housing, you can select the 52mm housing which fits inside an AC vent or atandard 52mm gauge pod or, you can order the NA/NB cluster mount to go in the oil pressure or coolant gauge locations.

### Oil Pressure/Coolant Gauge Cluster Mounting

These spots inside the dash are by far the most neat and integrated installation spots. If installing a gauge into the oil pressure location, it is recommended to also install an aftermarket oil pressure sensor to the ECU so that the gauge can display oil pressure among other useful variables.

### Air Conditioning Vent Mounting

Another clean installation method is to replace an air conditioning eyeball vent on an NA/NB Miata with a 52mm gauge housing.

### 52mm Gauge Pod Mounting

With the 52mm housing option, the gauge can be mounted into any 52mm gauge pod housing which is the standard size for aftermarket automotive gauges. For Miatas specifically, there are a range of gauge pod mounts fitting to locations like the A pillar, in place of the radio console, on top of the gauge cluster, etc.

### Bare PCB Mounting

Purchasing the gauge as a bare PCB allows you to design your own mounting solution. Mount the gauge anywhere from behind your steering wheel to inside a cup holder! For example, [Joshua Solanes on makerworld has designed his own cluster mount](https://makerworld.com/en/models/437158-kan-gauge-v2-oil-pressure-location#profileId-342358).
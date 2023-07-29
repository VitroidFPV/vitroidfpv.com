---
title: FPV Dictionary
description: Learn all the terms and abbreviations in FPV!
visible: true
category: Guides
author: VitroidFPV
img: /uploads/FPV_Dictionary_Thumbnail.png
date: 2023-07-24T17:32:52.992Z
---

<script>
	import GridBox from "$components/articlesPage/GridBox.svelte";
	import GridItem from "$components/articlesPage/GridItem.svelte";
	import Tablist from "$components/articlesPage/Tablist.svelte";
	import Tab from "$components/articlesPage/Tab.svelte";
	import Admonition from "$components/articlesPage/Admonition.svelte";
</script>

There's a lot of different terms and abbreviations for different things in the hobby. As you may have figured, FPV is a very learning-intensive hobby. This page will help you learn all the terms and abbreviations you (may or may not) need to know to find your way around the hobby.

<Admonition type="info" title="">

The items will be sorted into different categories until I can muster up the energy to sort everything alphabetically

</Admonition>

# General

General terms and abbreviations that don't fit into any other category

* ###### FPV:
First Person View - The view you get from the camera on your drone. I certainly hope you know this already

* ###### Quad:
Quadcopter - A multirotor drone with 4 motors. A Hex would have 6 motors, an Octo would have 8, and so on

* ###### Prop:
Propeller - The spinny thing that makes the drone go up. Most often with 2-6 blades

* ###### LOS:
Line of Sight - Flying without a video feed, observing the drone directly. How boring

* ###### BVLOS:
Beyond Visual Line of Sight - Flying out of visual contact, without an additional observer

* ###### BNF:
Bind and Fly - A drone that comes with a receiver pre-installed, and is ready to bind to your controller

* ###### PNP:
Plug and Play - A drone that comes without a receiver, and you have to install your own

* ###### RTF:
Ready to Fly - A wider term used to describe a "kit" or a complete package that contains most, if not everything you need to fly, in one box

* ###### AUW:
All Up Weight - The weight of the drone with everything on it - drone, battery, HD camera, and so on

* ###### Dry Weight:
The weight of the drone without the battery, HD camera, and other accessories

* ###### Batt:
Battery - The power source of the drone. Most often a [LiPo](#lipo) battery

* ###### LiPo:
Lithium Polymer - A type of battery that is used in most drones. It's a rechargeable battery that has a high energy density, and is able to provide a lot of current. But they're also pretty volatile, and need to be handled with care

* ###### LiHV:
LiPos tested to not explode when charged to 4.35V per cell. 4.35V allows for a wider voltage range, and offers more high-end performance, but at the cost of a shorter lifespan

* ###### Li-Ion:
Lithium Ion - Similar to [LiPo](#lipo) batteries, with a higher capacity, but lower discharge rate. They're mostly used to power goggles, radios, or high-efficiency long-range drones

* ###### Bando:
An abandoned building that is used as a flying spot

* ###### CC3D:
CopterControl 3D - An old flight controller that was used in the early days of the hobby. It's not used anymore, and is only mentioned here for historical purposes

* ###### KK:
Old flight controllers that were configured using an LCD screen and buttons. Again, mostly just a historical mention

* ###### Mode 1/2/3/4:
Unlike the modes listed below, these are used to describe the stick layout on a radio

## Flight Modes
Toggleable modes in flight controller firmware that change the behavior of the drone in one way or another

* ###### Arm:
Allows the PID loop to run, and the motors to spin. Requires many safety checks to be passed before it can be activated

* ###### Prearm:
Needs to be enabled before the arm mode can even be activated. An extra layer of safety, I'd strongly recommend setting it up, ideally on a switch that's on the opposite side of your Arm switch, such that it requires both hands to be on your radio

* ###### Acro:
Acrobatic mode - A flight mode where the position of the sticks directly corresponds to the rate of rotation of the drone. It's the most common flight mode, and the one you'll be flying in most of the time. In Betaflight (and other derived firmwares) it's the default behavior, one which other flight modes will override when activated

* ###### Acro Trainer:
Acro mode, but with end limits past certain angles if you don't want to do flips and rolls. Not a bad way to transition from angle mode to acro

* ###### Angle:
A flight mode where the drone will self-level, and the position of the sticks will directly correspond to the angle of the drone, much similar to DJI-style drones, of course without the fancy stabilzation

* ###### Horizon:
A mix of Acro and Angle where the drone will switch from angle to acro when the sticks are pushed past a certain point. It's a bad mix of the two, and you should not use it. If you really want something easier than acro, just stick to angle

* ###### Headfree:
A flight mode where the drone will always fly in the direction it was in when this mode was activated, regardless of the following direction changes. Only useful for [LOS](#los) flying, and even then it's mostly a last resort

* ###### 3D:
Allows the motors to reverse thrust in flight, allowing for upside-down or backwards flight. Hard to learn, but will be sure to look cool

* ###### Air Mode:
A modifying flight mode that runs the PID loop even when the throttle is at 0. It's used to keep the drone stable in the air, and is usually enabled by default. Only disable it when it's causing issues - tinywhoops sticking to walls

* ###### Turtle Mode:
A nickname for Flip Over After Crash, a flight mode that allows you to flip your drone over after a crash. It's usually activated by disarming, enabling turtle mode, and arming again. This reverses your yaw/pitch/roll controls, to quickly flip the drone over

* ###### Beeper:
Uses either the motors, a standalone buzzer/beeper, an LED strip or a combination of those to make the drone emit a sound or a light pattern. It's most useful to find a lost drone

* ###### Pit Mode:
Runs the VTX at its lowest possible power, or turns it off completely. Useful for changing your VTX settings without blasting everyone around you with your video feed

* ###### Paralyze:
"Paralyzes" the drone upon activation until it's power-cycled. Useful for preventing the drone from doing anything on accident if crashed at a race for example

* ###### GPS Rescue:
Uses GPS to return the drone to a home position set upon arming. With the improvements in Betaflight 4.4, it's a good way to get your drone back if you lose video feed, or if you're just lost. In INav it should work across all the major versions

* ###### Launch Control:
Tilt the drone forward without it taking off, and when you push the throttle it will take off at the angle you got it to

## "Classes" of drones

Different sizes and styles distinct enough to warrant a name

* ###### Tinywhoop:
A small quadcopter with ducted props, usually with a [65 or 75mm](#65-75-85mm) wheelbase that is usually flown indoors. Cheap and easy to get started with

* ###### Cinewhoop:
A larger, heavy ducted quadcopter, most often running [2-3" propellers](#3-4-5), usually meant as a tool to carry an external HD camera slowly and safely around objects and people you do not want to damage. Not really all that fun to fly, and not great to learn on

* ###### Toothpick:
A small, lightweight quad, usually running [2-3" propellers](#3-4-5), with a [1S or 2S](#1s-2s---6s) battery. Great for small outdoor spaces - parks, backyards, etc

* ###### Micro quad:
Used as a blanket term for all drones with a prop size below [4"](#3-4-5)

* ###### Mini quad:
Used as a blanket term for all drones with a prop size between [4" and 6"](#3-4-5)

* ###### Macro quad:
Used as a blanket term for all drones with a prop size above [6"](#3-4-5)

* ###### Cinelifter:
A large craft with a prop size of [7" and above](#3-4-5), usually meant to carry heavy equipment like cameras larger than a GoPro, or even a full cinema camera

# Units, sizes and measurements

## Hardware sizes

* ###### 3", 4", 5":
Used to describe the measurements of a propeller (and most often a size of frame that fits said propeller). Both the size and pitch are measured in inches. Of course not limited to only 3/4/5"

<Admonition type="note" title="">

Prop specs are usually written out as `5x3x3` (HQProp), or `5135` (Gemfan and Azure for example, though there are others).

* For `5x3x3`, the first number is the prop size, the second is the pitch, and the third is the number of blades - 5" prop, 3" pitch, 3 blades
* For `5135`, the first two numbers are the prop size, and the third is the pitch - 5.1" prop, 3.5" pitch. Gemfan used to have props that would follow a 5-number format (`51433`), the first two numbers did correspond to the prop size, but the last three would not directly signify the pitch. This was supposedly an old standard, that has now been phased out

What even is pitch though? It may seem intuitive to think of it as degrees. That is not the case however - propellers were used in boats long before they ever touched the air - so the pitch is a measure of how far a prop would travel in one revolution through a solid medium (think screw through a block of wood)

</Admonition>

* ###### Prop Mounting:
All mounting systems commonly used for props make use of a center shaft, with different ways of securing the prop to the shaft:

	* M5/M3 threaded shaft - Most common for 5" quads and heavier 3-4" quads, uses a nylock nut to secure the prop
	* T-mount - A bare 1.5 or 2mm shaft with two M2 screw holes around it, common for micro quads or ultralight 5" quads
	* Press-fit - A bare 1 or 1.5mm shaft, usually only for tinywhoops or 2" quads

* ###### 65, 75, 85mm:
The wheelbase of a drone - distance between the motors diagonally. In the past used for larger crafts, now mostly used for tinywhoops

* ###### 16x16, 20x20, 25.5x25.5, 30.5x30.5:
The mounting hole spacing of a flight controller, [ESC](#esc) or a [VTX](#vtx). In a square pattern, the number is the distance between the holes in millimeters. 

<Admonition type="info" title="0.5mm here and there">

25.5x25.5 is most often used in [AIO](#aio) flight controllers, and tends to be offset by 45 degrees. You may also see a range between 25-26mm, which is just a weird measure of what is basically the same thing. Don't worry, it will fit even if the holes are 0.5mm off.

The same goes for 30.5x30.5, which can be pretty much interchangeable with 30x30.

</Admonition>

* ###### Camera sizes:
Camera sizes are standardized by their width to fit inside differently sized mounts:

	* Pico - 12mm - Usually for tinywhoops or toothpicks, usually no mounting holes
	* Nano - 14mm - For micro quads in general or some race frames
	* Micro - 19mm - Most race and freestyle frames
	* DJI - 20mm - For DJI first-party cameras
	* Mini - 21mm - Mostly on freestyle/long-range frames
	* Full - 28mm - For larger freestyle/long-range frames

* ###### Module sizes:
There are two main module bay sizes:

	* JR bay - Micro/Mini - Used on larger radios like the Radiomaster TX16s, TX12 or the Boxer
	* Lite bay - Nano - Used on smaller radios like the Radiomaster Zorro
However, FrSky (who even came up with the Lite bay in the first place) decided to change the bay depth somewhere along the line, so you should first check if the module you are buying will fit your FrSky radio

* ###### Motor [stator](#stator) sizes:
The motor stator size is listed as `xxyy`, where `xx` is the stator width, and `yy` is the stator height. For example, a 2207 motor has a 22mm wide and 7mm tall stator. A 1404 motor has a 14mm wide and 4mm tall stator, and so on. This size is used to calculate the stator volume, you can use [this calculator](/tools) to calculate and compare stator volumes

* ###### Motor mounting:

The distance between the holes is the diameter of a circle, with 4 screw holes centered on it. The most common sizes are:

	* 6.6x6.6 - The sole exception, having 3 holes in a triangular pattern, used mainly on tinywhoops
	* 9x9 - Most toothpicks and lighter micros
	* 12x12 - Light 5" quads or heavier 3-4" quads
	* 16x16 - Regular 5" quads
	* 19x19 - 7" quads and above

	![Motor mounting](/uploads/axisflying-1-.png)

* ###### Motor KV:
Used to denote the rotations per minute per volt of a motor with no load. Motors of the same size will often have different KV values to accommodate different prop sizes and battery cell counts

* ###### M2, M3, M4:
Size of bolts and nuts in metric units. An M2 would have a 2mm diameter shaft, an M3 would have a 3mm diameter shaft, and so on. 

<Admonition type="note" title="">

* M3 is usually used for pretty much all 30x30 stacks, and on some 20x20 stacks/25.5x25.5 AIOs
* M2 is most often used on smaller hardware - 16x16 stacks, some 20x20 stacks, and on some 25.5x25.5 AIOs. Also used for camera mounting screws

</Admonition>

## Electrical Units

* ###### V:
Voltage [Volt] - A difference in electric potential between two points. The higher the voltage, the more current can flow through a circuit. Can be seen as a specification of the output voltage of a battery, or a voltage regulator

* ###### A:
Current [Ampere] - A measure of the amount of electric charge flowing through a circuit. Can be seen as a specification of the maximum current a battery can provide, or the maximum current a component can handle flowing through it

* ###### Nominal voltage:
The approximate average voltage of a [LiPo](#lipo) battery cell - 3.7V

* ###### Max voltage:
The maximum safe voltage of a [LiPo](#lipo) battery cell - 4.2V

* ###### Min voltage:
The minimum safe voltage of a [LiPo](#lipo) battery cell - 3.5V

* ###### mAh:
Milliampere-hour - A unit of electric charge. Used to describe the capacity of a battery

* ###### C:
The charge/discharge rate of a battery. Used to describe how much current a battery can safely provide or take in. A 1000mAh 50C dischagre battery can safely provide 50A of current. Most batteries can be safely charged at 1 or 2C, so a 1000mAh 2C charge battery can be charged at 2A. Charging at 1C will take 1 hour, charging at 2C will take 30 minutes, and so on. More info [here](/articles/guides-all-you-should-know-about-batteries#main-specifications)

* ###### 1S, 2S, - 6S:
The number of battery cells in a single battery that are connected in [series](/articles/guides-all-you-should-know-about-batteries#cell-count). Adds up the voltage of each cell, so a 2S 1000mAh battery will have a nominal voltage of 7.4V and a 1000mAh capacity, and a 6S battery will have a nominal voltage of 22.2V with a 1000mAh capacity
![nominal voltage](/uploads/battery_anatomy_nominal.png)

* ###### 1P, 2P:
The number of battery cells in a single battery that are connected in [parallel](/articles/guides-all-you-should-know-about-batteries#cell-count). Adds up the capacity of each cell, so a 2P battery made of 2 2s 1000mAh cells will have a capacity of 2000mAh and a voltage of 7.4V (2S)

* ###### mW:
Milliwatt - Mostly used to describe the output power of transmittings devices like [VTX](#vtx)es or radio transmitter modules

* ###### dB:
Decibel - Logarithmic unit used to describe a ratio between a reference value and a measured value. Used to describe the gain of an antenna, received signal strength, and more

* ###### Hz
Hertz - A unit of frequency (1Hz - one cycle per second), used to measure the operating frequency of different components:
	* Gyroscope - The frequency at which the gyroscope is sampled (3.2KHz, 8000KHz, etc)
	* PID loop - The frequency at which the PID loop runs at, usually tied directly to the gyro frequency
	* Radio Communication - The frequency at which the transmitter/receiver communicate at (2.4GHz, 900MHz, etc)
	* Update frequency - The frequency that the radio transmitter sends out packets at (usually 50, 250, 500Hz, etc)

# Electronics and Hardware

* ###### HW:
Short for hardware

## Video/Radio Transmission

* ###### TX:
Short for transmitter. Also used to denote [UART](#uart) connections

* ###### RX:
Short for receiver. Also used to denote [UART](#uart) connections

* ###### VTX:
Video transmitter

* ###### VRX:
Video receiver - Can be a separate module, or built into a pair of goggles

* ###### RHCP/LHCP:
Right-Hand/Left-Hand Circular Polarization - A way to polarize the signal sent by the antenna such that it resembles a corkscrew. It's used to reduce interference between multiple signals, and to increase the range of the signal - ideal for video transmission. The polarization of the antenna needs to match between the transmitter and receiver, otherwise the signal will be attenuated by 3-6dB

* ###### Linear:
Lack of circular polarization. It's mostly used for radio transmission, or for video transmission on small crafts due to the simplicity of the antenna (can literally be a piece of wire)

* ###### Analog:
Analog video transmission, using the [NTSC](#ntsc-pal) or [PAL](#ntsc-pal) standard. Think of it as old TV transmission. Any video receiver can tune in on any video transmitter, as long as they are on the same frequency

* ###### Digital:
Digital video transmission, found in DJI, HDZero, or Walksnail products. You can compare it to a WiFi network. A video receiver needs to be paired with a video transmitter, the transmission is sent in smaller packets, and the video quality is much higher

* ###### Band/Channel:
Used as a way to denote frequencies used in video transmission
![Band and Channel Chart](/uploads/FPV_Freqs_Chart.png)

* ###### NTSC/PAL:
Video formats for analog systems. Can be used nearly interchangeably

* ###### Telemetry:
A way to send data from the craft back to the radio. Can be used to display battery voltage, current draw, GPS coordinates, and even more with [ELRS](#elrs) allowing full configuration of the craft from the radio

* ###### Diversity:
A receiver that has multiple receiving circuits, and can either switch between whichever one has the best signal, or a specialized transmitter can communicate a different signal to each receiving circuit

* ###### LQ:
Link Quality - A measure of the quality of the signal between the transmitter and receiver. Usually displayed as a percentage

* ###### RSSI:
Received Signal Strength Indicator - A measure of the strength of the signal between the transmitter and receiver. Usually displayed as a percentage, or as a dBm value

* ###### Channel:
A way to send values of different inputs on the radio to the flight controller. The standard range is 1000-2000, taken from [PWM](#pwm). You need at least 4 channels for the main inputs - throttle, yaw, pitch, and roll, and then additional [AUX](#aux) channels for switches and potentiometers

* ###### AUX:
Auxiliary channel - A [channel](#channel) that is not used for the main inputs, but for switches and potentiometers. Usually denoted as AUX1 for Channel 5, AUX2 for Channel 6, and so on

## Connectors

* ###### JST:
Mainly used for battery balance cables (JST XH), on flight controllers and ESCs for various connections (JST SH), or on small 1s batteries (JST PH). If there is a number specified, that denotes the pitch (space between pins)

* ###### BT2.0:
A 2-pin connector developed by BetaFPV, offering lower resistance than PH2.0 to get a bit more performance of 1s batteries

* ###### XT30, XT60, XT90:
A 2-pin connector, mostly used for battery connetion. The number denotes the maximum current that can be safely passed through the connector. XT30 - 30A, XT60 - 60A, XT90 - 90A

* ###### MR30/MT30, MR60/MT60
A 3-pin connector, MRxx being flat, MTxx being arranged in a triangle. Used for quick motor connections, same current ratings apply as for XTxx connectors

* ###### SMA/RP-SMA:
SMA stands for `Sub-Miniature Version A`. They're [coaxial](#coax) connectors that screw together to mate (that's electronic terminology for you). They're used for antenna connections mainly on VTX [pigtails](#pigtail) and on goggles. RP-SMA stands for `Reverse Polarity SMA`, but it's much less common. RP-SMA connectors have the pin and sleeve reversed, so they are not compatible with SMA connectors

* ###### MMCX:
Stands for `Micro-Miniature Coaxial`, it's a connector that clicks to mate. It's mainly used directly on most larger VTXs and on [pigtails](#pigtail) to adapt an MMCX VTX for SMA/RP-SMA antennas

* ###### UFL/IPEX:
Different manufacturers make hardware following the same standard, so UFL and IPEX are the same thing, just a different name. It's a tiny connector that's used on basically all receivers, most smaller VTXs, and on [pigtails](#pigtail) to adapt a UFL/IPEX VTX for SMA/RP-SMA antennas 

* ###### Coax:
Short for `coaxial` - a wire that consists of a center conductor, a dielectric insulator, and a shield. Mainly used for antenna connections

* ###### Pigtail:
A shorter piece of wire with connectors on one or both ends. Mainly used to simplify connections (XT60 pigtails with pre-soldered wires), or adapt from one connector to another (XT30 to XT60, MMCX to SMA, etc)

## Main Drone Parts

* ###### FC:
Flight Controller - The "brain" of the drone. It takes input from the radio receiver, gyro, and other sensors, computes the necessary movements and adjustments, and outputs signals to the [ESCs](#esc) to control the motors

* ###### ESC:
Electronic Speed Controller - A device to run the motors at the desired speed and direction as signaled by the flight controller. It takes (most often) a [DShot](#dshot) signal from the flight controller, and outputs a 3-phase signal to the motor

<Admonition type="note">

Nowadays you'll most often see 4in1 ESCs, which are 4 ESC circuits on a single board. This allows for easier wire routing and installation, and is usually cheaper than buying 4 separate ESCs of similar specs

</Admonition>

* ###### PDB:
Power Distribution Board - A board that takes the battery voltage, and distributes it to the flight controller, separate ESCs, and other components. Nowadays rarely used in favor of 4in1 ESCs and FCs that have built-in regulators

* ###### AIO:
All-In-One - A flight controller that has a built-in 4in1 [ESC](#esc). On smaller crafts they can also have a receiver and [VTX](#vtx) integrated as well - giving you a single board to run the entire craft

* ###### Cam:
Camera - The camera that is used to capture the video feed. Most often a [CMOS](#cmos-ccd) sensor, but can also have a [CCD](#cmos-ccd) sensor

* ###### Brushed:
A motor that works by having brushes that make contact with the rotor to energize the coils in it to create a magnetic field that gets attracted to the magnets in the stator, making it spin. It's an older type of motor, and is not used anymore

* ###### Brushless:
A motor that works by having magnets in the rotor that are attracted to the coils in the stator which (phases), which when energized, create a magnetic field that atrracts the magnets in the rotor, causing it to spin. This is the most common type of motor used nowadays

* ###### Stator:
The stationary part of the motor that is used to mount the motor to the frame

* ###### Rotor:
The spinny part of the motor

## FC/ESC Components

* ###### MCU:
Microcontroller Unit - The main processor on the FC/ESC, running the entire process. Most of the MCUs used nowadays are made by STM32, but there are new ones from ArteryTek as well

* ###### F4, G4, H7:
Different generations of MCUs made by STM32 or ArteryTek. Generally, the higher the number, the more powerful the MCU is, and the more features it has. The most common ones used nowadays are F4 and F7
  * STM32F411 - The cheapest STM32 MCU based on the Cortex M4 cores, used mainly on whoops and toothpicks. However it lacks in memory for the firmware
  * STM32G47x - The newest generation of MCUs using M4 cores, it performs almost the same as STM32F405, with less [UARTs](#uart)
  * STM32F405 - Based on the M4 cores, this is the MCU you will see most often on budget-midrange FCs
  * AT32F435 - An alternative to the STM32 MCUs, still based on the M4 cores but with a lot more performance, almost reaching up to...
  * STM32F722 - Based on the M7 cores, this is a pretty powerful MCU you will see on most FCs nowadays. Like the STM32F411, it lacks in memory for large firmwares
  * STM32F745 - A step up from the STM32F722, it has more memory and more input/output pins, however it's pretty rare
  * STM32H743 - Based on the M7 cores, this is the most powerful MCU you will see on FCs. It has a lot of memory, and a lot of input/output pins, and is used on the most expensive FCs that have a lot of features

* ###### Gyro:
Gyroscope - A sensor that measures the angular velocity of the craft. Needs to be present for the flight controller to work

* ###### Accelerometer:
A sensor that measures the angular acceleration of the craft. Not necessary for the flight controller to work, but it's used in flight modes where relative acceleration is important - like angle mode

* ###### IMU:
Inertial Measurement Unit - A collective term used for the gyro, accelerometer, and sometimes more
* ###### Baro:
Barometer - A sensor that measures the air pressure. Used for sensing altitude for GPS Rescue and Altitude/Position Hold on flight control firmwares that support it

* ###### Compass:
A sensor that measures the magnetic field of the earth. Used in addition to the GPS to aid in navigation. The current implementation in Betaflight is being improved, and is not recommended to be used. On INav it works well and is encouraged to be used

* ###### OSD:
On-Screen Display - In this case a standalone chip that takes the video feed from the camera, and overlays information on top of it. In [digital](#digital) systems the OSD is handled by the VTX which sends the OSD data separately along with the video feed to the [VRX](#vrx)

* ###### BEC:
Battery Eliminator Circuit - A voltage regulator that takes the battery voltage, and outputs a lower voltage to power the flight controller and other components. An FC needs a 3.3V and a 5V supply, but often also includes a 9-12V for powering external [VTX](#vtx)s, and the 3.3V/5V supply is broken out as well to power receivers, cameras, GPS units and more

* ###### (MOS)FET:
(Metal-Oxide-Semiconductor) Field-Effect Transistor - A transistor that is used to switch the current to the motor phases on and off

# Software
Programs, applications, protocols, and software terms used in the hobby

* ###### SW:
Short for software

* ###### FW:
Short for firmware

* ###### PID:
Proportional-Integral-Derivative - A control loop that is used to control the craft. It takes the error between the desired and actual position of the craft, and outputs a value that is used to correct the error

* ###### Bootloader:
A small program stored on the flight controller that is used to flash new firmware to the flight controller

* ###### DFU:
Device Firmware Upgrade - A process of flashing new firmware to a device. It's usually activated by holding down a button on the flight controller, or by sending `bl` into the [CLI](#cli) of most firmwares

* ###### CLI:
Command Line Interface - A way to send commands to the flight controller, can be used to completely configure the craft without using grahpical interfaces. It's usually accessed through the configurator, but can also be accessed through a serial terminal like PuTTY

* ###### Diff:
An output from the `diff all` command that contains all the settings of the flight controller that are changed from the default values. It's used to share settings between people, or to save your settings for later use (between firmware flashes for example)

* ###### Dump:
An output from the CLI command `dump` that contains all the settings of the flight controller, regardless of whether they are changed from the default values. Given a completely empty MCU-level target, a dump can be used to completely configure the flight controller into a functional state

## Firmware

* ###### MultiWii:
The original flight controller firmware, literally using [gyroscopes](#gyro) from the Nintendo Wii controllers on Arduino boards. It's nowhere near modern standards, and should not be used. But it can be interesting to play around with

* ###### Baseflight:
A Port of MultiWii to 32-bit MCUs. Very similar situation as with MultiWii

* ###### Cleanflight:
Due to some disagreements in the Baseflight development, Cleanflight was forked from Baseflight and was the norm for a while. Yet now it has met the same fate as the previous firmwares

* ###### Betaflight:
The most popular flight controller firmware. It's open-source, and is used on most flight controllers. It's highly configurable, and has a lot of features for high-performance flight

* ###### INav:
A flight controller firmware based on Betaflight, but with a focus on long-range/autonomous flight (and not only for multirotors). It has a lot of features for GPS navigation and offers better support for planes and wings

* ###### Emuflight:
A flight controller firmware based on Betaflight, but with a focus on freestyle flight. Nowadays I'd recommend just using Betaflight, as it has improved a lot in that regard

* ###### Butterflight:
A fork of Betaflight which re-introduced some filtering features that were removed from Betaflight. It's not developed anymore

* ###### OpenPilot/LibrePilot:
Projects entirely separate from the "xflight" firmwares, with a focus on ease of use and user experience. LibrePilot followed OpenPilot, but is now no longer developed

* ###### Ardupilot:
Autopilot firmware that is used on a lot of different platforms - multirotors, planes, boats, rovers, and more. It's open-source, and has a lot of features for autonomous movement and navigation

* ###### OpenTX/EdgeTX:
Open-source firmwares for radios. OpenTX was the original firmware for many radios back in the day, and is still used on a lot of radios. Nowadays it has been mostly replaced by EdgeTX, which is a fork of OpenTX, with a focus on adding new features and improving the user experience while OpenTX development has largely stagnated

<Admonition type="info">

Each of these firmwares has its own Configurator application, which is used to configure the firmware settings and flash the firmware to the flight controller. 

You should only use (for example) Betaflight Configurator to flash and configure Betaflight, and so on. Using the wrong configurator will at best lead to unpredictable behavior, and at worst brick your flight controller. Also please don't try to use these configurators with your radio, they are only meant to be used with flight controllers. For your radio there are different applications, like [OpenTX](#opentx-edgetx) Companion, or [EdgeTX](#opentx-edgetx) Buddy

</Admonition>

## Protocols
There are different protocols to facilitate communication between different parts and pieces of hardware, both over the wire and over the air:

* ###### UART:
Universal Asynchronous Receiver-Transmitter - a base serial communication protocol upon which other protocols are built. It's used to communicate between the flight controller and other components like the receiver, VTX, GPS, and more. It uses two connections for transmit-receive and receive-transmit communication (RX->TX, TX->RX)

* ###### SPI:
Serial Peripheral Interface - a synchronous serial communication protocol. It's used to communicate between the [MCU](#mcu) and the peripherals on the flight controller - OSD, flash storage, gyro, and more. It uses 4 wires - MISO, MOSI, SCK, and CS

* ###### I2C:
Inter-Integrated Circuit - a synchronous serial communication protocol. It's used to communicate between the [MCU](#mcu) and the peripherals on the flight controller, like the barometer, compass, etc... using 2 connections - SDA and SCL

### FC Communication Protocols

* ###### MSP:
Multiwii Serial Protocol - A protocol used to communicate between the configurator and the flight controller, or anything else that needs a more direct connection to the flight controller

* ###### SmartAudio:
Originally meant to carry VTX control signals over its audio input - hence the name. Now VTXs either have no audio inputs, or have a separate connector for audio. And SmartAudio is a standalone connection to control analog VTX settings like band, channel, power, and more

#### FC-ESC:

* ###### PWM:
Pulse Width Modulation - Originally used on standalone receivers to directly drive servos and ESCs, and as direct channel inputs on flight controllers. It works by sending a pulse of varying width, and the receiver/flight controller interprets the width of the pulse as a value - that's where the common 1000-2000 channel range comes from. It used to directly represent the pulse width in microseconds. Nowadays it's very old, and is not used for direct motor control anymore

* ###### OneShot:
Very similar to PWM, but with a fixed frame rate. It's a legacy protocol, and isn't used anymore

* ###### OneShot125:
Not to be confused with OneShot, it's another iteration on PWM, where the pulse width is divided by 8 to allow faster communication between the FC and ESC. It's a legacy protocol, and isn't used anymore

* ###### OneShot42:
3x faster than OneShot125, developed by Flyduino. It wasn't widely supported, and is now a legacy protocol too

* ###### MultiShot:
Developed by RaceFlight, it is almost 10x faster than OneShot125, and 80x faster than PWM. It was the most recent precursor to DShot, but is not used anymore

* ###### DShot:
The most common protocol for FC-ESC communication. It's a digital protocol unlike all the ones mentioned above, and is used to send the desired motor speed and direction to the ESC in frames that contain more info. It's a lot more reliable than the older analog protocols, and has a lot of features like motor direction control, motor speed info, and even frame error detection

* ###### PPM:
Pulse Position Modulation - A protocol that sends all channel values in a single stream on one wire, by varying the position of the pulse. Originally used between receivers and flight controllers, but similar to PWM it is now a legacy protocol

#### FC-Receiver

* ###### SBUS:
SBUS was developed by Futaba, originally as a serial digital protocol to control multiple servos and ESCs with one signal wire. It was later adapted to be used as a receiver protocol, and is now used by FrSky and DJI. It requires an inverter to be used with F4-based flight controllers

* ###### SmartPort:
Developed by FrSky, it's a protocol that allows telemetry data to be sent from the flight controller to the radio. It needs a separate [UART](#uart) connection to be used alongside SBUS

* ###### F.Port:
F.Port is developed by FrSky, and combines SBUS and SmartPort into a single wire for a "simple" connection, but in reality it's a bit more complicated to set up

* ###### iBUS:
A protocol mainly used by FlySky and Turnigy with the same goal as SBUS - to control multiple servos and ESCs with one signal wire. Unlike SBUS it does not require an inverter to be used with a flight controller, and can support telemetry

* ###### CRSF:
Used by TBS for both of their prducts - Crossfire and Tracer, and also by [ELRS](#ELRS). It's a full control and telemetry protocol over two wires on a single [UART](#uart). Also used for radio-transmitter communication for TBS and ELRS systems

* ###### GHOST:
Used and developed by ImmersionRC, it's a full control and telemetry protocol over two wires on a single [UART](#uart) for their Ghost system

### Radio Control Systems

* ###### ELRS:
Express Long Range System - Open-source ecosystem focused on great performance and range. Many manufacturers make ELRS-compatible hardware, which is often integrated info FCs, VTXs and VRXs for full synchronization between the radio, goggles, and the craft. 

* ###### Crossfire:
A 900MHz radio link system developed by TBS, it was one of the first systems to offer long range and relatively high performance (if compared to the other systems available at the time). It's a proprietary ecosystem, but recently TBS has allowed other manufacturers (starting with NewBeeDrone) to integrate Crossfire into their flight controllers

* ###### Tracer:
An alternative to Crossfire by TBS, it's a 2.4GHz system that offers higher refresh rates and lower latency than Crossfire, but at the cost of range. It's a proprietary ecosystem, and is not compatible with Crossfire

* ###### Ghost:
A 2.4GHz radio link system developed by ImmersionRC, it's a proprietary ecosystem, and is not compatible with Crossfire or Tracer. It offers higher refresh rates than Tracer, comparable to ELRS (and can even be flashed with ELRS firmware)

* ###### ACCST:
Advanced Continuous Channel Shifting Technology - FrSky's older system, used on their older radios and receivers. It has two variants - D16 and D8, regional versions, and a backwards-compatible D16v2 on [ACCESS](#access) radios. It's a messy proprietary system, and is not recommended

* ###### ACCESS:
Advanced Communication Control, Elevated Spread Spectrum - FrSky's newer system, used on their modern radios and receivers. It supports over-the-air firmware updates, and has better performance than ACCST. Both still fall way below the performance of the other systems mentioned above

* ###### AFHDS:
Automatic Frequency Hopping Digital System - Used in FlySky and Turnigy transmitters and receivers. Its performance is comparable to ACCST, but it's a lot easier to set up. Still not recommended nowadays

* ###### DSM2/DSMX:
Developed by Spektrum, it's their newest system, used widely for planes/wings, helis and more. Out of the older protocols listed here, it's likely the most prolific one, but still being phased out in favor of newer systems


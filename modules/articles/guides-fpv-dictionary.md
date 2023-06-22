---
title: FPV Dictionary
description: Learn all the terms and abbreviations in FPV!
visible: false
category: Guides
author: VitroidFPV
img: /uploads/placeholder.png
date: 2023-05-23T17:32:52.992Z
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

* ###### Bando:
An abandoned building that is used as a flying spot

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

## Video/Radio Transmission

* ###### TX:
Short for transmitter. Also used to denote [UART](#uart) connections

* ###### RX:
Short for receiver. Also used to denote [UART](#uart) connections

* ###### VTX:
Video transmitter

* ###### VRX:
Video receiver - Can be a separate module, or built into a pair of goggles

* ###### Analog:
Analog video transmission, using the [NTSC](#ntsc-pal) or [PAL](#ntsc-pal) standard. Think of it as old TV transmission. Any video receiver can tune in on any video transmitter, as long as they are on the same frequency

* ###### Digital:
Digital video transmission, found in DJI, HDZero, or Walksnail products. You can compare it to a WiFi network. A video receiver needs to be paired with a video transmitter, the transmission is sent in smaller packets, and the video quality is much higher

* ###### Band/Channel:
Used as a way to denote frequencies used in video transmission
![Band and Channel Chart](/uploads/FPV_Freqs_Chart.png)

* ###### NTSC/PAL:
Video formats for analog systems. Can be used nearly interchangeably

* ###### Diversity:
A receiver that has multiple receiving circuits, and can either switch between whichever one has the best signal, or a specialized transmitter can communicate a different signal to each receiving circuit

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


---
title: Airbot Fenix G4 AM32 AIO
description: Anyone remember Airbot? Yeah
visible: true
category: Reviews
author: VitroidFPV
img: /uploads/airbot_fenix_thumbnail.png
date: 2023-09-1T22:40:37.705Z
---

<script>
	import GridBox from "$components/articlesPage/GridBox.svelte";
	import GridItem from "$components/articlesPage/GridItem.svelte";
	import ImgGrid from "$components/articlesPage/ImgGrid.svelte";
	import Tablist from "$components/articlesPage/Tablist.svelte";
	import Tab from "$components/articlesPage/Tab.svelte";
	import Admonition from "$components/articlesPage/Admonition.svelte";
	import Chip from "$components/Chip.svelte";
</script>

If you've been in the hobby long enough, you may remember using Airbot hardware at one point or another. Does Omnibus F4 ring a bell? Yeah, that Airbot! Their boards were great back in the day, so great infact that they were cloned by many other manufacturers. They had to retreat from the market for a while, instead focusing on designing and manufacturing hardware for other companies.

Like a phoenix, they have risen from the ashes with a new lineup of products, and in this article, we'll be taking a look at one!

The Fenix G4 is a 25x25 AIO flight controller with 4 onboard 35A ESCs running AM32 firmware. It's powered by an STM32G473 MCU, and uses the ICM42688P gyro/accelerometer. They even managed to fit a DSP310 barometer and a bunch of RGB LEDs on it! It's a pretty packed board, so let's take a look at it!

# Where to Buy
* [Official Airbot Store](https://store.airbot.racing/products/airbot-am32-aio) - $89.99

<Admonition type="tip" title="Disclosure">

* I received this product free of charge as a development sample
<!-- * I received no payment or other compensation for this review -->
* The manufacturer made a donation to my [ko-fi page](https://ko-fi.com/vitroid) on their own accord. This does not affect the review in any way. The money from the donation has been used to purchase parts for future reviews/tutorials
* This review is based on my own experience with the product
* The manufacturer had no input into this review and no editorial control over its contents

</Admonition>


# Specifications

<ImgGrid cols={2}>

![Overview](/uploads/airbot_fenix_overview.png)

![Scale Weight](/uploads/airbot_fenix_scale.jpg)

</ImgGrid>

<GridBox classes="md:grid-cols-2 grid-cols-1">

<GridItem title="Hardware:">

<div class="flex flex-wrap gap-2">

<Chip>M3 Holes</Chip>
<Chip>25x25 Mounting</Chip>
<Chip>10.4g Weight</Chip>
<Chip>USB Breakout</Chip>

</div>

</GridItem>

<GridItem title="IO:">

<div class="flex flex-wrap gap-2">

<Chip>USB-C</Chip>
<Chip>4 UARTs</Chip>
<Chip>I2C</Chip>
<Chip>4 35A ESCs</Chip>

</div>

</GridItem>

<GridItem title="Features:">

<div class="flex flex-wrap gap-2">

<Chip tooltip="MCU">STM32G473</Chip>
<Chip tooltip="Gyro/Accelerometer">ICM42688P</Chip>
<Chip tooltip="AT7456E">OSD</Chip>
<Chip tooltip="Flash Memory">16MB</Chip>
<Chip tooltip="Barometer">DSP310</Chip>
<Chip>5V 2.5A</Chip>
<Chip>10V 2.5A</Chip>
<Chip>16 Onboard RGB LEDs</Chip>

</div>

</GridItem>

<GridItem title="Pads:">

<div class="flex flex-wrap gap-2">

<Chip>UART1, 2, 4</Chip>
<Chip>5V</Chip>
<Chip>10V</Chip>
<Chip>BATT</Chip>
<Chip>GND</Chip>
<Chip>Video in/out</Chip>
<Chip>LED</Chip>
<Chip>BZ+/-</Chip>
<Chip tooltip="Camera Control">CC</Chip>
<Chip>USB Breakout</Chip>
<Chip>Motor 1-4</Chip>

</div>

</GridItem>

<GridItem cols={3} title="Connectors:">

<div class="flex flex-wrap gap-2">

<Chip tooltip="External USB/GPS Connector">SDA, SCL, DN, DP, GND, 5V, L-RX1, L-TX1</Chip>
<Chip tooltip="VTX Connector">TX2, GND, RX1, TX1, GND, 10V</Chip>

</div>

</GridItem>

</GridBox>

# Overview

With all the technical stuff out of the way, let's take a closer look at the board itself, and what it can offer:

## The Unusual Stuff

This AIO has some new and rarely-seen features in the hobby. It's great that it's pushing the commonly used hardware and software forward, but it can be confusing to newer pilots, or even just someone that doesn't keep up with the bleeding edge of tech. Let's take a look at some of the new stuff:

### G4 MCU

> Wait, isn't G4 only for KISS boards? Does thing even run Betaflight?

I've seen this question asked a bunch when talking about the development of this board. While yes, G4 has mainly been used on KISS hardware and that's possibly where the confusion comes from, the G4 MCUs are fully supported by Betaflight. This board is likely one of the first to use the G4 MCU in a Betaflight flight controller however, so it's understandable why people would be confused.

The STM32G473 is a relatively new chip to Betaflight boards as already mentioned. It's main use going forward will most likely be an F411 replacement - it comes in a small package size, has more UARTs (2, rarely 3 on most F411 boards really isn't enough), and still comes in at around the same price. I hope to see it take off more,  specifically on AIOs in the future.

### AM32 ESCs

BLHeli_32 has long been the standard for high-end ESCs in the hobby. Unlike BLHeli_S, it isn't open source, and requires a license fee to use. AM32 is a relatively new open source alternative firmware to BLHeli_32, and it's slowly gaining traction. It can already run on many chipsets used in BLHeli_32 ESCs, but requires some special tooling to flash "over" BLHeli_32. However, some manufacturers have already started shipping ESCs with AM32 pre-flashed. Airbot is one of them, and the Fenix G4 AIO has 4 35A AM32 ESCs that are rated up to 6s!

The ESC is driven by a special standalone QF32MTF4AK8U7 chiplet board that has all of the MCUs and passive components on it. It's then soldered to the actual AIO board and drives the FETs directly. It allows a much more simple and compact design.

### LPUART

In the wiring diagram below, there's a UART with pads labeled L-TX1/L-RX1. Those are pads for a special type of UART called LPUART. It's a low power version that can be used to communicate with low power peripherals. For our use case though, it can be thought of as just another UART, and Betaflight treats it as such.

## Features

Now that you're more familiar with the new things introduced here, let's take a look at the rest of the features.

### Gyro/Accelerometer

The ICM42688P is not completely new, you may have already used it on some other boards. It had a bit of a rocky start, as it tends to need a more careful design, and up until recently it wasn't performing as well as it could. In the newest Betaflight versions, the software issues have been addressed, and manufacturers have had time to design better boards around it. Nowadays it should perform as well as the good old MPU6000, and some people even prefer it, mainly racers. 

### Barometer

The barometer that they managed to fit on this already full board is a DSP310. It's a pretty standard one, you'll find it on many other boards. It's a great addition to have, especially if you're planning on using this board in a long range build using advanced GPS features which need a barometer for accurate functionality - GPS rescue, altitude hold, even full autonomous flight.

### Power Regulation

There are two main voltage regulators onboard - one for 5V and one for 10V - both rated at 2.5A each. The 10V one will power your VTX, and it's even powerful enough to run the DJI O3 Air Unit at full tilt. The 5V one will power all of the other peripherals, and also the onboard LEDs

### RGB LEDs

LEDs should be a standard feature on all boards if it was up to me. Useful for races, and just a bunch of extra style points on top! The board has 16 RGB LEDs on it, 4 on each corner. There's a small set of bridge pads that you solder together to enable them, and they can be fully controlled through Betaflight. They're pretty small, but are more than bright enough!

<video controls>

<source src="/uploads/airbot_fenix_leds.mp4" type="video/mp4">

</video>

### Blackbox

You have 16MB of onboard flash memory for Blackbox logs. Any amount of onboard flash is a great addition on an AIO, and 16MB is plenty when you're not recording everything at the full rate. You can log multiple full flights for troubleshooting, or tuning your PIDs and filters.

## Board Layout

<ImgGrid cols={2}>

![Top](/uploads/airbot_fenix_top.png)

![Bottom](/uploads/airbot_fenix_bottom.png)

</ImgGrid>

At the top, we basically only have the ESC circuitry, USB, and all of the IO pads. As already mentioned, the ESCs are rated up to 6s @ 35A. All 4 are driven from the single driver board that makes more room for power traces to carry current through the metal FETs. You may also be asking yourself:

> Why is it so shiny?

The entire board is coated in a "Superhydrophobic Nano Waterproof Coating" that causes the shimmer, but also allows the board to be basically waterproof. I've seen this thing fully submerged and still spinning a motor like nothing happened. It's pretty cool!

## Pad Layout

The pads are pretty large for an AIO that's as packed as this thing is. They're not crammed too close together either, so you shouldn't have any issues soldering to them. They could be layed out with a bit more sense, but again, for an AIO, it's pretty good.

* At the right side there are two sets of UART pads - 2 and 4, two sets of 5V and GND pads, and pads for a buzzer and external LEDs
* At the front the pads are mostly for your video hardware - Video in/out, two sets of power pads (5V and 10V), and pads for camera control and UART 1 for your digital VTX

## Connectors

You have two connectors on this board - one for your digital VTX that has the standard "RC, GND, RX, TX, GND, Power" pin order, and one for a GPS/external USB breakout board. The former is a standard JST SH connector, but the USB/GPS plug uses a connector that I am not familiar with. I've asked Airbot, and will update this article when I get a response. For now I believe the board should come with the appropriate cable for it anyway.

### Wiring Diagram

Mine, because I'm all fancy like that:

![Wiring Diagram](/uploads/airbot_fenix_diagram_real.png)

[Official one from Airbot](https://cdn.shopify.com/s/files/1/0741/5378/7685/files/AIRBOT_Fenix_G4_35amp_AM32_Aio_pinout.pdf?v=1692993975) for reference

# Closing Thoughts

This board is really cool. To have Airbot of all the manufacturers come back with something like this is great to see. A fully waterproof 35A AIO with a bunch of LEDs, blackbox, a nice gyro and barometer is a strong re-entry to the market. They have a couple of other boards in the works, and I can't wait to review them as well! For now, this is the only one publicly available of the future lineup, and I highly recommend it. It's a great board for anything from a 3.5" freestyle build, cinewhoop, or even an ultralight 5-6".
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

Well that time is over, and Airbot is back with a couple of new amazing boards, and we're going to take a look at one of them today: the Airbot Fenix G4 AM32 AIO. Like a literal pheonix they are rising back from the ashes (idk I thought this was kinda neat too lol). Sorry for the history lesson, but I thought it appropriate to give some context to the company and their products, and why it's kind of a big deal :)

# Where to Buy
* [Official Airbot Store](https://store.airbot.racing/products/airbot-am32-aio) - $89.99

<Admonition type="tip" title="Disclosure">

* I received this product free of charge as a development sample
<!-- * I received no payment or other compensation for this review -->
* The manufacturer made a donation to my [ko-fi page](https://ko-fi.com/vitroid) on their own accord. This does not affect the review in any way. The money from the donation has been used to purchase parts for future reviews/tutorials
* This review is based on my own experience with the product
* The manufacturer had no input into this review and no editorial control over its contents

</Admonition>

# The Unusual Stuff

> Wait, isn't G4 only for KISS boards? Does thing even run Betaflight?

I've seen this question asked a bunch when talking about the development of this board. While yes, G4 has mainly been used on KISS hardware and that's possibly where the confusion comes from, the G4 MCUs are fully supported by Betaflight. This board is likely one of the first to use the G4 MCU in a Betaflight flight controller however, so it's understandable why people would be confused.

With that confusion out of the way, let's take a look at the new things that this thing has to offer! 

## G4 MCU

The STM32G473 is a relatively new chip to Betaflight boards as already mentioned. It's main use going forward will most likely be an F411 replacement - it comes in a small package size, has more UARTs (2 on the F411 really isn't enough), and still comes in at around the same price. I hope to see it take off on more boards (specifically AIOs) in the future.

## AM32 ESCs

BLHeli_32 has long been the standard for high-end ESCs in the hobby. Unlike BLHeli_S, it isn't open source, and requires a license fee to use. AM32 is a relatively new open source alternative firmware to BLHeli_32, and it's slowly gaining traction. It can already run on many chipsets used in BLHeli_32 ESCs, but requires some special tooling to flash "over" BLHeli_32. However, some manufacturers have already started shipping ESCs with AM32 pre-flashed. Airbot is one of them, and the Fenix G4 AIO has 4 35A AM32 ESCs that are rated up to 6s!

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

With the few new things and specs out of the way, let's take a look at the board itself!

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

![Wiring Diagram](/uploads/airbot_fenix_diagram.png)

[Official one from Airbot](https://cdn.shopify.com/s/files/1/0741/5378/7685/files/AIRBOT_Fenix_G4_35amp_AM32_Aio_pinout.pdf?v=1692993975) for reference

## LEDs

The board has 16 RGB LEDs on it, 4 on each corner. There's a small set of bridge pads that you solder together to enable them, and they can be fully controlled through Betaflight. They're pretty small, but are more than bright enough! I love to cram LEDs into my builds, but micros generally don't have the space for them. This board solves that problem, and I love it!

<video controls>

<source src="/uploads/airbot_fenix_leds.mp4" type="video/mp4">

</video>

# Closing Thoughts

This board is really cool. To have Airbot of all the manufacturers come back with something like this is great to see. They have a couple of other boards in the works, and I can't wait to review them as well! For now, this is the only one publicly available of the future lineup, and I highly recommend it. It's a great board for anything from a 3.5" freestyle build, cinewhoop, or even an ultralight 5-6".
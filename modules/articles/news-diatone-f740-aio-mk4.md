---
title: Diatone F740 AIO MK4
description: It's an AIO, but it's also a stack!
visible: true
category: News
author: VitroidFPV
img: https://cdn.shopify.com/s/files/1/0027/2708/4144/products/740WIFI_1_0659288a-3e16-40a2-839b-3b3b8b89ac38_700x.jpg?v=1668576983
date: 2022-11-17T14:14:24.309Z
---

When I first saw this announced, I thought it was a full-on stack with 25x25
mounting... but it's not a full-on stack! Diatone has picked an interesting approach with
their new top-end 25x25 AIO, choosing to add an additional I/O board on top


![diatone f740 aio wifi](https://cdn.shopify.com/s/files/1/0027/2708/4144/products/740WIFI_1_0659288a-3e16-40a2-839b-3b3b8b89ac38_700x.jpg?v=1668576983 "diatone f740 aio wifi")


![diatone f740 aio ](https://cdn.shopify.com/s/files/1/0027/2708/4144/products/740BASIC_3_700x.jpg?v=1668576983 "diatone f740 aio ")


# So what even is this thing?


High-end AIOs have often struggled to fit everything cleanly into one board while keeping the durability high and still offering basic features. We had things like the Flywoo EVO 20x20 boards that went far over the 20x20 mounting just to get that much-needed room


![flywoo evo aio](https://cdn.shopify.com/s/files/1/0010/7410/2324/products/2_6a17edbc-bd1c-47c3-96c3-96b08d0037bd_600x.jpg?v=1630480882 "flywoo evo aio")


Diatone went the opposite way. Instead of increasing the board space horizontally, they just added another board on top. This gives the AIO a lot of extra room for bigger FETs on the ESC to allow for more current, while not sacrificing on features. Speaking of, let's look at the specs


# Specs


With the added room, this thing is packed with a lot of cool stuff, including a heatsink!


* STM32F722 MCU

* ICM-42688-P Gyro

* Barometer, and a 16MB flash chip

* 6 full UARTs, I2C, 4 motor outputs, and DJI PnP

* 40A BlHeli_32 ESCs with 45A burst

* 3.3V 0.5A and 5V 2A voltage regulators, and  TVS protection

* WiFi for configuration (on the WiFi model)


The last point is pretty important. I don't think I've ever seen an AIO with such specs that can also be connected via WiFi. By the looks of things, I ***think*** the top daughter board *might* be optional. From the diagram it looks like the main board has a DJI PnP plug, a full UART, and even I2C. This would theoretically be enough for a minimal setup. If it is possible as an option, I think that's pretty cool


![minimal aio](/uploads/diatone_f740_minimal_1.png "minimal aio")


The second top board also uses a standard ribbon connector, someone dedicated enough would probably be able to DIY a different daughter board for it


# Final thoughts


Okay, obviously, this AIO is not for everyone. It's expensive ($93.99 for the Basic version, $99.99 for the WIFI one), overkill for most micros, yet likely not enough for a full heavy 5" quad. Where I think this will excel would be cinewhoops or light weight 4-5" quads. The extra UARTs make it nice for using a lot of different peripherals. Most people won't have use for that many, but those who do will be really thankful for such an option


You can currently get it directly from Diatone [here](https://www.diatone.us/collections/aio/products/mb-mk4-f740-aio?variant=40034883207255) with a discount to $74.99 until 22/11

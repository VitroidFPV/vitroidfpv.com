---
title: AT32 FCs are coming
description: What is AT32? And why is it such a big deal?
visible: true
category: News
author: VitroidFPV
img: /uploads/at32_image.png
date: 2023-03-12T22:06:36.365Z
---

<script>
	import Tablist from "$components/articlesPage/Tablist.svelte";
	import Tab from "$components/articlesPage/Tab.svelte";
	import Admonition from "$components/articlesPage/Admonition.svelte"
</script>

The first and the biggest question out of the way first:

<Admonition type="info" title="">

# What the hell is AT32?

AT32 is a series of ARM-based MCUs, much like the STM32 you may be used to seeing. Manufactured by ArteryTek, they are a cheaper, smaller, and in some cases more powerful alternative to the STM32. You may have seen them in ESCs, but they are also being used in flight controllers. So what does that mean for the hobby?

</Admonition>


# The Issues With STM32

STM32-based FCs have been pretty much the standard, be that in FCs or anywhere else. Or at least, they were... Until the little-known event that is commonly known as the "global silicon shortage" which started early to middle of 2020. This shortage caused a surge of large automotive and other industrial manufacturers to order and back-order hundreds of thousands, if not more than millions of these chips, and the production of the chips themselves seize. This of course affected the FPV hobby as well. 

Suddenly, all of the manufacturers you know had a real issue sourcing these chips. Most had some backup stock, but it was not going to go on forever. What may have not been super obvious to most people at the time was a very real possibility that the STM32 chips may not be available for a long time. Innovation in the hobby was at a standstill.

Luckily, the shortage started to ease up a bit, but another issue arose. While you may have been able to get your hands on a couple of STM32 chips, they were not cheap. The price of the chips had skyrocketed, and the manufacturers had to pass that cost on to the end user. Some manufacturers turned to lower-end variants (F411 on modern full-size FCs was a sight to behold with some level of odd curiosity), but that was not ideal in the long run. So for the most part, the price went up.

What you also may not have even paid any sort of thought to was that not only FCs affected by this. ESCs were affected too, but at that point, most were either using lower-end STM32 chips or some cheaper alternatives. Most people didn't notice, but others were quick to point out an "unknown" chip here and there. That brings us to...

# Introduction of AT32

As mentioned with the ESCs, most manufacturers went directly for alternative or even straight clone chips. To the end users, this was often nothing of note. After all, ESCs aren't doing as much computational work as flight controllers, so the performance difference was negligible.

The AT32 chips (as I wrote above) are not direct clones. They offer a significant performance boost over the equivalent STM32 chips while being a lot cheaper.

![STM32F405 price](/uploads/stm32f405_price.png)
![AT32F435 price](/uploads/at32f435_price.png)

The AT32F435 is roughly equivalent to the STM32F405, but it's a lot cheaper. So you'll see it coming to budget/midrange FCs, but there are currently no F7 or H7 equivalents.

They also happen to have much smaller package sizes with comparatively high performance. Where STM32F411 chips are used, they do not offer a lot of features and computing power, so it's always a trade-off with the F411-based boards. AT32 chips, on the other hand, offer what you would expect from a modern flight controller, and then some. So you may be getting a significant performance boost even for your smallest crafts.


# Where are we now?

## AT32 Support

The performance advantage comes at a cost however, they were not a direct one-on-one replacement for the STM32 chips. While they may be *mostly* directly pin-compatible, the code had to be changed in some places to accommodate for the differences. But there has been a lot of work done by the developers to bring it even closer to completion.

Looking through the [Betaflight repo](https://github.com/betaflight/betaflight), you can see a lot of the work that has been done to bring AT32 support to Betaflight. DShot support, flash memory, and even lower-level stuff like I2C, SPI, ADC, and more have needed to be changed.

First AT32 boards are being made and sent to the developers, and as mentioned, progress on getting full support is in full swing. I can't give an exact date, nor mention any specific manufacturers, but I can say that some of the larger manufacturers are working on it.

## Current State of STM32

With Betaflight 4.4 introducing the cloud build system, MCUs that may have been dropped in coming releases due to flash space limitations are now still decent options. Other STM32 chips apart from the main five or so (F411, F405, F722, F745/F765 and H743) are being explored and worked on, and the price is coming down a bit (though still not what it used to be). So the AT32 chips will be a nice addition, not a replacement out of dire necessity, at least for now.

## What's up With Other Alternatives?

As mentioned, ESCs were moving towards other alternatives very quickly. These alternative chips are usually not talked about in ESCs, but some have made it into wing flight controllers... with [not much success](https://discuss.ardupilot.org/t/jumper-xiake-800-flight-controller/93380/203). Similar to the CKS32 chips mentioned in the thread, GD32 chips were used in ESCs before AT32 and were also problematic. AT32 chips are not the first alternative, but they are the first that seem to be working out well.
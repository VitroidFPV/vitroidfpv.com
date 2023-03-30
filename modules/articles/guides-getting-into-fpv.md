---
title: Getting into FPV
description: The (more or less) definitive guide into FPV
category: Guides
author: VitroidFPV
img: /uploads/nazgul-evoque-f5d-analog-1000x1000.jpg
date: 2022-11-08T19:05:19.289Z
updated: 2023-03-30T22:06:00.000Z
visible: true
---

<script>
	import Tablist from "$components/articlesPage/Tablist.svelte";
	import Tab from "$components/articlesPage/Tab.svelte";
	import Admonition from "$components/articlesPage/Admonition.svelte"
</script>


# Before you buy

There are quite a lot of things that are important to know before even looking at actual products. In this article, I will at least try to list all of the important info you need to know when starting out

<Admonition type="note" title="Price">

## FPV is expensive


I feel like this is the most important thing to get out of the way. Having unrealistic price expectations that are then hard/impossible to achieve is the fastest way to get turned away. All the different prices are explained in the FAQ, but the main point is: 


The minimal upfront cost to get a quad and all the equipment needed to get it in the air is about $300, and another $300 if you want to have something that will carry a full-size action camera like a GoPro. It could be cheaper, but most things that will take the price lower than that are usually not worth buying 

</Admonition>

## Do your research


As is with buying a car, a PC, a phone, or any other electronic device, you should know what you're buying, and what the basic names and terms mean. 


Watch build guides (ideally not ones that are over 2 years old if you're looking for parts recommendations as well), setup tutorials, and reviews to get an idea of what you need/want to buy. 


I go into more detail about this a little further down, but you should also get at least 10h of sim time to see what kind of flight style you may prefer, to practice before flying in real life, and to see if FPV is even something you'd enjoy


If you're unsure about your findings, don't know what something means, or just want opinions, it's fine to ask. That leads us to... 


## Asking for help


A good rule of thumb is that if it can't be found on Google in less than a minute, it's probably something worth asking others. There are many places where you can get help, be it forums, Reddit communities (r/fpv, r/multicopter), or Discord servers ([Mr Steele](https://discord.gg/fpv), [Drone Community](https://discord.gg/drones)). Before you ask, there are a few things that you should know: 


1. Ask in the appropriate way and/or place - most forums/discord servers have dedicated places for specific questions. Putting your questions in the appropriate place will go a long way for the people that help out others

2. There are no stupid questions - it's perfectly okay to not know something. Don't be afraid to ask, or worry that you're annoying others. It's better to just ask what you want rather than just going in blind and spending a lot of money on bad equipment

3. There are good and bad ways to ask - First of all: https://dontasktoask.com/ is a great page to show how not to approach things. This basically means that you shouldn't ask:

	> hey guys can anyone help me with something?

	Instead, when asking, you should go straight to the point. Explain what you want to know, what you've done/found out so far, and any other ideas that you may have
4. On chat platforms like discord, don't mention (multiple) people unless it's specifically allowed. Don't send direct messages out to people who offer help, keep it in one place, and be patient if someone doesn't immediately respond. Someone will eventually see your questions, it's rude to be impatient at volunteer helpers, people have their own lives

5. Please pick a time when you're available. It's rude to start an entire help conversation and then just not reply back for hours on end, or when you don't even have access to the equipment you're trying to troubleshoot


# Choosing what to buy


Before you go invest your time, effort, and money into the hobby, making educated decisions goes a long way to prevent overspending/buying bad gear, and keeping your sanity


## Stuff to stay away from


Sadly there are many manufacturers that make less-than-desirable, or even outright dangerous products. This is often hard to spot as a beginner. I will list some manufacturers/products below that shouldn't be considered unless specifically said otherwise: 


* Eachine - with the exception of the EV800D goggles and some products that they only re-brand, most of their products are low in quality at best. Namely the EV100 goggles, and the Wizzard/Tyro series drones, which are unfortunately still the among the highest on banggood. The EV100 tend to overheat and go out of RF calibration, sometimes even melting the plastics and starting to burn. The Wizard/Tyro quads are often unreliable at best, the electronics are known to just stop working or even catch fire out of nowhere

* Racerstar - their electronics may be cheap, but they're extremely unreliable, often failing in highly destructive ways. The motors are outdated, not durable at all, and tend to be inefficient

* ZOP LiPo's - Mostly a brand sold on Banggood, their batteries have pretty much no quality control. Don't cheap out on stuff that can burn your house down, and don't buy from a brand that has a reputation for selling dangerous products

* IMAX B6 chargers (and their various clones) - The original B6 charger is already known to be more or less a fire hazard. The clones are even worse in this aspect. If you see a charger that looks something like this, it's not worth it

![imax b6 charger (bad)](/uploads/4518_imax-b6-50w.jpg "imax b6 charger (bad)")

* BetaFPV LiteRadio 2 - BetaFPV has a decent reputation for their micro quads and inexpensive beginner equipment. The LR2 might seem like a good budget option (and the LiteRadio 3 is actually acceptable), but the LiteRadio 2 has very bad gimbals that tend to fail within about a month of use - you'll start to see the stick signal start to jitter, or even just drop out completely


Those are just a few extremes off the top of my head, if you're unsure about something, it's **always** better to ask


## Stuff to look for


I wouldn't want to tell you what *not* to get and then just stop there. FPV is not all just caution about products, there are manufacturers that have a very clean track record


* Radiomaster - Their TX16S radio is arguably the best radio on the market, and their products are generally very good. They also have a very good reputation for customer support

* Rush - Great VTXs and stacks, can't really go wrong with them

* Happymodel - Known for micro quads, and likely the original widely-used ELRS hardware which they still continue to improve

* Diatone - A whole ton of great products, from frames, stacks to motors. Wide range of price points all with good quality

* IFlight - Great frames, motors, ESCs, and flight controllers. Their electronics are good, but they're a bit more expensive than other options

* TMotor - Great motors, and their ESCs are also very good. They're a bit more expensive than other options, but they're mostly all worth it

* Foxeer - Mostly known for their wide variety of cameras, but they have recently branched out to video transmitters and FCs/ESCs, which are also very good


There are many more manufacturers that make good products, but these are the ones that I've had the most experience with. If you have any suggestions, feel free to let me know or make a pull request on the GitHub repo


## What to actually buy


Now that you know what to avoid and what to get, it's time to actually buy stuff. I will try to list the most important things that you need to get started, and then go into more detail about the different parts. Most of this info is also in the [FAQ](/faq#Building), but I will try to explain it in a short and concise way here, while also giving some specific product recommendations


1. A radio - The first thing you should buy when starting FPV is a good radio. It will allow you to put in some sim time while waiting for the rest of your gear, and most modern ones do not require any additional things to run, except batteries. I would absolutely go with ELRS if possible (ELRS is a low-cost long-range, high-performance, open-source RC link protocol. This means that radio signal goes very far, very fast, and for very cheap). All of the radios listed below have ELRS versions

	<!-- * Radiomaster Zorro - Small gamepad style radio
	* Radiomaster TX12 MK II - Small radio with a more traditional shape
	* Radiomaster TX16S MK II - The best radio on the market, if you can afford it

	![Radiomaster radios](/uploads/radiomaster_radios.png "Radiomaster radios") -->
	<Admonition type="tip" title="Sim Time">

	At least 10 hours of sime time is recommended. This can vary from person to person, so if you feel like you're not making much progress, you can always do more. The more you practice, the better you'll get. If you want to know what sim to use, you can find a couple of recommendations [here](https://www.vitroidfpv.com/faq#sim)

	</Admonition>

2. The quad itself - Depending on if it is a pre-built or not, it may take you a week or more to get all the parts, build it and set it up. This mostly applies for self-built quads, but even pre-builts will take some setup time

	<!-- * [Happymodel Mobula 6/7](https://www.racedayquads.com/products/happymodel-bnf-mobula6-elrs-65mm-brushless-whoop-choose-rx) - The best micro quad on the market, great cheap option for flying indoors and lightly outdoors as well ($101.99)
	* [Happymodel Crux 3](https://www.getfpv.com/happymodel-crux3-1s-elrs-3-toothpick-racing-drone-bnf.html) - A good 1s toothpick, great for flying outdoors in your backyard or at a park ($118.89)
	* [DarwinFPV Babyape Pro V2](https://www.racedayquads.com/products/darwinfpv-baby-ape-pro-v2-3-quad-choose-version?keyword=darwindpv%20bab) - Pretty much the cheapest quad that you can get that is actually good. It runs on 3s, so you will need a proper charger for it, unlike the other two that can use a simple 1s one ($111.99)
	* [HGLRC Petrel 120X](https://www.hglrc.com/collections/toothpicks/products/hglrc-petrel-120x-3-inch-toothpick-machine-fpv-racing-drone-zeus5-aio-flight-controller-1202-5-motor-vtx-350mw4s-6s) (Specifically the 4s version) - A great pick if you're looking for something with a lot of power in this smaller size, and also the first one to have an option for DJI Digital. However, it is more expensive, and will need a proper charger ($159.99)
	* Self-built micro quad - If you're looking for something that you can build yourself, I have a [guide](https://vitroidfpv.com/building) on how to build one. It's a bit more expensive than the pre-built options, but you can customize it to your liking and it will teach you a lot about how quads work and go together
	* [IFlight Nazgul 5 V2/Evoque](https://shop.iflight-rc.com/nazgul5-v2-4s-6s-fpv-drone-bnf-pro1306) - Moving up to full-size 5" quads, these are great options for both DJI and Analog. The Nazgul 5 V2 is cheaper, the Evoque is newer, but more expensive. Both are good entry-level quads that can haul a full-size GoPro ($259.99+)
	* Self-built 5" quad - I have build guides for 5" quads as well, currently a Beginner, Advanced, or a Race build. You can find them [here](https://vitroidfpv.com/building) ($230+) -->

3. Tools, spare parts, and other accessories - You will need [tools](https://vitroidfpv.com/faq#tools) to build, maintain, and fix up your quad, and some [spare parts and other odd bits](https://vitroidfpv.com/faq#accessories) to replace broken ones if needed

4. Batteries and a charger - You can't fly without batteries, and you can't charge them without a charger. They're not esential to the setup, but you will need them to actually fly and set up the ESC

	<!-- * [ViFly Whoopstor V2](https://www.getfpv.com/vifly-whoopstor-v2-6-port-1s-battery-charger-and-discharger-lihv-lipo.html) - Pretty much the best 1s charger you can get. Unlike with most 1s options, it comes with both PH2.0 and BT2.0 connectors, a discharge/storage option, an OLED display for voltage readout, and being able to power it from USB C ($29.99
	* [ToolkitRC M4AC](https://www.getfpv.com/toolkitrc-m4ac-30w-2-5a-compact-ac-balance-charger-xt30.html) - A decently cheap 4s charger that can be plugged straight into the wall and charge up your micro batteries, comes in both XT30 and XT60 options
	* [ToolkitRC M7](https://www.getfpv.com/toolkitrc-m7-200w-10a-2-6s-multifunctional-balance-charger.html) - IMO the best way to go without spending too much. An all-round good charger, with a lot of neat features as well. Kep in mind that you will need a [PSU](https://www.getfpv.com/toolkitrc-adp100-100w-20-0v-5a-power-supply-unit-w-xt60-output.html) for it as well
	* [Hota P6](https://www.getfpv.com/hota-p6-600w-15a-1-6s-dc-smart-charger.html) - Hota chargers are pretty much the best you can get. Less fancy features, but they have a pretty much spotless track record. Similar to the ToolkitRC M7, it needs an external PSU, you can use the same one
	* [Hota D6 Pro](https://www.getfpv.com/hota-d6-pro-325w-15a-1-6s-dual-channel-ac-dc-smart-charger-w-wireless-charging.html) - Likely the best charger you can get if you have the money to spare. An actual usable integrated PSU makes it one of the few good "AIO" chargers on the market -->

5. Goggles - You can fly without goggles, but it's usually a lot harder. You can build and set up the quad while waiting for your goggles to arrive, leaving you with a lot fewer steps of setup to do when you get them

	<!-- * [Eachine EV800D](https://www.getfpv.com/eachine-ev800d-5-8g-40ch-diversity-fpv-goggles-with-dvr.html) - The best budget option and the one I recommend to most people. They're not the best, but they're good enough for most people who are just starting out ($119.99)
	* [Skyzone Cobra S/X](https://www.racedayquads.com/products/skyzone-cobra-x-v2-diversity-5-8ghz-fpv-goggles-w-60-fps-dvr?keyword=skyzone%20cobra) - The best box goggles on the market, but also the most expensive in this category ($249.99)
	* [Skyzone Sky 02o](https://www.racedayquads.com/products/skyzone-sky020-fpv-goggles-white?keyword=skyzone%20sky) - Cheapest usable slimline goggles you can get, but they have a fairly low FOV which may be a problem for some people ($234.99)
	* [Eachine EV300o](https://www.banggood.com/Eachine-EV300O-1024x768-5_8Ghz-48CH-OLED-HD-3D-FPV-Goggles-Diversity-RX-Built-in-DVR-60fps-Headtracker-Focal-Adjustable-for-RC-Racing-Drone-p-1705594.html?createTmp=1&ad_id=&cur_warehouse=USA&ID=6290661) - Pretty much just a re-branded pair of Skyzone goggles that are pretty similar to the following 04L/X ($399)
	* [Skyzone Sky 04L/X](https://www.getfpv.com/skyzone-sky04l-v2-lite-lcos-5-8ghz-48ch-fpv-goggles-w-steadyview-receiver.html) - The best slimline goggles on the market, but also the most expensive in this category. The 04L use slightly worse screens, but are cheaper ($379.99/$589.99)
	* [DJI FPV Goggles](https://www.getfpv.com/dji-fpv-goggles-v2.html) - You'll need these if you want to get a quad with a DJI Digital VTX. The digital system is expensive, but allows for much better image quality. You can read more about the difference [here](https://vitroidfpv.com/faq#fpvSystemDifference) ($429) -->

You can find some recommendations for different price points below. They may intersect with each other a bit, but some things just fit into multiple price ranges. Feel free to mix and match items from the different price ranges, to a certain extent. For example, you can get a cheap radio and a more expensive set of goggles, or a cheap set of goggles and a more expensive radio

<Tablist>
<Tab title="$350 - $450" open>

Some of the most basic things to get you started. Tinywhoops or toothpicks, and an inexpensive radio and goggles. You can get a lot of fun out of these, and they're a great way to get into the hobby

1. Radios: 
	* [Radiomaster TX12 MK II](https://www.getfpv.com/radiomaster-tx12-mkii-2-4ghz-16ch-radio-transmitter-w-hall-gimbals-elrs.html) ($99.99) - A great compact radio with a lot of things that are possible to upgrade in the future
	* [Radiomaster Zorro](https://www.getfpv.com/radiomaster-zorro-radio-controller-elrs.html) ($129.99) - Similar in features to the TX12, but has a game controller style layout, so it's a bit more ergonomic if you're used to that
2. Goggles:
	* [Eachine EV800D](https://www.getfpv.com/eachine-ev800d-5-8g-40ch-diversity-fpv-goggles-with-dvr.html) ($119.99) - The best (and likely only good) budget option at this price. They're not the best, but they're good enough for most people who are just starting out
	* [Skyzone Cobra S/X](https://www.racedayquads.com/products/skyzone-cobra-x-v2-diversity-5-8ghz-fpv-goggles-w-60-fps-dvr?keyword=skyzone%20cobra) ($249.99) - The best box goggles on the market, but also the most expensive in this category
3. Quads:
	* Happymodel Mobula6/7 ($99.99) - Pretty much the standard beginner recommendation. They're great for learning, given that they're pretty durable, and a lot of fun to fly indoors even if you move onto something bigger later on
	* [Happymodel Crux3](https://www.getfpv.com/happymodel-crux3-1s-elrs-3-toothpick-racing-drone-bnf.html) ($118.99) - A good 1s toothpick, great for flying outdoors in your backyard or at a park. Being a 1s quad, it's still pretty cheap to maintain
	* [DarwinFPV Babyape Pro V2](https://www.racedayquads.com/products/darwinfpv-baby-ape-pro-v2-3-quad-choose-version?keyword=darwindpv%20bab) ($111.99) - If you're after something more durable and/or faster, it's not a bad optino. It runs on 3s, so you will need a proper charger for it, unlike the other two that can use a simple 1s one

4. Chargers:
	* [ViFly Whoopstor V2](https://www.getfpv.com/vifly-whoopstor-v2-6-port-1s-battery-charger-and-discharger-lihv-lipo.html) ($29.99) - Pretty much the best 1s charger you can get. Unlike with most 1s options, it comes with both PH2.0 and BT2.0 connectors, a discharge/storage option, an OLED display for voltage readout, and being able to power it from USB C
	* [ToolkitRC M4AC](https://www.getfpv.com/toolkitrc-m4ac-30w-2-5a-compact-ac-balance-charger-xt30.html) ($29.99) - A decently cheap 4s charger that can be plugged straight into the wall and charge up your micro batteries, comes in both XT30 and XT60 options
	* [ToolkitRC M7](https://www.getfpv.com/toolkitrc-m7-200w-10a-2-6s-multifunctional-balance-charger.html) ($39.99) - IMO the best way to go without spending too much. An all-round good charger, with a lot of neat features as well. Kep in mind that you will need a [PSU](https://www.getfpv.com/toolkitrc-adp100-100w-20-0v-5a-power-supply-unit-w-xt60-output.html) for it as well

5. Batteries:

	This will be less of a specific product recommendation, and more of a general guideline for the different batteries to get for each quad I listed above. There are simply too many individual battery options to list every different one

	Just as a general rule of thumb, you should get at least 2 batteries for each quad, and ideally even more. I'd recommend batteries from GNB, CNHL, or DOGCOM

	* Happymodel Mobula6/7: 1s 300mAh - 500mAh
	* Happymodel Crux3: 1s 450mAh - 650mAh
	* DarwinFPV Babyape Pro V2: 3s 450mAh - 650mAh

	All ideally 75C or higher

</Tab>

<Tab title="$450 - $600">

Starting to get into more expensive options, you start to see more performant quads, and higher-end equipment. Also a good place to start if you're looking to fly with a small HD camera

1. Radios:
	* [Radiomaster TX12 MK II](https://www.getfpv.com/radiomaster-tx12-mkii-2-4ghz-16ch-radio-transmitter-w-hall-gimbals-elrs.html) ($99.99) - A great compact radio with a lot of things that are possible to upgrade in the future
	* [Radiomaster Zorro](https://www.getfpv.com/radiomaster-zorro-radio-controller-elrs.html) ($129.99) - Similar in features to the TX12, but has a game controller style layout, so it's a bit more ergonomic if you're used to that
	* [Radiomaster Boxer](https://www.getfpv.com/radiomaster-boxer-radio-transmitter-4-in-1-multi-protocol-cc2500-elrs-2-ghz.html) ($139.99) - Similar in siz to the TX12, but has the full size gimbals you will find on a full size radio
	<!-- * [Radiomaster TX16S mk II](https://www.radiomasterrc.com/products/tx16s-mark-ii-radio-controller) ($199.99) - Likely the best radio you can get, and to last you for a long time. It's a bit more expensive, but it's also a lot more capable, and has some really nice extra features, including a color touch screen -->
2. Goggles:
	* [Eachine EV800D](https://www.getfpv.com/eachine-ev800d-5-8g-40ch-diversity-fpv-goggles-with-dvr.html) ($119.99) - The best (and likely only good) budget option at this price. They're not the best, but they're good enough for most people who are just starting out
	* [Skyzone Cobra S/X](https://www.racedayquads.com/products/skyzone-cobra-x-v2-diversity-5-8ghz-fpv-goggles-w-60-fps-dvr?keyword=skyzone%20cobra) ($249.99) - The best box goggles on the market, with better ergonomics and a better screen than the EV800D, with room for easy VRX upgrades in the future
	* [Skyzone Sky 02o](https://www.getfpv.com/skyzone-sky02o-oled-5-8ghz-fpv-goggles-w-steadyview-diversity-rx.html) ($319.99) - Cheapest usable slimline goggles you can get, but they have a fairly low FOV which may be a problem for some people
3. Quads:
	* [HGLRC Petrel 120X 4s](https://www.hglrc.com/collections/toothpicks/products/hglrc-petrel-120x-3-inch-toothpick-machine-fpv-racing-drone-zeus5-aio-flight-controller-1202-5-motor-vtx-350mw4s-6s) ($159.99) - A great pick if you're looking for something with a lot of power in this smaller size, and also the first one to have an option for DJI Digital. Great for larger backyards and parks
	* [Happymodel Crux35](https://www.getfpv.com/happymodel-crux35-4s-analog-freestyle-racing-drone-w-caddx-ant-camera.html) ($144.99) - An extra half inch may not sound like much, but it'll handle a standalone HD camera (Runcam Thumb Pro, Insta360 Go2, naked gopro) a lot better, and fly more like a regular 5" quad
4. Chargers:
	* [ToolkitRC M7](https://www.getfpv.com/toolkitrc-m7-200w-10a-2-6s-multifunctional-balance-charger.html) ($39.99) - IMO the best way to go without spending too much. An all-round good charger, with a lot of neat features as well. Kep in mind that you will need a [PSU](https://www.getfpv.com/toolkitrc-adp100-100w-20-0v-5a-power-supply-unit-w-xt60-output.html) for it as well
	* [Hota P6](https://www.getfpv.com/hota-p6-600w-15a-1-6s-dc-smart-charger.html) ($79.99) - Hota chargers are pretty much the best you can get. Less fancy features, but they have a pretty much spotless track record. Similar to the ToolkitRC M7, it needs an external PSU, you can use the same one
5. Batteries
	This will be less of a specific product recommendation, and more of a general guideline for the different batteries to get for each quad I listed above. There are simply too many individual battery options to list every different one

	Just as a general rule of thumb, you should get at least 2 batteries for each quad, and ideally even more. I'd recommend batteries from GNB or CNHL

	* HGLRC Petrel 120X 4s: 4s 450mAh - 750mAh
	* Happymodel Crux35: 4s 750mAh - 1000mAh
	
	Ideally 75C or higher

</Tab>

<Tab title="$600-$1000">

Now going firmly into the 5" analog quad setups, you'll find a range of radios going from budget to high-end, and nice slimline goggles

1. Radios:
	<!-- * [Radiomaster TX12 MK II](https://www.getfpv.com/radiomaster-tx12-mkii-2-4ghz-16ch-radio-transmitter-w-hall-gimbals-elrs.html) ($99.99) - A great compact radio with a lot of things that are possible to upgrade in the future -->
	* [Radiomaster Zorro](https://www.getfpv.com/radiomaster-zorro-radio-controller-elrs.html) ($129.99) - Similar in features to the TX12, but has a game controller style layout, so it's a bit more ergonomic if you're used to that
	* [Radiomaster Boxer](https://www.getfpv.com/radiomaster-boxer-radio-transmitter-4-in-1-multi-protocol-cc2500-elrs-2-ghz.html) ($139.99) - Similar in siz to the TX12, but has the full size gimbals you will find on a full size radio
	* [Radiomaster TX16S mk II](https://www.radiomasterrc.com/products/tx16s-mark-ii-radio-controller) ($199.99) - Likely the best radio you can get, and to last you for a long time. It's a bit more expensive, but it's also a lot more capable, and has some really nice extra features, including a color touch screen
2. Goggles:
	* [Skyzone Sky 02o](https://www.getfpv.com/skyzone-sky02o-oled-5-8ghz-fpv-goggles-w-steadyview-diversity-rx.html) ($319.99) - Cheapest usable slimline goggles you can get, but they have a fairly low FOV which may be a problem for some people
	* [Fatshark Attitude V6](https://www.getfpv.com/fat-shark-attitude-v6-fpv-goggles.html) ($349.99) - Going up in price a little gets you a much larger FOV, and screens with higher resoltion, to allow a future transition to a digital system
	* [Skyzone Sky 04L](https://www.getfpv.com/skyzone-sky04l-v2-lite-lcos-5-8ghz-48ch-fpv-goggles-w-steadyview-receiver.html) (379.99) - Very similar to the Attitude V6, but they come with a better integrated video receiver
	* [Skyzone Sky 04X](https://www.getfpv.com/skyzone-sky04x-v2-oled-5-8ghz-48ch-fpv-goggles-w-steadyview-receiver.html) ($589.99) - Likely the best purely-analog goggles you can get. They have a very large FOV, focus adjustment, and really nice OLED screens
	* [HDZero Goggle](https://www.hd-zero.com/product-page/hdzero-goggle) ($599.99) - Technically not an analog goggle, but weirdly enough it may be the best at at it. While it is meant to be used with the HDZero digital system, it has a deinterlacer for the video feed, giving it a very nice image quality
3. Quads:
	* [IFlight Nazgul 5 V2](https://shop.iflight-rc.com/Nazgul5-Analog-V2-6S-BNF-Pro1820) ($259.99) - The Nazgul 5 V2 is a long-proven quad that is still very popular, and IFlight continues to update it
	* [IFlight Nazgul Evoque](https://shop.iflight-rc.com/Nazgul-Evoque-F5-6S-Analog-BNF-Pro1821) ($309.99) - A newer version of the Nazgul 5, with a few improvements, both in terms of components and design. It has better motors, flight stack, but weirdly a less powerful VTX
	* [GEPRC Mark5](https://geprc.com/product/geprc-mark5-analog-freestyle-fpv-drone/) ($349.99) - In my opinion you are overpaying a little too much for the Mark5, but a lot of people really like it. It has a stack that supports wireless configuration, and a powerful 1.6W VTX
	* Self-built 5" quad - I have build guides for 5" quads as well, currently a Beginner, Advanced, or a Race build. You can find them [here](https://vitroidfpv.com/builds) ($230+)
4. Chargers:
	* [ToolkitRC M7](https://www.getfpv.com/toolkitrc-m7-200w-10a-2-6s-multifunctional-balance-charger.html) ($39.99) - IMO the best way to go without spending too much. An all-round good charger, with a lot of neat features as well. Kep in mind that you will need a [PSU](https://www.getfpv.com/toolkitrc-adp100-100w-20-0v-5a-power-supply-unit-w-xt60-output.html) for it as well
	* [Hota P6](https://www.getfpv.com/hota-p6-600w-15a-1-6s-dc-smart-charger.html) ($79.99) - Hota chargers are pretty much the best you can get. Less fancy features, but they have a pretty much spotless track record. Similar to the ToolkitRC M7, it needs an external PSU, you can use the same one
	* [Hota D6 Pro](https://www.getfpv.com/hota-d6-pro-325w-15a-1-6s-dual-channel-ac-dc-smart-charger-w-wireless-charging.html) ($$124.99) - Likely the best charger you can get if you have the money to spare. An actual usable integrated PSU makes it one of the few good "AIO" chargers on the market
5. Batteries:

	This will be less of a specific product recommendation, and more of a general guideline for the different batteries to get for each quad I listed above. There are simply too many individual battery options to list every different one

	Just as a general rule of thumb, you should get at least 2 batteries for each quad, and ideally even more. I'd recommend batteries from GNB or CNHL

	* Any of the 5" quads - 6S 1100mAh - 1500mAh, at least 75C
	
</Tab>
</Tablist>

# After buying

Assuming that you have bought everything, it's time to actually set it up. This is a very important step, and you should take your time to do it right. If you rush it, you may end up with a quad that is not safe to fly, or just won't fly at all. I'll try to go through the steps in a logical order, but you may need to go back and forth between them a few times if you're stuck on something. If you're having trouble, feel free to ask for help in the discord servers like [Mr Steele](https://discord.gg/fpv) or [Drone Community](https://discord.gg/drones)

## Verify that everything works


* Charge up the radio and make sure that it will connect to your computer and that the sticks work. You can do that in a simulator, and get straight to practicing

* Plug the flight controller into your computer, and make sure that it will connect to Betaflight and that the gyro works before soldering stuff

* Charge your goggles and make sure that they turn on and that the screen works/isn't broken (if you have DJI, you can also update (and activate them) if needed)

* Plug the batteries into your charger and make sure that they came charged to storage voltage (around 3.7-3.85v/cell) if the charger supports voltage readout. If not, you can use a multimeter to check the voltage. Once you know they're safe to use, you can charge them to full if you know you'll be needing them soon


## Assemble it

Most important for self-built quads (duh, lol), but at times even a pre-built quad will require some assembly, like soldering on your own receiver or other hardware. You should also always make sure that every screw on the quad is tight

## Setup it up

This is where you will set up the quad to fly. You will need to set up your radio, flight controller, VTX, ESC, receiver, and goggles to have them all communicate properly

* Radio - You will need to [bind](https://vitroidfpv.com/faq#receiverBind) your radio to your receiver, and [set up the mixers](https://vitroidfpv.com/faq#mixer) to include the switches and sliders that you want to use

* Flight controller - You will need to set up the FC to have the right settings for your quad. This usually involves setting up the receiver settings so that Betaflight can read the signals, setting up the motors and ESC so that the FC can talk to it and spin the motors in the right direction, and setting up the VTX so that the FC can control its settings like output power and frequency. With the necessary settings out of the way, you can go make the more personal changes such as OSD layout, modes, and PID tuning (if you understand what you're doing)

* ESC - If you have a BlHeli_S ESC, you should flash it with BlueJay firmware to get the most out of it (like bidirectional DShot and higher motor PWM frequencies). If it's a BlHeli_32 ESC, those features should already be in the stock firmware (unless it's really old)

* Goggles - If you're on analog, the process is pretty simple. You just need to set them to the same band and channel as the VTX, as analog doesn't need any kind of binding. If you're on DJI, you will need to pair the goggles to the VTX


## Fly it

So now you hopefully have it working, and you can finally go fly it! Yay! But not so fast, you should still do a few checks before you go out and fly

* Put the props on the right way, that they're not hitting anything, and that they're on tight enough to not spin/fly off

* Make sure that the battery is charged up fully (4.2v/cell for flight)

* Absolutely make sure that you're in a safe area to fly, and that you're not going to fly over people or anything like that if something goes wrong (wrong gyro orientation, bad PID tuning or bad motor/prop direction causing a flip on take off or even a flyaway, etc)

* If all of that is good, you can go fly! Have fun, and try to not immediately crash it

* If all of that is not good, continue reading further


## It doesn't fly, what to do?

There are a few things that can cause your quad to not fly, and you should go through them one by one to figure out what's wrong. I'll list a few common problems and how to fix them

* Motors won't spin at all - Likely from the FC not being set up with the correct ESC protocol. It should be DShot300 or DShot600 for most setups

* Motors won't slow down after applying throttle - This is likely because you don't have the props on, answered [here](https://vitroidfpv.com/faq#iTerm)

* Motors spin up, but the quad doesn't move as expected (flips/spins) - Often because the motors are spinning in the wrong direction, the gyro being misaligned, or the props being on the wrong way. You can change the motors in the motors tab in Betaflight. While you're there, the FC also expects the motors to spin in a certain direction and order, make sure that's correct and if needed, change it. Don't forget to remove the props when messing about with motor settings. As for the gyro, you can change the offset in the Configuration tab

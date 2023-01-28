---
title: All you should know about batteries
description: With great power (output) comes great responsibility
visible: false
category: Guides
author: VitroidFPV
img: /uploads/battery_stuff.png
date: 2022-12-14T18:07:40.359Z
content: >-
  When it comes to LiPo (and similar) batteries, you ***have*** to know what
  you're doing when handling them. Any mistake can potentially result in a
  lithium fire, which isn't so easy to put out. That said though, following
  basic safety rules *should* prevent anything drastic from happening


  # Basic Info


  Every battery will have a few important specifications that you should look out for when buying/using/charging. I'll try to summarize it as best as I can


  ## Voltage, Capacity, C Rating


  Every battery cell has its own rated voltage, capacity, and C rating, these three are pretty much the most important specifications, usually written right on the battery and in the product specifications


  The voltage specified on most batteries is `Nominal`, which means it's like the average voltage throughout the whole voltage range. You'll most often see this listed as 3.7V for most batteries. There's also a `Maximum` and `Minimum` safe voltage. For 3.7V nominal batteries, that is 4.2V and 3.5V in that order. **You should not charge a cell over 4.2V** or it could go up in smoke. **You should not discharge it under 3.5V**, any lower will start to damage the internal chemistry


  The capacity, usually measured in mAh \[milliamp hours] tells you how much current you can draw for an hour until the battery is "empty" and needs to be re-charged. 2000mAh is 2A for one hour, 1A for two hours, or 20A for 1/10th of an hour


  And lastly, the C rating determines the rate at which you can input/output current. `C × Capacity [in Ah] = Current in/out` For charging, you should charge it at 1C, for a 2000mAh battery that would be 2A, 2C for 200mAh would be 4A, and so on. Most batteries should list the output current rate as around 70-120C. Anything above ~75C is technically impossible, so the higher values are often just marketing and/or different ways of measuring the current rate. Make sure to pick a battery that has a current output higher than the maximum draw of all 4 of your motors


  ## Cell Type


  We mostly use 3 types of cells for our crafts and equipment. LiPo, LiHV, and Li-Ion


  * LiPo (Lithium-Polymer) - The most commonly-used cell chemistry type. Can be optimized for both capacity and current output, we're mostly using it for the latter. Usually flat rectangular cells. 4.2V max, 3.7 nominal, 3.5V min

  * LiHV (Lithium-Polymer High-Voltage) - Basically LiPo cells that have been tested not to explode when charged to higher voltages. This higher voltage range can give longer flight times or more power output. 4.35V max, 3.85V nominal, 3.5V min

  * Li-Ion (Lithium-Ion) - Optimized for capacity, they're mostly used for stuff that doesn't need as much current. Radios, goggles, or lightweight/current-efficient crafts. Usually cylindrical cells. Usually 4.2V max (with older cells it may be 4.1V, be careful), 3.7V nominal, 2.8-3V min


  ## Cell Count


  Tells you how many cells are in the battery, connected in series or parallel. A 1s battery is just a singular cell, a 6s battery is 6 cells connected in series, and a 6s2p battery is 12 cells, 6 in series, 2 of those series packs in parallel


  Wiring them up in series will add up the voltage of each cell, a 2s battery will have a max voltage of 8.4V, 6s will be 25.2V


  Wiring them up in parallel will add up the capacity of each cell. a 6s2p 2000mAh battery will be made out of two 1000mAh 6s packs


  You can see an example of different series connections below


  ![](/uploads/battery_anatomy_nominal.png)


  ## Internal Resistance


  Not usually specified, it's still a very important measure. measured in mΩ \[milliohms], it can be used as a rough estimate of battery health, the lower the better. Most modern chargers will measure it while charging, or have a separate mode for its measurement. Under 10mΩ is great, under 20mΩ is fine, above 20 isn't great, and you should retire the battery


  # Choosing the Correct Battery


  We're lucky that for most sizes and types of crafts, there are tried-and-true capacities and cell counts that work best. Say for example, on a 5" freestyle/race quad, you will ideally be running a 1000-1500mAh 6s battery that is rated at least for 75C of current output. Or for a toothpick, you will have a range of different cell counts, usually around 300-600mAh


  But standards aren't everything. You should still know ***why*** and ***how*** those values are selected. The main thing you should watch out for is the maximum current draw. The manufacturer should provide datasheets with motor tests that will show a maximum current draw **per motor.** Obviously, if they're in a quadcopter, you have to multiply that current rating by 4 for each motor to get the total. Let's say a typical 2207 1850kv motor from FlyFish RC that I recently [wrote about](https://vitroidfpv-sv.netlify.app/articles/news-flyfish-flash-volador#flash-motors)


  ![](/uploads/motor_test.png)


  We see that the motor draws about 38A at 100% throttle with a pretty generic 5.1" sized prop and a 6s battery. That gives us approximately 150A of total current draw. This may sound like a lot, but you're not likely to be at 100% throttle all the time, and most batteries can take up to double their C rating for a short period of time. 


  Taking the maximum possible C rating (75C), multiplying by 2 to give us 150C, and thus we need at least a 1000mAh battery to be able to output that 150A of current that's being drawn by the motors. You can of course pick a higher C-rated battery, but as said earlier, anything above ~75C is usually just for marketing. You can also go up in capacity, but there are diminishing returns with extra weight


  # Charging


  Now that you know the basic battery information, let's get into how to charge them without starting a fire. Battery misuse (especially during charging) can easily and very quickly result in a lot of damage. Knowing what you're doing is very important


  Hopefully, you have a decent charger by now. If you do not, you can find a list of some decent ones here (if I remember to put in the link). So, let's get into the basics:


  ## Basic Charging Principles


  The charger is pretty much a more intelligent power supply. In goes a regulated 12-24V from a PSU, and out goes at a set voltage with a set current until the battery is at the set voltage. But you should know that there are a few charging modes that you will inevitably use:


  * Balance Charge - What you should be using most of the time. It checks every cell using the balance plug of the battery and charges each one to the set voltage. A non-balanced battery is a dangerous battery

  * Storage charge - Will either charge or discharge depending on the voltage of the cell to get it down to the set storage voltage. The storage voltage is often times equal to the nominal voltage (3.7V) and is used to preserve the life of the battery

  * Discharge - Hopefully self-explanatory. Discharges the battery either to a set minimum voltage or until 0V to practically kill it. Useful for safely getting rid of old batteries


  There are also different ways to charge depending on battery connection:


  * Single-battery charging - Only one battery per charger port, usually the simplest and safest

  * Series charging - Multiple batteries connected in series with a special series charging board. Usually for 1s batteries, most larger chargers make it somewhat hard to charge these small 1s packs. Plugging 4 1s 300mAh batteries into a series charging board will make it look like a single 4s 300mAh battery to the charger

  * Parallel charging - Multiple batteries connected in parallel with a special parallel charging board. Usually for >2s batteries. Plugging in 4 1300mAh 6s batteries into a parallel charging board will make it look like a single 6s 5200mAh battery to the charger. You have to be very careful to make sure that all batteries are within 0.1V per cell of each other before plugging them in, otherwise they will **violently** equalize


  ## Charger Parameters


  There are basic values you should set before charging and watch out for during charging. Some of these may be repeated from the battery info section, but specified for charging:


  * Chemistry - Refers to the battery you're charging, likely LiPo or Li-Ion, or some other exotic battery you may want to charge

  * Max cell voltage - For LiPo's and most Li-Ion's is 4.2V which should be the default on the charger. The voltage most often printed on batteries is the nominal voltage, but you don't want to enter this as the max cell voltage. It wouldn't cause any harm, but you'd end up with a half-full battery

  * Cell count - The cell count on batteries is in series. A 1s battery has only one cell, 6s has 6 cells, and so on. This is what you enter as the Cell count. See the image below once again for a simple explanation of series connection and its effects on voltage

    ![](/uploads/battery_anatomy_nominal.png)
  * Charge current - Depends on the capacity of the battery (usually in mAh) and the C rate. Also above for the battery info, but I'll throw it here too, specifically for charging: \
    To get the charge current, multiply the battery capacity in Ah with the C rate (ideally use 1C, but you can go higher if time constrained). A 1300mAh battery at 1C will be charged at 1.3A (1.3 × 1), at 2C it'll be 2.6A (1.3 × 2), etc...
  * Internal resistance - Usually measured while charging, some chargers may have a dedicated IR measuring mode. Used as a rough estimate of battery health - Under 10mΩ is great, under 20mΩ is fine, above 20 isn't great, and you should retire the battery


  ## Charging Example


  ### Single-battery Charging


  Say we have a 1300mAh 6s LiPo, and we want to charge it alone just by plugging it right into the charger:


  * Our charging current will be your desired C rate - 1 or 2C, multiplied by the capacity, which gives us 1.3 or 2.6A

  * The chemistry should be set to LiPo

  * The maximum cell voltage should be 4.2V

  * The cell count should be 6


  With those settings, you can plug both of the battery plugs into the charger, and start charging. The charger should stop automatically when all of the cells are full and have been balanced. You can then exit back out of the charging mode, unplug the battery, and go fly!


  ### Parallel Charging


  Say we have 4 1300mAh 6s LiPos that you want to charge all at one time using a parallel charging board:


  * Charging current will be your desired C rate, multiplied by the capacity and the number of batteries, giving us 1.3 (or 2.6A) × 4 = 5.2 (or 10.4A)

  * Chemistry should still be LiPo

  * Maximum cell voltage still 4.2V

  * Cell count still the same - 6


  With those settings set, you can start. Make sure that all batteries are within 0.1V per cell of each other before plugging them in. Plug the parallel charging board into the charger, and then plug all of the batteries in, XT60 first, then all of the balance plugs. Double-check that everything is correct, and you can then charge as you would normally, see above


  ### Series Charging


  Say we have 4 1s 300mAh HV LiPos that you want to charge all at one time using a series charging board:


  * Our charging current will be your desired C rate - 1 or 2C, multiplied by the capacity, which gives us 0.3 or 0.6A

  * Battery chemistry should be LiPo (or LiPo HV/LiHV if your charger has that distinction)

  * Maximum cell voltage should be 4.35V

  * Cell count will be the number of batteries you're plugging in series, in this case 4


  Once you have the settings set, you can start. As all of the cells will act as multiple in one 4s battery, their voltage doesn't need to match, the balancing will take care of that. There is no order of plugging stuff in, and you can charge as normal, see above
---

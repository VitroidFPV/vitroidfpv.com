---
title: All you should know about batteries
description: With great power (output) comes great responsibility
visible: false
category: Guides
author: VitroidFPV
img: /uploads/battery_stuff.png
date: 2022-12-14T18:07:40.359Z
content: >-
  When it comes to LiPo (and similar) batteries, you have to know what you're
  doing when handling them. Any mistake can potentially result in a lithium
  fire, which isn't so easy to put out. That said though, following basic safety
  rules should prevent anything drastic from happening


  # Basic info


  Every battery will have a few important specifications that you should look out for when buying/using/charging. I'll try to summarize it as best as I can


  ## Voltage, capacity, C rating


  Every battery cell has its own rated voltage, capacity, and C rating, these three are pretty much the most important specifications, usually written right on the battery and in the product specifications


  The voltage specified on most batteries is `Nominal`, which means it's like the average voltage throughout the whole voltage range. You'll most often see this listed as 3.7V for most batteries. There's also a `Maximum` and `Minimum` safe voltage. For 3.7V nominal batteries, that is 4.2V and 3.5V in that order. You should not charge a cell over 4.2V or it could go up in smoke. You should not discharge it under 3.5V, any lower will start to damage the internal chemistry


  The capacity, usually measured in mAh \[milliamp hours] tells you how much current you can draw for an hour until the battery is "empty" and needs to be re-charged. 2000mAh is 2A for one hour, 1A for two hours, or 20A for 1/10th of an hour


  And lastly, the C rating determines the rate at which you can input/output current. `C × Capacity [in Ah] = Current in/out` For charging, you should charge it at 1C, for a 2000mAh battery that would be 2A, 2C for 200mAh would be 4A, and so on. Most batteries should list the output current rate as around 70-120C. Anything above ~80C is technically impossible, so the higher values are often just marketing and/or different ways of measuring the current rate. Make sure to pick a battery that has a current output higher than the maximum draw of all 4 of your motors


  ## Cell type


  We mostly use 3 types of cells for our crafts and equipment. LiPo, LiHV, and Li-Ion


  * LiPo (Lithium-Polymer) - The most commonly-used cell chemistry type. Can be optimized for both capacity and current output, we're mostly using it for the latter. Usually flat rectangular cells. 4.2V max, 3.7 nominal, 3.5V min

  * LiHV (Lithium-Polymer High-Voltage) - Basically LiPo cells that have been tested not to explode when charged to higher voltages. This higher voltage range can give longer flight times or more power output. 4.35V max, 3.85V nominal, 3.5V min

  * Li-Ion (Lithium-Ion) - Optimized for capacity, they're mostly used for stuff that doesn't need as much current. Radios, goggles, or lightweight/current-efficient crafts. Usually cylindrical cells. Usually 4.2V max (with older cells it may be 4.1V, be careful), 3.7V nominal, 2.8-3V min


  ## Cell count


  Tells you how many cells are in the battery, connected in series or parallel. A 1s battery is just a singular cell, a 6s battery is 6 cells connected in series, and a 6s2p battery is 12 cells, 6 in series, 2 of those series packs in parallel


  Wiring them up in series will add up the voltage of each cell, a 2s battery will have a max voltage of 8.4V, 6s will be 25.2V


  Wiring them up in parallel will add up the capacity of each cell. a 6s2p 2000mAh battery will be made out of two 1000mAh 6s packs
---

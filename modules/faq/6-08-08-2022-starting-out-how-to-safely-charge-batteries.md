---
category: Starting Out
order: 6
title: How to safely charge batteries?
id: charging
answer: >-
  ###### Batteries can very quickly go up in flames if you don't care for them
  properly


  With the formalities out of the way; A fire can easily be avoided if you follow some basic steps:


  * Using good and trusted batteries and chargers goes a long way to prevent DOA and un-checked cells, and charger-related issues. You can find charger recommendations elsewhere on the site

  * Check for any physical damage before and after charging, and use the IR readout on the charger to approximate the battery health. Under 10mOhms it's in great condition, under 20 is usable, and anything above should be retired

  * Make sure to set up the charge settings properly to your specific batteries, see below how:


  ##### Charger settings and use:


  * Most chargers will have three or four relevant separate settings. `Battery chemistry`, `Max cell voltage,` `Cell count`, and `Charge current`.

    * ##### Chemistry
      Refers to the battery you're charging, likely LiPo or Li-Ion.
    * ##### Max cell voltage
      For LiPo's and most Li-Ion's is 4.2V which should be the default on the charger. The voltage most often printed on batteries is the `nominal` voltage, basically the average voltage through the charge/discharge cycle (3.7v per cell). You don't want to enter this as the max cell voltage, but it wouldn't cause any harm
    * ##### Cell count 
      The cell count on batteries is in series. A 1s battery has only one cell, 6s has 6 cells in series, and so on. This is what you enter as the `Cell count`. The voltage of the cells when connected in series is added together, so a 6s battery will have a max voltage of 25.2V `(4.2 × 6)`
    * ##### Charge current
      Depends on the capacity of the battery (usually in `mAh`) and the rate at which you want to charge (`C`). To get the charge current, multiply the battery capacity in Ah with the C rate (ideally use 1C, but you can go higher if time constrained). A 1300mAh battery at 1C will be charged at 1.3A (`1.3 × 1`), at 2C it'll be 2.6A (`1.3 × 2`), etc...

  * Plug in the XT60 and Balance cables (the balance cable will only go in one way, and all the way to one side of the connector), and you can charge. The charger will stop charging once the set max cell voltage is reached in all of the cells. This is called balancing and it's needed to maintain the battery safely
---

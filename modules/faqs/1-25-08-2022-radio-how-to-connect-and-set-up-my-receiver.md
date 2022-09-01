---
Category: Radio
order: 1
title: How to connect and bind my receiver?
id: receiverSetup
answer: >-
  1. (This step can be skipped if you have a receiver that can be flashed
  wirelessly as it can be changed after soldering it up) Make sure that the
  receiver is on matching firmware versions with the radio, most important to
  FrSky, where you need to flash using the radio

     * They have ACCST V1/V2 FCC/LBT firmware, and ACCESS V2.0 / V2.1 to worry about. Make sure that the receiver and radio are running compatible versions
     * ACCST V1 receiver firmware only works with ACCST V1 firmware radios, and you have to match FCC / LBT as well
     * ACCST V2 and ACCESS firmware receivers work with ACCST V2 / ACCESS radios (with the exception that the ACCESS versions also have to match)
     * Yes this is a mess﻿
     * Yes this is a very easily avoidable and more importantly **easily fixable** issue
     * Yes this is 100 % FrSky's fault
     * No they have not done much to address it
     * This is why we no longer recommend them﻿
  2. Connect the receiver to the FC as instructed by the FC or receiver manufacturer

     * ELRS, TBS Receivers, and most of the other high-performance systems use a full UART, meaning you just need a TX and an RX pad of the same number. 
     * FrSky uses a single **inverted** RX pad for their SBUS signal (needs hardware inversion on F4 FCs, F7 can be changed in the config), SmartPort for telemetry which needs to be on a **different** TX pad, or F.Port which is signal+telemetry over one wire on an uninverted TX pad
     * FlySky uses IBUS, which just needs a free RX pad
  3. You can now move onto binding:
      * If you have an FrSky (or any other "older-style") receiver correctly wired up, and on the same firmware as your radio, you can go bind it. This goes for most of these: Hold down the bind button on the receiver, and power on the quad. Then put the radio into bind mode as well, and after a few seconds, powercycle both, and they should be bound. If not, move the radio a bit further away from the receiver as having it too close can interfere
      * As ELRS is the more common and recommended system over TBS offerings nowadays, I'll focus on that here. ELRS receivers can be flashed wirelessly once connected to the FC: In ELRS configurator, build the firmware for your specific receiver with a bind phrase that you either previously set on the transmitter, or that you can remember to set on the transmitter later. Then you can flash the receiver. There are great tutorials for the process, as me explaining it all here would take an even bigger wall of text. But assuming that you now have the receiver on the newest firmware with a known bind phrase, you can bind it to the transmitter. The receiver has a default 20s window where it will attempt to bind to any radio with the same bind phrase, so first, turn on the radio, then the quad, and it should all be connected up without you doing much of anything
---

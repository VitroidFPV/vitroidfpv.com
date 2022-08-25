---
Category: Radio
order: 1
title: How to connect and set up my receiver?
id: receiverSetup
answer: >-
  As briefly touched on in the **Electrical Compatibility** answer, all you
  really need is a spare UART port, and a fair bit of setting up


  1. Connect the receiver to the FC as instructed by the FC or receiver manufacturer.

     * ELRS, TBS Receivers, and most of the other high-performance systems use a full UART, meaning you just need a TX and an RX pad of the same number. 
     * FrSky uses a single **inverted** RX pad for their SBUS signal (needs hardware inversion on F4 FCs, F7 can be changed in the config), SmartPort for telemetry which needs to be on a **different** TX pad, or F.Port which is signal+telemetry over one wire on an uninverted TX pad
     * FlySky uses IBUS, which just needs a free RX pad
  2. I will finish writing this later
---

---
category: Radio
order: 4
title: How to ensure Radio-Receiver compatibility?
id: compatibleRadio
answer: >-
  A﻿s mentioned above in the `Building` section, there are ways you can confirm
  that your receiver is compatible, though I mainly focused on the building and
  hardware side of things, here I will mainly focus on the air protocol side of
  things


  * E﻿LRS - You need to keep watch for one main thing, that being the frequency. 900MHz and 2.4GHz. Those need to match between the transmitter and receiver. The receiver and transmitter should also be running the same firmware version, but that can be done very easily and I have an answer for that [here](https://vitroidfpv-sv.netlify.app/faq#flashElrs), then you can easily bind them. The best thing is that most if not all available hardware can be flashed to any firmware you want *unlike FrSky which I will get to later*

  * T﻿BS Crossfire/Tracer - Crossfire will only work with Crossfire, Tracer will only work with Tracer, easy as that. Similar to ELRS, the transmitter and receiver also both need to be on the same firmware. However, due to their limited amount of hardware options, they can make that a bit easier, though fiddly at times. When you go to bind them, the radio will attempt to wirelessly update the receiver to its firmware version

  * FrSky - Their old system of protocols was decently straightforward. D8 and ACCST D16 FCC/LBT was all you had to worry about. Now they had to bring ACCST V1 and V2 (both with FCC/LBT variants), ACCESS 1.0, 2.0, and 2.1, and it's just a mess. Though I can at least try to make sense of it here:

    * D8 receivers (usually found on AIO boards in micro quads) only properly work with D8-capable radios, at times ACCST V1 radio's too
    * Older ACCST D16 receivers (XM+, R-XSR) can run both ACCST V1 and V2 firmware and need the respective version on the radio, as well as needing to match FCC/LBT. In addition, the R-XSR can also be flashed with all of the ACCESS firmware versions as well, bringing us into...
    * The new ACCESS receivers (ie. the Archer line) can only use ACCESS firmware, and need their corresponding version, though you don't have to worry about FCC/LBT
  * FlySky - They have a few protocols, the main one being AFHDS (used on all the small receivers you would use for quads). They don't need any kind of firmware shenanigans, though along with FrSky I would no longer recommend them for new users
---

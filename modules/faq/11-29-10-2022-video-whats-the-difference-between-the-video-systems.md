---
category: Video
order: 11
title: What's the difference between the video systems?
id: fpvSystemDifference
visible: false
answer: >-
  The main difference lies in how the video is encoded, transmitted, and
  (potentially) compressed. The first distinction to be made is:


  1. Analog - Similar to an old TV, the video transmission is based on analog hardware. This means that the video is transmitted at varying voltage levels at every step along the way. The analog video goes from the camera to the FC where the OSD gets overlaid, then out of the FC for the VTX to transmit

  2. Digital - There are multiple Digital systems nowadays, the main three being DJI Digital, HDZero, and Walksnail Avatar. They transmit the video by sending 1s and 0s, and nothing gets passed through the FC to modify the signal. This is further split into compressed and uncompressed systems. Compression is an additional step in the transmission process, adds latency, and delivers a different end result than uncompressed video


  Each of those has its own pros and cons, which you can find below


  ##### Pros:


  1. Analog:

     * By far the cheapest option
     * High availability across all price ranges
     * Very light, for even the smallest quads
     * Low latency
     * Your range is only limited by the equipment you have, not a hard limit like in DJI
  2. Uncompressed Digital (HDZero)

     * Latency comparable to analog
     * Currently, the only system with a VRX module to support your existing analog goggles
     * Somewhat open-source
     * No compression means more steady signal breakup and consistent image
  3. Compressed (DJI, Walksnail)

     * Can achieve better penetration and longer range than uncompressed (however DJI still has a hard range limit at about 13.5km)
     * Can allow for more image processing, giving users a (subjectively) better image

  ###### Cons:


  1. Analog:

     * It's below all of the systems in terms of video quality
     * Most ready-to-buy goggles won't give you great antennas, so the "default" range will be somewhat low
  2. Uncompressed Digital:

     * While the range is still better than analog, it's not as far as the compressed systems
     * The unprocessed image can give a (subjectively) worse impression of the quality
  3. Compressed:

     * Highest latency out of all three, which can unexpectedly change
     * DJI has a hard lock on its range
     * Bad breakup, video tends to get very pixelated, drops entire frames, or gets an "overly compressed" look (loss of detail) when losing signal
---

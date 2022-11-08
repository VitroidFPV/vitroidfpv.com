---
Category: Radio
order: 2
title: How to set up switch mixes?
id: mixer
answer: >-
  In OpenTX, the default multirotor model only has the four main control
  channels mixed in; throttle, yaw, pitch, and roll. To get the radio to send
  the switch values as well, they need to be mixed in:


  1. Go into the model setup, and page all the way to the mixers page

     ![opentx mixes menu](/uploads/opentx_mixers_1.png "opentx mixes menu")
  2. Scroll to the empty channel 5, and long press enter to make a new mix

     ![opentx mixes menu](/uploads/opentx_mixers_2.png "opentx mixes menu")

     ![opentx mixes menu](/uploads/opentx_mixers_3.png "opentx mixes menu")
  3. You can optionally name it, but that won't do much

  4. Scroll to the source field, press enter to start changing it, and move the switch you want to be assigned to it, which should automatically assign it

     ![opentx mixes menu](/uploads/opentx_mixers_4.png "opentx mixes menu")
  5. Exit out of that menu and do the same for the other channels

     ![opentx mixes menu](/uploads/opentx_mixers_5.png "opentx mixes menu")

  After the 4 gimbal channels, betaflight will start counting up from Aux 1. Aux 1 is CH5 on the radio, Aux 2 is CH6, and so on...
---

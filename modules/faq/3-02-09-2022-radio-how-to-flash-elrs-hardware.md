---
category: Radio
order: 3
title: How to flash ELRS hardware?
id: flashElrs
visible: false
answer: >-
  ELRS has come a long way from what it once was, both in performance and ease
  of use. Flashing used to be a bit more involved, but now it's mostly a breeze
  once you understand it


  1. Select the newest stable release (as of me writing this, 3.0.0)

  2. Select your device category, and find out what hardware target you need to use, usually, the manufacturer will have this listed. Then select it in the configurator. Below is an example for Happymodel EP1 and EP2 receivers. If you're flashing a different receiver or a transmitter, it will be different for you:

     ![elrs target selection](/uploads/elrs_target_selection.png "elrs target selection")
  3. Select your flashing method, in this answer I'll be following the WiFi flashing process. If you can't use WiFi for one reason or another, there's also Betaflight Passthrough and UART

     * WiFi will have you connect to the receiver/transmitter wifi network and upload the file there or connect the receiver/transmitter to your WiFi network
     * Betaflight passthrough will need you to enable that option in Betaflight as well, and you can then connect your flight controller and flash it that way
     * UART will use the integrated USB port (mostly for transmitters), or an FTDI breakout board for receivers (though this is more advanced)
  4. Now set your device options. There's a lot to cover here, and it's all well covered in the [ELRS wiki](https://www.expresslrs.org/2.0/quick-start/getting-started/) and more specifically the [User Defines](https://www.expresslrs.org/2.0/software/user-defines/). The main thing is the bind phrase, which you should set to be the same on your transmitter and receiver, you won't have to do any manual binding. Set your regulatory domain, and your home wifi settings to make flashing a little easier once you have flashed the receiver once with this ew firmware
     ![elrs device options](/uploads/elrs_device_options.png "elrs device options")

     These settings are mostly universal across receivers, there are some module-specific settings that are more for advanced use, and should be kept to default
  5. Once you have all your settings, you can then build the firmware. Don't worry if this takes a while, it may first need to install all the dependencies. Once done, it should pop up a file explorer window with the firmware files, you will want the one with the full device name


  6﻿. Power on the receiver, either with the battery, or USB (if your FC supports it). After the wifi interval time has passed, the receiver should change its blinking pattern, indicating WiFi access point mode. You should see a new WiFi network show up named something like `ExpressLRX RX`. Connect to it, and go to <http://10.0.0.1> in your web browser. Drag the file into the file attachment area, or navigate to it manually. Then you can press `Update`. If everything went to plan, you should soon see a blank page saying `Update Success! Rebooting...`


  7﻿. You have now flashed your receiver! For later flashes, you can now also use your home network to flash and set up the receiver


  8﻿. Follow the steps for your transmitter, it's mostly the same
---

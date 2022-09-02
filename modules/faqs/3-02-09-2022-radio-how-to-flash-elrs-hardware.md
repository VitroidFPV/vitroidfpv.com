---
Category: Radio
order: 3
title: How to flash ELRS hardware?
id: flashElrs
answer: >-
  ELRS has come a long way from what it once was, both in performance and ease
  of use. Flashing used to be a bit more involved, but now it's mostly a breeze
  once you understand it


  1. Select the newest stable release (as of me writing this, 2.5.1 is the newest stable, and likely the last before the full 3.0 release)

  2. Select your device category, and find out what hardware target you need to use, usually, the manufacturer will have this listed. Then select it in the configurator. Below is an example for Happymodel EP1 and EP2 receivers. If you're flashing a different receiver or a transmitter, it will be different for you:

     ![elrs target selection](/uploads/elrs_target_selection.png "elrs target selection")
  3. Select your flashing method, in this answer I'll be following the WiFi flashing process. If you can't use WiFi for one reason or another, there's also Betaflight Passthrough and UART

     * WiFi will have you connect to the receiver/transmitter wifi network and upload the file there or connect the receiver/transmitter to your WiFi network
     * Betaflight passthrough will need you to enable that option in Betaflight as well, and you can then connect your flight controller and flash it that way
     * UART will use the integrated USB port (mostly for transmitters), or an FTDI breakout board for receivers (though this is more advanced)
  4. Now set your device options. There's a lot to cover here, so I'll only go in-depth for the main ones:

     * `Regulatory domain` - may or may not be necessary where you live, changed things like the frequency and max allowed power, unless you really care about legality, can be mostly ignored
     * `Binding phrase` - what you use to automagically bind to your receiver that has the same bind phrase selected. If you don't select a bind phrase, you'll have to bind manually
     * `RCVR_UART_BAUD` - Default (420000) is good for most use cases, Kiss V1 FCs need 400000
     * `RCVR_INVERT_TX` - only for ESP-based receivers, allows you to use a hard-inverted SBUS pad as a normal RX pad for the CRSF signal
     * `LOCK_ON_FIRST_CONNECTION` - This makes the receiver reconnect more quickly because it's listening at the proper rate. You generally want this on, but turning it off can be used to get slightly more range to possibly connect to an out-of-range craft
     * `AUTO_WIFI_ON_INTERVAL` - The time that the receiver will wait until it goes from attempting to get a connection to your radio, to getting into wifi flashing mode
     * `HOME_WIFI_SSID` and `HOME_WIFI_PASSWORD` are settings for your home WiFi network to make the receiver available to all devices on said network

       ![elrs device options](/uploads/elrs_device_options.png "elrs device options")

     These settings are mostly universal across receivers, there are some module-specific settings that are more for advanced use, and should be kept to default. The [ELRS wiki](https://www.expresslrs.org/2.0/quick-start/getting-started/) and more specifically the [User Defines](https://www.expresslrs.org/2.0/software/user-defines/) section will have more detail on all of these options
  5. This would take too long to write, will finish tomorrow
---

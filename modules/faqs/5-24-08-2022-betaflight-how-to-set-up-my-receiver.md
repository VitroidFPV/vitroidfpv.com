---
Category: Betaflight
order: 5
title: How to set up my receiver?
id: receiverSetup
answer: >-
  Assuming you correctly connected your receiver correctly (if you don't know
  how to do that, you can read further in the **Radio** section of the FAQ), you
  can proceed to set it up. In the `Ports` tab in Betaflight, enable `SerialRx`
  on the UART that you have the receiver wired to, and save it.


  ![betaflight ports tab](/uploads/betaflight_ports_tab_receiver.png "betaflight ports tab")


  In the newer versions of the configurator, the receiver protocol settings should be in the `Receiver` tab, if not, then in `Configuration`. Select your receiver mode (SPI for integrated receivers like on AIOs, Serial for 99.99% of the rest), then set the protocol to the one you need for your receiver: SBUS or F.Port for FrSky, CRSF for Crossfire/Tracer/ELRS, IRC Ghost for Ghost, etc...


  ![betaflight receiver settings](/uploads/betaflight_receiver_protocol.png "betaflight receiver settings")


  Verify that you're getting stick input in the `Receiver` tab, you should see the channel bars move in response to your stick movements. If the channels are out of order, you can manually swap them in the text box that should say something like `AETR1234`. Find your radio channel mapping, or change the order of the letters until all your channels match


  ![betaflight channel map settings](/uploads/betaflight_receiver_chnnel_map.png "betaflight channel map settings")
---

---
category: Building
order: 4
title: How to check for electrical compatibility?
id: compatibleElectrically
answer: >-
  There are mainly two things you should look out for. Accepted voltage/current
  levels, and signal communication


  ##### Voltage and Current:


  * Most electronic parts used have a rated minimal and maximal accepted voltage. This can be as simple as a camera taking in 5V or a VTX having an accepted voltage range of 7-36V, or it's listed as a cell count. Small AIOs might take 1s only, 1-2s, or 2s up to 6s, which is also the most common rating for 5" quad parts. Overvolting can at best result in something failing in a non-damaging way, **at worst it'll cause a fire**

  * Current ratings come into play with both FCs and ESCs for the max current. In ESCs, this is the max current the FETs will let through, on FCs it's how much current each voltage regulator can handle: 

  * Your ESC's current rating is measured for **each motor**, so a 40A 4in1 ESC has 4x 40A outputs. Motor manufacturers should list the max current draw for the motors. It's always good to have some overhead current on the ESC: For a tinywhoop, this can be an extra 1A, for other micro quads it's about 3-10A, and on a 5" you want *at least* a 10A overhead from the rated max current draw of the motor

  * All FCs should have a 5V regulator (sometimes 4.5V, signifying that it will output USB power), to power most peripheral devices. 3.3V for the MCU, and some lower-power devices, and usually a 9/10/12V regulator for your VTX. Each of those has its own current rating. In most cases it is enough, but if you attach a lot of devices, this can overload it


  ##### Signal communication:


  * All peripherals transmit and receive data in one way or another. Be that over UART (serial), I2C, SPI, or some other way of transmission. 

  * Receivers transmit and receive signals in two ways. Over the **air**, and over the **wire**. The air protocol dictates compatibility between the radio and receiver, they need to match. The wire protocol is over UART. For example, ELRS, Tracer, and Crossfire all use a pair of **RX** and **TX** pads, and the CRSF protocol

    ![connection diagram for an ELRS receiver](/uploads/flywoo_elrs_rx.png "connection diagram for a gps unit")
  * For video, the most important thing is the difference between the systems. I go into more depth with this here \[this should be a link, if it's not, I forgot], but the gist of it is this:\
    Analog video transmitters work with pretty much any analog goggle/video receiver, and all the other digital systems only work with their counterparts, for example you can't mix a DJI Air Unit with Walksnail Avatar goggles. This also goes for the way they connect to the FC. Analog systems will use the FC video in/out connections so that the OSD can be overlaid directly on the video signal, and a single TX connection on the FC to do config over SmartAudio. Digital systems only need a single UART for control+OSD+other stuff™
  * A GPS will also use a UART, also needing a free set of RX+TX pads. Some GPS units also have an integrated compass (you can also get them standalone) that will need I2C communication. This uses two pads, **Data**, and **Clock,** usually labeled **SDA** and **SCL** on the FC

    ![connection diagram for a gps unit](/uploads/flywoo_gps_compass.png "connection diagram for a gps unit")
---

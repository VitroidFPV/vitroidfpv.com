---
category: Betaflight
order: 6
title: How to set up SmartAudio?
id: smartaudio
answer: >-
  Getting SmartAudio running in the past has been quite a pain, but has recently
  gotten a lot easier. Make sure your VTX is connected to a free TX pad, and
  then in the `Ports` Tab in betaflight, enable VTX (SmartAudio or IRC Tramp) on
  that UART, and then save it


  ![betaflight ports tab vtx settings](/uploads/betaflight_ports_tab_sa.png "betaflight ports tab vtx settings")


  You should see a new tab pop out, titled `Video Transmitter`. There you can load in a `.json` file for the VTX table often provided by manufacturers, or [here](https://github.com/Jackjan4/betaflight-vtx-tables), find your VTX in the `Presets` tab or use a CLI batch command to set it that way (also often provided by manufacturers).
---

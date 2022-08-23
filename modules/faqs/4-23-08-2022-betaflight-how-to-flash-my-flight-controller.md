---
Category: Betaflight
order: 4
title: How to flash my Flight Controller?
id: flash
answer: >-
  Before you flash, it's a good idea to make a backup of the flight controller
  settings, by sending `diff all` in the CLI, then saving the result into a
  file, which you can then load in future versions. Betaflight 4.3 added a
  feature to save your settings in the preset tab, which should be the preferred
  way to save settings going forward


  ###### Pasting in old diffs into newer versions (4.2 -> 4.3) can result in unexpected behavior, make sure to use a converter tool like [this](https://bf43-safe-migration.robertodedomenico.it/)


  Once you have your diff, the top of the file should look something like this:


  ```

  # version

  # Betaflight / STM32F411 (S411) 4.3.0 Jun 14 2022 / 00:48:04 (229ac66) MSP API: 1.44

  # config: manufacturer_id: DIAT, board_name: MAMBAF411, version: a074838b, date: 2021-06-14T21:36:54Z


  # start the command batch

  batch start


  # reset configuration to default settings

  defaults nosave


  board_name MAMBAF411

  manufacturer_id DIAT

  mcu_id 006c00523339510539373831

  signature 


  ```


  The `board_name` is what you need to select as your target when flashing. Auto-detect will usually catch the correct target, but double-check to make sure. Select the newest firmware version (or any other version you specifically want), and enable `Full chip erase` (this isn't usually needed when going between minor versions like 4.3.0 -> 4.3.1, but for full releases it's necessary)


  ![betaflight target selection](/uploads/betaflight_flashing_target.png "betaflight target selection")


  Once you have all the settings set correctly, click on `Load Firmware [Online]`, wait for it to download, and then `Flash Firmware`. 


  ![betaflight target loading](/uploads/betaflight_flashing_loading.png "betaflight target loading")


  If it gets stuck, or doesn't even start, you may need to put the FC into the bootloader manually, either by sending `bl` in the CLI, or by holding down the boot button when powering it on. It should show up in the ports dropdown as DFU, and then you should be able to flash
---

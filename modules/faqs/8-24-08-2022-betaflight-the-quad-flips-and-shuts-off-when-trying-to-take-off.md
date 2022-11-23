---
Category: Betaflight
order: 8
title: The quad flips and shuts off when trying to take off
id: runaway
answer: >-
  This is called runaway (or flyaway) protection. It's there to prevent the quad
  from causing damage to itself, its surroundings, or flyaways. It can be caused
  by a variety of different reasons, here are some of the most common ones:


  * Make sure your motors are spinning in the correct direction. You can reverse them in Betaflight, or in BlHeli Suite/Configurator

  * This extends into props in/out. This basically means that Betaflight expects the motors and props to spin in one way or the other, see image below

    ![betaflight props in/out](/uploads/betaflight_props_in_out.png "betaflight props in/out")
  * As shown in the image above, the motors are also expected to be mapped in a certain way. Make sure that spinning up Motor 1 in betaflight spins up the correct motor as on the diagram, and so on. This can be re-mapped through the CLI, or in new configurator versions in the graphical interface as well

  * Make sure the gyroscope is correctly aligned. This can easily be checked by moving the quad around, and seeing if every rotation responds correctly in the Betaflight model preview. If not, you can offset the gyro on each axis in the `Configuration` tab

  * Make sure that your radio channels are mapped correctly. If not, it can cause unexpected behavior


  Contributed from Dihler™#1408, later edited
---

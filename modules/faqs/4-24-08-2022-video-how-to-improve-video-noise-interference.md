---
category: Video
order: 4
title: How to improve video noise/interference
id: noise
answer: >-
  Video noise and interference are most often caused by electrical noise in the
  system, here's how to improve it:


  * Make sure you're not powering the VTX/Cam directly from the battery. While some cams and most VTXs can take direct battery voltage, it's often not the best. Your FC should have a perfectly good and more importantly *filtered* power regulators for both 5V for the camera, and 9-12V for the VTX. The opposite of this can manifest with black lines across the feed, meaning that the VTX is not getting enough power. In this situation, you can connect it to a higher voltage source, or going to a lower output power

  * Make sure that you have a sufficiently sized capacitor connected to your ESC. If your video noise goes up with throttle, you may need a bigger cap. It served to eliminate spikes from the battery being plugged in, and electrical noise from the motor coils switching

  * Twist your camera and video wires. Noise can often be induced wirelessly, and twisting the video signal and ground wires (with that the power and other signal wires too) can somewhat shield them, and prevent at least a part of this kind of interference

  * Run your signal wires as far from other sources of noise as possible. This includes running the camera/VTX wires around the ESC, and close to the main power leads. The same goes for the VTX -> Antenna connection. Even though the coaxial cable should be shielded, it's a good idea to run it away from noise sources
---

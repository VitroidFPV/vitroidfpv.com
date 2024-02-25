---
category: Betaflight
order: 7
title: My motors won't slow down after applying throttle
id: iTerm
answer:
  This is normal in most cases - the term for it is called "I Term Windup". The PID loop on the flight controller always wants to have control over the movement of the drone to correct for any errors and get to the desired set point.  


  When the drone can't move, that error accumulates, and it wants to correct for it more and more - so the motors just keep spinning up. This is most often caused by the props not being on, so once you put them on correctly it will likely work as expected!
---

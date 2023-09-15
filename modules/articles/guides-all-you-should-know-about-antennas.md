---
title: All you should know about antennas
description: Well, at least for most FPV uses
visible: false
category: Guides
author: VitroidFPV
img: /uploads/placeholder.png
date: 2023-09-14T18:40:51.531Z
---

<script lang="ts">
	import GridBox from "$components/articlesPage/GridBox.svelte";
	import GridItem from "$components/articlesPage/GridItem.svelte";
	import Tablist from "$components/articlesPage/Tablist.svelte";
	import Tab from "$components/articlesPage/Tab.svelte";
	import Admonition from "$components/articlesPage/Admonition.svelte";
	import GLTFWrapper from "$components/three/GLTFWrapper.svelte";
	import GLTFBox from "$components/three/GLTFBox.svelte";

	import { Switch } from "@rgossiaux/svelte-headlessui"

	let show3d = true;
</script>

There's a ton of different aspects of antennas, and RF science in general. You could spend years on it and still not have a full grasp. Luckily for FPV purposes we can simplify some things a bunch and still get a good understanding of what's going on.

Don't worry, there shouldn't be any math here, just some basic concepts and a few diagrams. 

I will use 3d models across the whole article to help you get a better understanding of what's going on when you can actually interact with it. If this page is too heavy for your device, you can disable the 3d models with the toggle below. From my own testing, it runs fine on a laptop that's a couple of years old and my phone as well though, so it should be okay for most people.

<div class="flex">
	<Switch
		bind:checked={show3d}
		class={"relative inline-flex items-center rounded-full h-6 w-12 outline outline-2 outline-neutral-400/20 mr-2 duration-300 " + (show3d ? "text-highlight/20 dark:bg-highlight-dark/20 outline-highlight dark:outline-highlight-dark" : "bg-neutral-400/10")}
	>
		<span
			class={"toggle inline-block w-4 rounded-full aspect-square bg-neutral-400/50 duration-300 " + (show3d ? " bg-highlight dark:bg-highlight-dark translate-x-7" : "translate-x-1")}
		/>
	</Switch>

Show 3D models (recommended)

</div>

<Admonition type="tip" title="Disclosure">

* I am not an RF engineer, I don't study in the field. However most of these concepts are pretty well known and documented, and I've worked with an actual RF engineer to make sure that the info here is more or less correct
* If you know more about this than me and find any mistakes, please let me know so I can fix them! I already learned quite a lot while writing this, and I'm sure there's still more

</Admonition>

# Connectors

There are three main connectors used in various places in FPV. Goggles, VTXs, and receivers may all use different connectors.

There's a little bit of terminology that applies to all of the connectors listed here:

* **Coax** - Short for `coaxial` - a wire that consists of a center conductor, a dielectric insulator, and a shield. Mainly used for antenna connections

* **Shielding** - The outer conductor of a coax cable, usually made of braided wire or foil. Used to prevent interference from outside sources and act as a ground connection

* **Male** - Used to denote a connector that has a pin in the center - other male connectors may have multiple pins, but antenna coax cables only need two conductors - signal and shielding

* **Female** - Used to denote a connector that has a pin receptacle in the center. As mentioned above, other female connectors may have multiple receptacles, antenna coax only have one


## SMA/RP-SMA

SMA (SubMiniature version A) is a common connector used on larger devices - Goggles, VRX modules, and radios. Most often adapted from other smaller connectors to allow for easier routing of the coaxial cable.

A male and female SMA connector mate by screwing together.

This is of course very funny, but that's just the actual terminology as explained above. We'll just have to live with this for the rest of the article.


{#if show3d}
<GridBox cols={4} classes="">

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/sma_male.glb" scale={1.5}/>
<div slot="content">SMA Male</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/sma_female.glb" scale={1.5}/>
<div slot="content">SMA Male</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/rpsma_male.glb" scale={1.5}/>
<div slot="content">RP-SMA Male</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/rpsma_female.glb" scale={1.5}/>
<div slot="content">RP-SMA Female</div>
</GLTFBox>

</GridBox>
{/if}

RP-SMA stands for Reverse-Polarity SMA. As you can see in the fancy 3d models, the main difference between SMA and RP-SMA is that the coax signal pin and receptacle are swapped between the two connectors. 

<Admonition type="caution" title="">

You can't screw an SMA male connector to an RP-SMA female connector, the two pins would hit each other, and that should be sufficient to prevent errors.

But while you can screw an RP-SMA male connector to an SMA female connector, there would be no connection between the two receptacles! This may cause damage when connected to a transmitter, as the signal would be reflected back and fry stuff! Always have an antenna attached to a transmitter and make sure it's of the correct type!

</Admonition>

## MMCX

MMCX stands for Micro-Miniature Coaxial. It's most often used on regular-sized VTXs and is often adapted to SMA/RP-SMA for easier cable routing and a more secure mounting of the SMA connector.

MMCX male and female connectors mate by plugging into each other. This connection may be pretty tight and require some force to connect/separate, so some use of force may be required. There will be a noticeable click when the two connectors are fully mated.

{#if show3d}
<GridBox cols={4} classes="">

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/mmcx_male.glb" scale={2}/>
<div slot="content">MMCX Male</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/mmcx_female.glb" scale={2}/>
<div slot="content">MMCX Female</div>
</GLTFBox>

</GridBox>
{/if}

## IPEX/U.FL

These are basically two different names for one thing - U.FL from Hirose Electric Group is the base for these designs. And then IPEX make their own connectors, their IPEX MHF series is compatible with U.FL. You can find both names used interchangeably, and they can be mixed and matched as needed.

You'll most often find these on smaller devices and internal connections - receivers, small VTXs, inside radios and goggles to be adapted to SMA/RP-SMA.

The male and female connectors mate by plugging into each other. Much like MMCX, but usually vertical, and with a less distinct click. 

<Admonition type="danger" title="">

Be careful when taking them apart, the female connector attached to the coax can rip off the male connector on the PCB if you pull too hard/lift from an angle. Try to keep the two connectors parallel to each other when separating them.

</Admonition>

{#if show3d}
<GridBox cols={4} classes="">

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/ipex_male.glb" scale={2}/>
<div slot="content">IPEX/U.FL Male</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/ipex_female.glb" scale={2}/>
<div slot="content">IPEX/U.FL Female</div>
</GLTFBox>

</GridBox>
{/if}

<Admonition type="caution" title="">

Some manufacturers (namely FrSky and Jumper that I know of) use a smaller variant of this connector on their receivers - IPEX4. It's not compatible with regular U.FL/IPEX, so make sure you get the correct size!

</Admonition>

# Antenna Specs

## Gain

Gain measures how much the antenna radiates in a specific direction compared to a perfectly isotropic antenna (an antenna that emits radio waves in all directions equally). Such an antenna would have a gain of 0dB (decibels), but it can't exist - it's only a theoretical concept used as a reference to the measured gain of other antennas.

A higher gain antenna will have a narrower beam, and a lower gain antenna will have a wider beam. A narrower beam will reach further in one direction at the cost of not covering the area around it well. A wider beam will cover a larger area, but not reach as far.

A 3dB increase in gain is roughly equivalent to doubling the perceived power of the transmitter, and a 50% increase in range. A 6dB increase in antenna gain would be equivalent to quadrupling the perceived power of the transmitter, and double the range.

## Radiation Pattern

A radiation pattern for an antenna found in a specsheet will usually consist of two charts - one showing the horizontal projection, and one showing the vertical projection. From these projections, you can construct a 3d model of the radiation pattern.

## Directionality

An antenna can either be Omni-directional or Directional. In the simplest terms, Omni-directional antennas will radiate radio waves in all directions equally, while Directional antennas will radiate radio waves in a specific direction. Kinda a regular light vs a focused flashlight.

Of course, this is merely a simplification, as there exists no perfect antenna like that - so we'll have to go a bit deeper:

### Omni-directional

Omni-directional antennas are used the most, since they provide good coverage in all directions. A real omni antenna can't radiate a perfect sphere of radio waves, think of it more like a figure 8 shape on the vertical plane and a circle on the horizontal plane, centered around the antenna - the final 3d radiation pattern will look kinda like a donut. A higher gain omni antenna will be a bit more focused in the horizontal plane, reaching further around the antenna, but not as far up/down, and the opposite for a lower gain omni antenna.

{#if show3d}
<GridBox cols={3} classes="">

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/radiation/circle_h.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/pattern_h.glb" scale={1.75}/>
<div slot="content">Horizontal Projection</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/radiation/circle_h.glb" scale={1.75} rotation={[Math.PI / 2, 0, 0]}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/pattern_v.glb" scale={1.75}/>
<div slot="content">Vertical Projection</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/radiation/axes.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/pattern_3d.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/pattern_wire.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/pattern_h.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/pattern_v.glb" scale={1.75}/>

<div slot="content">3D Result</div>
</GLTFBox>

</GridBox>
{/if}

### Directional

Directional antennas are used when you want to reach further in one direction, but will not cover the surrounding area nearly as well. They're most often used on VRXs when you want to push the range very far in one direction. Of course there are no perfectly directional antennas, so they will have some coverage around them with side and back lobes. Increasing the gain will further narrow down the main lobe in exchange for an even longer reach.

{#if show3d}
<GridBox cols={3} classes="">

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/radiation/circle_h.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/directional_pattern_h.glb" scale={1.75}/>
<div slot="content">Horizontal Projection</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/radiation/circle_h.glb" scale={1.75} rotation={[Math.PI / 2, 0, 0]}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/directional_pattern_h.glb" scale={1.75} rotation={[Math.PI / 2, 0, 0]}/>
<div slot="content">Vertical Projection</div>
</GLTFBox>

<GLTFBox>
<GLTFWrapper url="/uploads/three/antennas/radiation/axes.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/directional_pattern_3d.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/directional_pattern_wire.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/directional_pattern_h.glb" scale={1.75}/>
<GLTFWrapper url="/uploads/three/antennas/radiation/directional_pattern_v.glb" scale={1.75}/>

<div slot="content">3D Result</div>
</GLTFBox>

</GridBox>
{/if}

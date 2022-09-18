# Vitroid FPV
[![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://vitroidfpv.com)

Your quick source of all FPV info, in a convenient place.

## What is this?

🔎If you're reading this, you probably clicked on the github link out of curiosity, great!

This is a constantly evolving project of mine, started around June 2021 as a small thing for me to learn a bit of HTML, now being completely re-written in Svelte and Tailwind, to make it modular, and allow others to easily contribute

## What can you find on the site?

Right now, there are three main pages available:
- ❓ FAQ - Quick answers to frequently asked questions in the world of FPV
- 🔧 Builds - All different kinds of (not only) quadcopters, from beginner to advanced
- 🛠️ Equipment - All the things you will need to get flying - Batteries and chargers, video and radio equipment, and tools to put it all together

## Contributing:
[![forthebadge](https://forthebadge.com/images/badges/contains-tasty-spaghetti-code.svg)](https://forthebadge.com)

This process requires at least some familiarity with Git, but should still be easy to follow with either the CLI, or Github desktop. As any SvelteKit app, it supports a full HMR Live Dev enviroment by running the `npm run dev` command in the CLI. Writing the `.md` files requires a page refresh on any change to take effect, the rest will re-render automatically on save

### Process:

(totally not yoinked from Betaflight and slightly changed cuz I have no idea with Git CLI 😎)

If you know CLI:
1. `git clone <URL of your fork>`
2. `git checkout svelte`
3. from there, do `checkout -b name-of-new-branch`
4. do your changes/additions
5. `git add .` will add all the files in the current directory
6. `git push origin name-of-new-branch` will push to your fork of the repo

Through GitHub Desktop (more noob friendly):
1. `File` > `Clone Repository` > find your forked repo, and select a path to clone it to
2. Change the default `main` branch to `origin/svelte`
3. Make a new branch based from the `svelte` branch
4. Go to the directory you cloned it to, and make your changes/additions
5. In GitHub Desktop, write a summary and commit the changes
6. And publish/push the branch to your forked repo

From there, you can submit a pull request from the GitHub UI

And I'm not entirely sure I wrote the instructions properly

### FAQ content:
The files in place should give you an idea of how the `.md` files should be written and named. The file naming scheme should be `dd-mm-yyyy-question-here-if-not-too-long.md`.

The site is designed in a way that all of the repeatable content is modular, the content that's easily accessible for contribution is in the `/modules/` directory, for example the `I'm barely getting any video range` FAQ:

```markdown
---
Category: Video
order: 6
title: I'm barely getting any video range
id: videoRange
answer: >-
  If you're only getting less than ~10m, even worse less than 1m of video range,
  these are often the main reasons:


  * **ABSOLUTELY** make sure that your VTX antenna is correctly installed. If not, you can *very* quickly fry the VTX. Make sure it's on correctly, and with the correct connector

  * Make sure you're on the correct frequency. You should be on the same band and channel as your VTX. This often occurs from incorrect behavior of the auto-search feature on goggles. Auto-search is not very reliable, it's always best to manually set the correct band and channel

  * The VTX may often be locked to 25mW for legal reasons. There are plenty of tutorials on how to unlock it to get a higher output power

  * The VTX can also be stuck in PIT mode (completely powered off, or transmitting at like 0.1mW). This can be changed with the hardware button on the VTX, or in Betaflight as well
---
```
Here are the explanations for all of the fields:
* The categories for the FAQ page are restricted to the ones that are available on the site itself, ie: Starting Out, Building, Betaflight, Video, Radio, Hardware. Putting one of those as the `Category` (case sensitive) will automatically sort it into the category in the site
* The `order` value specifies the order in which the answers will be shown in their respective category. I will likely have to change the naming scheme because currently it can only go to 10 per category, bit of an oversight  
* `title` is the question name that gets displayed as the collapsible  
* `id` is the question anchor which can then be shared when clicking on the hashtag button next to it
* And lastly the `answer: >-` supports full markdown fomatting, you only need to indent the lines

As for code style, I don't care as long as it works and is somewhat readable and consistent, though even I often fail to do that

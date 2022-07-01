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

This process requires at least some familiarity with Git, but should still be easy to follow with either the CLI, or Github desktop

### Process:

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

### Some rules and principles to follow:
The files in place should give you an idea of how the `.md` files should be written and named. The file naming scheme should be `dd-mm-yyyy-question-here-if-not-too-long.md`.

The site is designed in a way that all of the repeatable content is modular, the content that's easily accessible for contribution is in the `/modules/` directory:

```markdown
---
Category: Betaflight 
# Starting Out, Building, Betaflight, Video, Radio, Hardware (case sensitive)
title: Lorem?
# Question title
id: Lorem
# Question ID for sharing in links
answer: >-
 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 consequat.
#  Question answer (write under the >- tag with indentation)
---
```
Every file in the `/modules/faqs/` directory represents one question and its corresponding info and answer on the faq page on the site. The categories for the FAQ page are restricted to the ones that are available on the site itself, ie:
- Starting Out
- Building
- Betaflight
- Video
- Radio
- Hardware

Putting one of those as the `Category` (case sensitive) will automatically sort it into the category in the site, and you can write the `Question` and `Answer` yourself.

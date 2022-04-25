# Vitroid FPV

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

### Some rules and principles to follow:
The files in place should give you an idea of how the `.md` files should be written and named. The file naming scheme should be `dd-mm-yyyy-question-here-if-not-too-long`, follow the below example for an FAQ question to learn more about the content itself. 

The site is designed in a way that all of the repeatable content is modular. Let's take for an example the [Starting Question](https://github.com/VitroidFPV/VitroidFPV/blob/svelte/faqs/13-04-2022-starting-out-question.md?plain=1):

```markdown
---
Category: Starting Out
title: Starting out question
answer: Starting out question but it's longer so I can have more lines so I can
  display long stuff and make it look nice and oh formatting doesn't work
---
```
Every file in the `/faqs/` directory represents one question and its corresponding info and answer on the faq page on the site. The categories for the FAQ page are restricted to the ones that are available on the site itself, ie:
- Starting Out
- Building
- Betaflight
- Video
- Radio
- Hardware

Putting one of those as the `Category` (case sensitive) will automatically sort it into the category in the site, and you can write the `Question` and `Answer` yourself.

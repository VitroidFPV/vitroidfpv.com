# Vitroid FPV

[![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://vitroidfpv.com)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/H2H4MEQVK)
[![Netlify Status](https://api.netlify.com/api/v1/badges/58be999e-c72b-4fda-8a58-b9af04aa21b4/deploy-status)](https://app.netlify.com/sites/vitroidfpv-sv/deploys)

Your quick source of all FPV info, in a convenient place.

This site is a constantly evolving project of mine, started around June 2021 as a small thing for me to learn a bit of HTML, now being completely rewritten in Svelte and Tailwind, to make it modular, and allow others to contribute easily!

If you want to request content, please make a [Content Suggestion issue](https://github.com/VitroidFPV/VitroidFPV/issues/new/choose), or make a [direct content request](https://ko-fi.com/vitroid/commissions).

## What can you find on the site?

Right now, there are four main pages available:

- ❓ FAQ - Quick answers to frequently asked questions in the world of FPV
- 🔧 Builds - All different kinds of (not only) quadcopters, from beginner to advanced
- 🛠️ Equipment - All the things you will need to get flying - Batteries and chargers, video and radio equipment, and tools to put it all together
- 📰 Articles - Reviews, FPV news, guides/tutorials, and more in something that's definitely not a blog

## Contributing:

[![forthebadge](https://forthebadge.com/images/badges/contains-tasty-spaghetti-code.svg)](https://forthebadge.com)

This process requires at least some familiarity with Git, but should still be easy to follow with either the CLI or Github desktop. As any SvelteKit app, it supports a complete HMR Live Dev environment by running the `npm run dev` command in the CLI

### Process:

**CLI**:

1. Navigate to the directory you want to clone the repo to
1. `git clone <URL of your fork>`
1. `cd VitroidFPV`
1. `checkout -b name-of-new-branch`
1. do your changes/additions
1. `git add .` will add all the files in the current directory
1. `git push origin name-of-new-branch` will push to your fork of the repo

**GitHub Desktop**:

1. `File` > `Clone Repository` > find your forked repo, and select a path to clone it to
2. Make a new branch based from the `main` branch
3. Go to the directory you cloned it to, and make your changes/additions
4. In GitHub Desktop, write a summary and commit the changes
5. And publish/push the branch to your forked repo

From there, you can submit a pull request from the GitHub UI

// 🧙‍♂️🪄📰

import fs from "fs";
import path from "path";
import inquirer from "inquirer";

async function generateMarkdownFile() {
	// Prompt for inputs
	const {
		title,
		description,
		author,
		category,
		visible
	} = await inquirer.prompt([
		{
			type: "list",
			name: "category",
			message: "Select the category:",
			choices: ["Guides", "Tutorials", "News", "Reviews", "Misc"]
		},
		{
			type: "input",
			name: "title",
			message: "Enter the title:"
		},
		{
			type: "input",
			name: "description",
			message: "Enter the description:"
		},
		{
			type: "input",
			name: "author",
			message: "Enter the author:"
		},
		{
			type: "confirm",
			name: "visible",
			message: "Is it visible?",
			default: true
		}
	]);

	// Format the current date
	const formattedDate = new Date().toISOString();

	// Generate the Markdown content
	const mdContent = `---
title: ${title}
description: ${description}
visible: ${visible}
category: ${category}
author: ${author}
img: /uploads/placeholder.png
date: ${formattedDate}
---

<script>
	import GridBox from "$components/articlesPage/GridBox.svelte";
	import GridItem from "$components/articlesPage/GridItem.svelte";
	import ImgGrid from "$components/articlesPage/ImgGrid.svelte";
	import Tablist from "$components/articlesPage/Tablist.svelte";
	import Tab from "$components/articlesPage/Tab.svelte";
	import Admonition from "$components/articlesPage/Admonition.svelte";
	import Chip from "$components/Chip.svelte";
</script>

Content goes here
`;

	const filename = `${category.toLowerCase()}-${title.toLowerCase().replace(/ /g, "-")}.svx`;
	const filePath = `./modules/articles/${filename}`;

	const directory = path.dirname(filePath);
  	fs.mkdirSync(directory, { recursive: true });

	// Write the Markdown file
	fs.writeFileSync(filePath, mdContent);

	console.log(`Markdown file generated: ${filePath}`);
}

generateMarkdownFile();
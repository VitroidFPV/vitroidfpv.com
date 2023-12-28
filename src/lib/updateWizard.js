// use enquirer to update the date frontmatter metadata in a markdown file
// list all available articles, and allow the user to select one
// then update the date metadata to the current date, or add an "updated" date depending on the user's choice

import fs from "fs";
import path from "path";
import inquirer from "enquirer";

async function updateArticleDate() {

	const articles = fs.readdirSync("./modules/articles/");

	// prompt to choose between updating the "date" or "updated" metadata
	const { dateType } = await inquirer.prompt([
		{
			type: "select",
			name: "dateType",
			message: "Select the date type to update:",
			choices: ["date", "updated"]
		}
	])

	// prompt the user to select an article with an autocomplete prompt

	const { article } = await inquirer.prompt([
		{
			type: "autocomplete",
			name: "article",
			message: "Select an article to update",
			choices: articles,
			delay: 300
		}
	])
	.catch(err => console.log(err));

	const articlePath = path.join("./modules/articles/", article);
	const articleContents = fs.readFileSync(articlePath, "utf-8");

	const updatedMatch = articleContents.match(/updated: (.*)/);
	const dateMatch = articleContents.match(/date: (.*)/);

	if (dateType === "date") {
		// date is formatted as 2023-12-1T18:40:51.531Z
		// replace the date with the current date
		const currentDate = new Date().toISOString();
		if (dateMatch[0]) {
			const newArticleContents = articleContents.replace(dateMatch[0], `date: ${currentDate}`);
			fs.writeFileSync(articlePath, newArticleContents);
			console.log(`Updated ${article} with date: ${currentDate}`);
		}
	}
	else if (dateType === "updated") {
		// read the file contents and find the "updated:" line using regex
		// if it doesn't exist, add a line below the "date:" line with "updated: <current date>"
		// if it does exist, replace the date with the current date
		const currentDate = new Date().toISOString();

		if (updatedMatch) {
			const newArticleContents = articleContents.replace(updatedMatch[0], `updated: ${currentDate}`);
			fs.writeFileSync(articlePath, newArticleContents);
			console.log(`Updated ${article} with updated: ${currentDate}`);
		}
		else if (dateMatch[0]) {
			const newArticleContents = articleContents.replace(dateMatch[0], `${dateMatch[0]}\nupdated: ${currentDate}`);
			fs.writeFileSync(articlePath, newArticleContents);
			console.log(`Updated ${article} with updated: ${currentDate}`);
		}
	}

}

updateArticleDate();
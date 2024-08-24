import fs from "fs";
import path from "path";
import inquirer from "enquirer";
import { list } from "postcss";

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listDirectories(dir) {
    const items = fs.readdirSync(dir);
    /**
	 * @type {string[]}
	 */
    const directories = [];
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            directories.push(fullPath);
            directories.push(...listDirectories(fullPath)); // Recursively list subdirectories
        }
    });
    return directories;
}

// listDirectories("modules/")

const paths = listDirectories("modules/");
// modules\anatomy
// modules\anatomy\5inch-analog
// modules\articles
// modules\builds
// modules\builds\1s-2s-micro
// modules\builds\3inch-cinewhoop
// modules\builds\3s-4s-micro
// modules\builds\5inch-advanced
// modules\builds\5inch-beginner
// modules\builds\5inch-race
// modules\builds\reference
// modules\equipment
// modules\equipment\charging
// modules\equipment\radioList
// modules\equipment\videoList
// modules\equipmentLists
// modules\faq
// modules\support

const blackList = ["anatomy", "articles", "faq", "support"]

// filter out blacklisted directories
const filteredPaths = paths.filter(p => !blackList.includes(p.split("\\")[1])).map(p => p.replace(/\\/g, "/"))

// console.log(filteredPaths)

// prompt user to select a directory
const selectDir = async () => {
	const response = await inquirer.prompt({
		type: "select",
		name: "dir",
		message: "Select a directory",
		choices: filteredPaths
	});
	// @ts-ignore
	return response.dir;
}

// script to go through .md files in a directory and convert the info frontmatter key format
// ---
// color: green
// category: Motors
// group: undefined
// visible: true
// order: 1
// title: Emax Eco 2
// link: https://www.racedayquads.com/products/emax-eco-ii-series-2207-1900kv-motor?_pos=11&_sid=7c6098b62&_ss=r
// img: https://cdn.shopify.com/s/files/1/1285/4651/products/569A1011_c1986f8b-e57a-4ddc-a5ea-59fabc49d9bb_1800x1800.jpg?v=1602864968
// text: For the price, these are one of the best budget motors. They work well, but they aren't unibell so they're less durable
// info: $13.99;2207/2306<Stator size>;1900KV;33.5g
// ---
// from
// info: $13.99;2207/2306<Stator size>;1900KV;33.5g
// to
// info:
//   - "$13.99"
//   - "2207/2306<Stator size>"
//   - "1900KV"
//   - "33.5g"
// ---

// get all md files in the selected directory, prompt user to select a file
// read the file, convert the info key format, write the file

const convertInfo = async () => {
	const dir = await selectDir();
	const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
	const selectedFile = await inquirer.prompt({
		type: "select",
		name: "file",
		message: "Select a file",
		choices: files
	});
	const filePath = path.join(dir, selectedFile.file);
	const fileContent = fs.readFileSync(filePath, "utf-8");

	// from
	// info: $13.99;2207/2306<Stator size>;1900KV;33.5g
	// to
	// info:
	//   - "$13.99"
	//   - "2207/2306<Stator size>"
	//   - "1900KV"
	//   - "33.5g"
	// split at ; and remove quotes
	const newContent = fileContent.replace(/info: (.*)/g, (match, p1) => {
		const info = p1.split(";").map(i => `${i.replace(/"/g, "")}`).join("\n  - ");
		return `info:\n  - ${info}`;
	});

	fs.writeFileSync(filePath, newContent);
}

convertInfo();
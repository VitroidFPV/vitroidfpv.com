import fs from "fs";
import path from "path";
import inquirer from "enquirer";

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

const paths = listDirectories("modules/");
const blackList = ["anatomy", "articles", "faq", "support"];

// filter out blacklisted directories
const filteredPaths = paths.filter(p => !blackList.includes(p.split("\\")[1])).map(p => p.replace(/\\/g, "/"));

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

// function to convert the info key format in a file
const convertFile = (/** @type {fs.PathOrFileDescriptor} */ filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const newContent = fileContent.replace(/info: (.*)/g, (match, p1) => {
        const info = p1.split(";").map(i => `${i.replace(/"/g, "")}`).join("\n  - ");
        return `info:\n  - ${info}`;
    });
    fs.writeFileSync(filePath, newContent);
}

// script to go through .md files in a directory and convert the info frontmatter key format
const convertInfo = async () => {
    const dir = await selectDir();
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

    const { conversionType } = await inquirer.prompt({
        type: "select",
        name: "conversionType",
        message: "Do you want to convert a single file or all files in the directory?",
        choices: ["Single file", "All files"]
    });

    if (conversionType === "Single file") {
        const selectedFile = await inquirer.prompt({
            type: "select",
            name: "file",
            message: "Select a file",
            choices: files
        });
        const filePath = path.join(dir, selectedFile.file);
        convertFile(filePath);
    } else {
        files.forEach(file => {
            const filePath = path.join(dir, file);
            convertFile(filePath);
        });
    }
}

convertInfo();
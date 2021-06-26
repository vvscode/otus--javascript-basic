#!/usr/bin/env node
import fs from "fs";
const logger = console.log;
const [directory, pattern] = process.argv.slice(2);

if (["--help", "-h"].includes(directory)) {
    logger("Usage: node ls.mjs <directory> [pattern]");
    process.exit(0);
}

fs.readdir(directory, (err, files) => {
    const regex = new RegExp(pattern, "g");
    files.forEach((file) => {
        if (!pattern || regex.test(file)) {
            logger(file);
        }
    });
});

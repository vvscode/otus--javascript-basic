#!/usr/bin/env node

const fs = require("fs");

const args = process.argv.slice(2);
const logger = console.log;

/**
 * Prints help message and aborts program
 */
function help() {
  logger("Usage: node ls.js <directory> [filter-regex]");
  process.exit(0);
}

/**
 * Prints list of files in a directory
 * @param {string} dir
 * @param {string} pattern
 */
function listFiles(dir, pattern) {
  fs.readdir(directory, (err, files) => {
    const regex = new RegExp(pattern, "g");
    files.forEach((file) => {
      if (!pattern || regex.test(file)) {
        logger(file);
      }
    });
  });
}

if (["--help", "-h"].includes(args[0])) {
  help();
}

const [directory, pattern] = args;

listFiles(directory, pattern);

/**
 * Example: ./ls.js . '.+json'
 * Example: ./ls.js . '.+js$'
 */

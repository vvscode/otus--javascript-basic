import fs from "fs";
import inquirer from "inquirer";

import * as node from "./configs/tsconfig.node.json";
import * as react from "./configs/tsconfig.react.json";
import * as recommended from "./configs/tsconfig.recommended.json";

const prompt = inquirer.createPromptModule();

prompt([
  {
    type: "confirm",
    message: `Your current working directory is ${process.cwd()} do you want to proceed?`,
    name: "proceed",
    default: true,
  },
])
  .then(({ proceed }) => {
    if (!proceed) {
      console.log("\x1b[33m%s", "Bye!");

      process.exit(0);
    }

    prompt([
      {
        type: "list",
        message: "Pick the typescript configuration file for your needs:",
        name: "config",
        choices: ["recommended", "react", "node"],
      },
      {
        type: "input",
        message:
          "Enter the path to the directory you want the configuration file to be copied to:\n",
        name: "path",
        default: process.cwd(),
        validate: async (value) => {
          try {
            const stats = await fs.promises.stat(value);

            if (!stats.isDirectory()) {
              return "Not a directory!";
            }
          } catch (e) {
            return e;
          }

          return true;
        },
      },
    ]).then(({ path, config }) => {
      let fileToWrite = "";
      if (config === "node") {
        fileToWrite = JSON.stringify(node);
      } else if (config === "react") {
        fileToWrite = JSON.stringify(react);
      } else {
        fileToWrite = JSON.stringify(recommended);
      }

      fs.writeFile(path + "\\tsconfig.json", fileToWrite, () => {
        console.log("\x1b[32m%s\x1b[0m", "Config file succesfully copied!");
      });
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });

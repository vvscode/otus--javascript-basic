import fs from "fs";

fs.writeFileSync("assets/writeFile.txt", "hello! I'm new born file!", {
  encoding: "utf-8",
});

import fs from "fs";

(async function () {
  const stats = [];

  const filenames = ["assets/tmp.json", "assets/fileThatNotExists.txt"];

  filenames.forEach((file) => {
    stats.push(fs.promises.stat(file));
  });

  for (let i = 0; i < stats.length; i++) {
    try {
      console.log(await stats[i]);
    } catch (e) {
      console.log("error!");
    }
  }

  console.log(stats, "stats");
})();

import fs from "fs";

const watcher = fs.watch(
  "./assets/tmp.txt",
  { encoding: "utf-8" },
  (eventType, filename) => {
    // https://stackoverflow.com/questions/12978924/fs-watch-fired-twice-when-i-change-the-watched-file
    console.log(eventType);

    if (filename) {
      console.log(filename, "\n");
    }
  }
);

// watcher.on('change', (event, filename) => {
//   console.log(event, filename, '\n');
// })

import fs from "fs";

fs.readFile("./assets/song.mp3", (err, data) => {
  if (err) console.log(err);

  console.log(data);
  console.log(data.length);

  fs.writeFile("assets/mySong.mp3", data, (err) => {
    if (err) console.log(err);
  });
});

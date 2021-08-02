import fs from "fs";
import { Buffer } from "buffer";

const stream = fs.createWriteStream("./assets/write.txt");

if (fs.existsSync("./files/write.txt")) {
  fs.unlink("./files/write.txt", () => console.log("file cleared!"));
}

stream.on("ready", () => {
  stream.write("Hello I'm newborn file!:)", (err) => console.log(err));

  const buffer = Buffer.alloc(40);
  buffer.write("\nI'm writing buffer right now!");

  console.log(buffer.toString());

  stream.write(buffer, (err) => {
    if (err) console.log(err);
    stream.close();
  });
});

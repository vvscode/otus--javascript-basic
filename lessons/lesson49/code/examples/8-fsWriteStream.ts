import fs from "fs";
import { Buffer } from "buffer";

// if (fs.existsSync("./files/write.txt")) {
//   fs.unlink("./files/write.txt", () => console.log("file deleted!"));
// }

const stream = fs.createWriteStream("../assets/write.txt");

stream.on("ready", () => {
  stream.write("Hello I'm newborn file!:)", (err) => console.log(err));

  const buffer = Buffer.alloc(40);
  buffer.write("\nI'm writing buffer right now!");

  console.log(buffer);

  stream.write(buffer, (err) => {
    if (err) console.log(err);
    stream.close();
  });
});

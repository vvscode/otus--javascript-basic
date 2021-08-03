import fs from "fs";
import { Buffer } from "buffer";

fs.open(
  new URL(
    "file:///D:/JS/otus--javascript-basic/lessons/lesson49/code/assets/tmp.txt"
  ),
  "w",
  (err, fd) => {
    if (err) console.log(err);

    const buffer = Buffer.alloc(20);
    const offset = 0;
    const length = 20;
    const position = null;

    console.log(buffer, "before read");

    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
      if (err) console.log(err);

      console.log(bytesRead, "number of bytes read");
      console.log(buffer, "after read");
      console.log(buffer.toString("hex"));
    });
  }
);

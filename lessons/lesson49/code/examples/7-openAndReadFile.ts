import fs from "fs";
import { Buffer } from "buffer";

fs.open("assets/tmp.txt", "r", (err, fd) => {
  if (err) console.log(err);

  const buffer = Buffer.alloc(20);
  const offset = 0;
  const length = 19;
  const position = null;

  console.log(buffer, "before read");

  fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
    if (err) console.log(err);

    console.log(bytesRead, "number of bytes read");
    console.log(buffer, "after read");
    console.log(buffer.toString());
  });
});

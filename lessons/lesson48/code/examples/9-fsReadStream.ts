import fs from "fs";

const stream = fs.createReadStream("./assets/read.txt");
// const stream = fs.createReadStream('./assets/read.txt', { highWaterMark: 1000});

stream.on("readable", () => {
  console.log("readable");
  const data = stream.read();
  // const data = stream.read(1);

  if (data) console.log(data.toString());
});

// stream.on('data', (chunk: Buffer) => {
//   console.log('data');
//   console.log(chunk)
// })

// stream.on('end', () => console.log('done'));

// (async function() {
//   const stream = fs.createReadStream('./assets/read.txt');

//   for await (const chunk of stream) {
//     console.log(chunk.toString())
//   }
// })()

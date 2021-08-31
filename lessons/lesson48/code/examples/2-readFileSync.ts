const fs = require("fs");

const data = fs.readFileSync("./examples/1-readFileSync.ts", "utf8");
console.log(`Data length: ${data.length}`);
console.log(data);

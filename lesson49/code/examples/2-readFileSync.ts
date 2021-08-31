const fs = require("fs");

const data = fs.readFileSync("./2-readFileSync.ts", "utf8");
console.log(`Data length: ${data.length}`);
console.log(data);

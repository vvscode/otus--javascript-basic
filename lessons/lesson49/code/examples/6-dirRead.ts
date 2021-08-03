import fs from "fs";

async function print(path: string) {
  const dir = await fs.promises.opendir(path);

  console.log(dir);

  for await (const dirent of dir) {
    console.log(dirent.name);
    console.log(dirent.name, dirent.isFile());
    // console.log(dirent.isDirectory());
  }
}

print("./").catch(console.error);

function printCb(path) {
  fs.opendir(path, (err, dir) => {
    if (err) console.log(err);

    console.log(dir);
  });
}

// printCb('./');

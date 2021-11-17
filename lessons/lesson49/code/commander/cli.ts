import { readdir } from "fs/promises";
import { basename, sep } from "path";
import { Command } from "commander";

const program = new Command();

const BRANCH = "└──";
const TREE_TRUNK = "│  ";
const EMPTY = "   ";

type Items = { name: string; items?: Items[] };

export async function getDirTree(path: string, depth = 99) {
  let tree: Items = {
    name: basename(path),
  };
  try {
    const files = await readdir(path, { withFileTypes: true });

    for (const file of files) {
      let branch: { name: string };
      if (file.isDirectory() && depth !== 1) {
        branch = await getDirTree(path + sep + file.name, --depth);
      } else {
        branch = { name: file.name };
      }

      tree["items"] == null
        ? (tree["items"] = [branch])
        : tree["items"].push(branch);
    }
    return tree;
  } catch (err) {
    console.log(err);
  }
}

export function createTreeShape(
  obj: Items,
  prefix = [],
  level = 0,
  isParentLast = true
) {
  const result = [];
  const { name, items } = obj;

  result.push(prefix.join("") + name);

  if (items !== undefined) {
    const newPrefix = prefix.concat([BRANCH]);
    const branches = newPrefix.filter((el) => el === BRANCH);
    if (branches.length > 1) {
      for (let i = 0; i < newPrefix.length - 1; i++) {
        if (newPrefix[i] === BRANCH) newPrefix[i] = TREE_TRUNK;
      }
    }

    ++level;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isLast = i === items.length - 1;
      if (isParentLast && level - 2 >= 0) newPrefix[level - 2] = EMPTY;
      result.push(...createTreeShape(item, newPrefix, level, isLast));
    }
  }

  return result;
}

// program
//   .version("1.0.0", "-v, --vers", "output the current version")
//   .option("-p, --path [string]", "path to the directory", '.')
//   .option("-d, --depth <number>", "the depth of search", (value, _) => {
//     return '2';
//   });

program
  .command("exec [path] <depth>")
  .description("draw directory tree for given path with given depth")
  .action(async (path, depth, options) => {
    console.log(options, "options");
    await getDirTree(path ? path : ".", depth ? depth : 2).then((result) =>
      console.log(createTreeShape(result).join("\n"))
    );
  });

program.showHelpAfterError("(add --help for additional information)");

// program.showHelpAfterError('(add --help for additional information)');

program.parse();

const options = program.opts();

console.log(options);

if (options.path && options.depth) {
  getDirTree(options.path, options.depth).then((result) =>
    console.log(createTreeShape(result).join("\n"))
  );
}

// getDirTree(
//   '.', 2
// ).then((result) => console.log(createTreeShape(result).join("\n")));

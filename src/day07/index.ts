import run from "aocrunner";

type Line = [string, string];
type File = { size: number };
type Directory = { contents: Map<string, Entry>; size: number };
type Entry = Directory | File;

const isNumber = (str: string) => !isNaN(parseInt(str, 10));

const createDir = (lines: Line[]) => {
  const dir: Directory = { contents: new Map(), size: 0 };
  let skipToLine = 0;
  for (const index of lines.keys()) {
    const [left, right] = lines[index];

    if (index < skipToLine) continue;

    if (left === "cd") {
      if (right === "..") {
        break;
      } else {
        dir.contents.set(right, createDir(lines.slice(index + 1)));
        skipToLine = lines.findIndex(([_, right]) => right === "..");
      }
    }

    if (isNumber(left)) {
      dir.contents.set(right, { size: parseInt(left, 10) });
    }
  }

  dir.contents.forEach((entry) => (dir.size += entry.size));

  return dir;
};

const isDir = (entry: Directory | Entry): entry is Directory =>
  Object.keys(entry).includes("contents");

const parseInput = (rawInput: string) => {
  const lines = rawInput
    .split("\n")
    .map((line) => line.replace("$ ", "").split(" ") as Line);

  return createDir(lines);
};

const getSumOfEntries = (contents: Map<string, Entry>) => {
  let sum = 0;

  for (const entry of contents.entries()) {
    if (isDir(entry[1])) {
      if (entry[1].size <= 100000) {
        sum += entry[1].size;
      } else {
        getSumOfEntries(entry[1].contents);
      }
    }
  }

  return sum;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getSumOfEntries(input.contents);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

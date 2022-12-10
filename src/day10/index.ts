import run from "aocrunner";
import { readFileSync } from "fs";
import { ocr } from "../utils/ocr.js";

type Command = { action: "noop"; value: undefined } | { action: "addx"; value: number };

const range = (from: number, to: number) =>
  [...Array(to - from).keys()].map((num) => num + from);

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map<Command>((row) => {
    return row.slice(0, 4) === "addx"
      ? { action: "addx", value: parseInt(row.split(" ")[1], 10) }
      : { action: "noop" };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let strength = 0;
  let cycle = 0;
  let register = 1;

  const doCycle = () => {
    cycle++;
    if ((cycle - 20) % 40 === 0) {
      strength += cycle * register;
    }
  };

  input.forEach(({ action, value }) => {
    doCycle();
    if (action === "noop") return;
    doCycle();
    register += value;
  });

  return strength;
};

const SCREEN_WIDTH = 40;
const SCREEN_HEIGHT = 6;

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let pixels = "";
  let cycle = 0;
  let register = 1;

  const doCycle = () => {
    const pixelPosition = cycle % SCREEN_WIDTH;
    if (pixelPosition >= register - 1 && pixelPosition <= register + 1) {
      pixels += "#";
    } else {
      pixels += ".";
    }
    cycle++;
  };

  input.forEach(({ action, value }) => {
    doCycle();
    if (action === "noop") return;
    doCycle();
    register += value;
  });

  return range(0, SCREEN_HEIGHT)
    .map((lineNumber) =>
      pixels.slice(lineNumber * SCREEN_WIDTH, (lineNumber + 1) * SCREEN_WIDTH),
    )
    .join("\n");
};

run({
  part1: {
    tests: [
      { input: readFileSync("./src/day10/testInput1.txt", "utf8"), expected: 13140 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: readFileSync("./src/day10/testInput1.txt", "utf8"),
        expected: `##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......####\n#######.......#######.......#######.....`,
      },
    ],
    solution: (input) => ocr(part2(input)),
  },
  trimTestInputs: true,
  onlyTests: false,
});

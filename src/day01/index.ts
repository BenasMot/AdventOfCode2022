import run from "aocrunner";
import { readFileSync } from "fs";

type Elf = number[];

const parseInput = (rawInput: string): Elf[] => {
  return rawInput
    .split("\n\n")
    .map((elfStr) => elfStr.split("\n").map((caloriesStr) => parseInt(caloriesStr, 10)));
};

const part1 = (rawInput: string) => {
  const elves = parseInput(rawInput);

  let mostCaloriesElfIndex = 0;
  let mostCalories = 0;
  elves.forEach((elf, index) => {
    const elfCalories = elf.reduce((a, b) => a + b);
    if (elfCalories > mostCalories) {
      mostCalories = elfCalories;
      mostCaloriesElfIndex = index;
    }
  });

  return mostCalories;
};

const part2 = (rawInput: string) => {
  const elves = parseInput(rawInput);

  const topThreeSum = elves // number[][]
    .map((elf) => elf.reduce((a, b) => a + b)) // number[]
    .sort((a, b) => b - a) // max -> min
    .slice(0, 3)
    .reduce((a, b) => a + b);

  return topThreeSum;
};

run({
  part1: {
    tests: [
      {
        input: readFileSync("./src/day01/input.txt", "utf-8"),
        expected: 70116,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: readFileSync("./src/day01/input.txt", "utf-8"),
        expected: 206582,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

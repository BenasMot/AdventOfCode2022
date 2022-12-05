import run from "aocrunner";
import { readFileSync } from "fs";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((row) =>
      row
        .split(",")
        .map((elf) => elf.split("-").map((number) => parseInt(number, 10))),
    );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const overlaps = input.filter(
    (pair) =>
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]),
  );

  return overlaps?.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const overlaps = input.filter(
    (pair) =>
      (pair[0][1] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]) ||
      (pair[0][1] >= pair[1][0] && pair[0][0] < pair[1][1]) ||
      (pair[1][1] >= pair[0][0] && pair[1][0] < pair[0][1]),
  );

  return overlaps?.length;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
      { input: `2-4,6-8`, expected: 0 },
      { input: `6-8,2-4`, expected: 0 },
      { input: `2-4,4-8`, expected: 1 },
      { input: `2-4,1-1`, expected: 0 },
      { input: `2-4,1-2`, expected: 1 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

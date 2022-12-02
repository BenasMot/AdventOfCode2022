import run from "aocrunner";
import { readFileSync } from "fs";

type Symbol = "A" | "B" | "C" | "X" | "Y" | "Z";
enum SHAPE {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

type ResultSymbol = "X" | "Y" | "Z";
enum RESULT {
  WIN = 6,
  DRAW = 3,
  LOSE = 0,
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => ({
    opponent: resolveShape(line[0] as Symbol),
    player: resolveShape(line[2] as Symbol),
  }));

const parseInput2 = (rawInput: string) =>
  rawInput.split("\n").map((line) => ({
    opponent: resolveShape(line[0] as Symbol),
    result: resolveDesiredResult(line[2] as ResultSymbol),
  }));

const resolveShape = (symbol: Symbol): SHAPE => {
  switch (symbol) {
    case "A":
    case "X":
      return SHAPE.ROCK;

    case "B":
    case "Y":
      return SHAPE.PAPER;

    case "C":
    case "Z":
      return SHAPE.SCISSORS;
  }
};

const resolveDesiredResult = (symbol: ResultSymbol): RESULT => {
  switch (symbol) {
    case "X":
      return RESULT.LOSE;
    case "Y":
      return RESULT.DRAW;
    case "Z":
      return RESULT.WIN;
  }
};

const isWinner = (player: SHAPE, opponent: SHAPE) => {
  return (3 + player - opponent) % 3 === 1;
};

const getSolution = (desiredResult: RESULT, opponent: SHAPE): SHAPE => {
  const offset = desiredResult / 3 - 1;
  return (3 + opponent + offset) % 3 || 3;
};

const part1 = (rawInput: string) => {
  const rounds = parseInput(rawInput);

  let score = 0;

  rounds.forEach((round) => {
    const { player, opponent } = round;

    const win = isWinner(player, opponent);
    const draw = player === opponent;

    score += player + (win ? 6 : draw ? 3 : 0);
  });

  return score;
};

const part2 = (rawInput: string) => {
  const rounds = parseInput2(rawInput);

  let score = 0;
  rounds.forEach((round) => {
    const { opponent, result } = round;
    score += result;
    score += getSolution(result, opponent);
  });

  return score;
};

run({
  part1: {
    tests: [
      { input: "A Y\nB X\nC Z", expected: 15 },
      { input: "C X", expected: 7 },
      { input: "C Y", expected: 2 },
      { input: "B Y", expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: "A Y", expected: 4 },
      { input: "C Z", expected: 7 },
      { input: "B X", expected: 1 },
      { input: "A Y\nB X\nC Z", expected: 12 },
      { input: "C Y", expected: 6 },
      { input: "A X", expected: 3 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

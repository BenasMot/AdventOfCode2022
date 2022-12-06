import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let solution = 0;
  let window: string[] = [];
  input.split("").some((symbol, index) => {
    if (window.length === 4 && new Set(window).size === 4) {
      solution = index;
      return true;
    }

    if (window.length === 4) {
      window.shift();
    }
    window.push(symbol);
    return false;
  });

  return solution;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let solution = 0;
  let window: string[] = [];
  input.split("").some((symbol, index) => {
    if (window.length === 14 && new Set(window).size === 14) {
      solution = index;
      return true;
    }

    if (window.length === 14) {
      window.shift();
    }
    window.push(symbol);
    return false;
  });

  return solution;
};

run({
  part1: {
    tests: [
      { input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: 5 },
      { input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: 6 },
      { input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, expected: 7 },
      { input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: 10 },
      { input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: 11 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

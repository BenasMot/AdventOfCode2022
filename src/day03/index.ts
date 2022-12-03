import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const letterToValue = (letter: string) => {
  const charCode = letter.charCodeAt(0);
  const a = "a".charCodeAt(0);
  const A = "A".charCodeAt(0);

  return charCode - a > 0 ? charCode - a + 1 : charCode - A + 27;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const letterValues = input
    .map((line) => [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ])
    .map((rucksack) => {
      const letters = rucksack[0].split("");
      const matchingLetter = letters.find((letter) =>
        rucksack[1].includes(letter),
      );
      return matchingLetter as string;
    })
    .map(letterToValue);

  return letterValues.reduce((a, b) => a + b);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let values = [];
  for (let i = 0; i < input.length; i += 3) {
    values.push(input.slice(i, i + 3));
  }

  const letters = values
    .map((groupOfThree) => {
      const letters1 = groupOfThree[0].split("");

      let commonLetters12 = letters1.filter((letter) =>
        groupOfThree[1].includes(letter),
      );

      let commonLetters123 = commonLetters12.find((letter) =>
        groupOfThree[2].includes(letter),
      );

      return commonLetters123 as string;
    })
    .map(letterToValue);

  return letters.reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

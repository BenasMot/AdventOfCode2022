import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n\n");

  const arrangementInput = input[0].split("\n");
  const columnCountLine = arrangementInput[arrangementInput.length - 1].trim();
  const columnCount = parseInt(columnCountLine[columnCountLine.length - 1], 10);

  const arrangement = arrangementInput
    .reverse()
    .slice(1)
    .reduce((accumulator, line) => {
      let columns: string[][] = [...accumulator];

      for (let i = 0; i < columnCount; i++) {
        if (line[1 + i * 4] !== " " && line[1 + i * 4] !== undefined) {
          if (columns[i] === undefined) {
            columns[i] = [];
          }

          columns[i].push(line[1 + i * 4]);
        }
      }

      return columns;
    }, [] as string[][]);

  const instructions = input[1].split("\n").map((line) => {
    const parts = line.split(/move | from | to /);

    return {
      move: parseInt(parts[1], 10),
      from: parseInt(parts[2], 10),
      to: parseInt(parts[3], 10),
    };
  });

  return { arrangement, instructions };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let arrangement = [...input.arrangement];

  input.instructions.forEach(({ move, from, to }) => {
    for (let i = 0; i < move; i++) {
      const container = arrangement[from - 1].pop() as string;
      arrangement[to - 1].push(container);
    }
  });

  return arrangement.reduce((string, column) => string + column.pop(), "");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let arrangement = [...input.arrangement];

  input.instructions.forEach(({ move, from, to }) => {
    const containers = arrangement[from - 1].slice(-move);
    const modifiedColumn = arrangement[from - 1].slice(0, -move);

    arrangement[from - 1] = modifiedColumn;
    arrangement[to - 1].push(...containers);
  });

  return arrangement.reduce((string, column) => string + column.pop(), "");
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3  

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3  

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});

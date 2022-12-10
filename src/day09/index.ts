import run from "aocrunner";

type Direction = "U" | "D" | "L" | "R";
type Instruction = { direction: Direction; distance: number };

interface Coords {
  x: number;
  y: number;
}

const range = (from: number, to: number) =>
  [...Array(to - from).keys()].map((num) => num + from);

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map<Instruction>((row) => ({
    direction: row[0] as Direction,
    distance: parseInt(row.split(" ")[1], 10),
  }));

const getFromTo = (
  headPosition: Coords,
  instruction: Instruction,
): { from: number; to: number } => {
  const { direction, distance } = instruction;
  const currentDirection = direction === "D" || direction === "U" ? "y" : "x";
  const directionSign = direction === "U" || direction === "R" ? 1 : -1;
  const currentDirectionPosition = headPosition[currentDirection];
  const positionAfterMove = currentDirectionPosition + directionSign * distance;

  return positionAfterMove > currentDirectionPosition
    ? { from: currentDirectionPosition + 1, to: positionAfterMove + 1 }
    : { from: positionAfterMove, to: currentDirectionPosition };
};

const getFilledArray = <T>(element: T, length: number): T[] => {
  let arr = Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = { ...element };
  }

  return arr;
};

const getRopeTailPositions = (instructions: Instruction[], tailLength: number) => {
  const visitedPositions = new Set<string>(["0 0"]);
  const knotPositions = getFilledArray<Coords>({ x: 0, y: 0 }, tailLength);

  instructions.forEach((instruction) => {
    const { direction } = instruction;
    const { from, to } = getFromTo(knotPositions[0], instruction);

    const currentHeadDirection = direction === "D" || direction === "U" ? "y" : "x";
    const otherHeadDirection = currentHeadDirection === "x" ? "y" : "x";
    const headDirectionSign = direction === "U" || direction === "R" ? 1 : -1;

    const positionsToVisit = range(from, to);
    const movementInOrder =
      headDirectionSign === 1 ? positionsToVisit : positionsToVisit.reverse();

    movementInOrder.forEach((coordinate) => {
      knotPositions[0][currentHeadDirection] = coordinate;
      knotPositions.forEach((_, index) => {
        if (index === 0) return;

        // const distanceInCurrentDirection = Math.abs(
        //   knotPositions[index - 1][currentHeadDirection] -
        //     knotPositions[index][currentHeadDirection],
        // );

        const horizontalDistance = Math.abs(
          knotPositions[index - 1].x - knotPositions[index].x,
        );
        const verticalDistance = Math.abs(
          knotPositions[index - 1].y - knotPositions[index].y,
        );

        if (horizontalDistance + verticalDistance > 2) {
          knotPositions[index].x +=
            knotPositions[index - 1].x > knotPositions[index].x ? 1 : -1;
          knotPositions[index].y +=
            knotPositions[index - 1].y > knotPositions[index].y ? 1 : -1;
        } else if (horizontalDistance > 1) {
          knotPositions[index].x +=
            knotPositions[index - 1].x > knotPositions[index].x ? 1 : -1;
        } else if (verticalDistance > 1) {
          knotPositions[index].y +=
            knotPositions[index - 1].y > knotPositions[index].y ? 1 : -1;
        }

        if (index + 1 === tailLength) {
          const { x, y } = knotPositions[index];
          visitedPositions.add(`${x} ${y}`);
        }
      });
    });
  });

  return visitedPositions;
};

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  const visitedPositions = getRopeTailPositions(instructions, 2);
  return visitedPositions.size;
};

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  const visitedPositions = getRopeTailPositions(instructions, 10);
  return visitedPositions.size;
};

run({
  part1: {
    tests: [
      { input: `R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`, expected: 13 },
      { input: `R 2\nU 2`, expected: 3 },
      { input: `R 1\nU 2`, expected: 2 },
      { input: `L 1\nD 2`, expected: 2 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`, expected: 1 },
      { input: `R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20`, expected: 36 },
      { input: `R 10`, expected: 2 },
      { input: `R 11`, expected: 3 },
      { input: `R 5\nU 5`, expected: 1 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

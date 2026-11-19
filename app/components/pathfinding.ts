export type Algorithm = "astar" | "dijkstra";

const board = [
  ".................",
  "....####.........",
  "....#.......###..",
  "....#...##.......",
  ".S..#...##.....G.",
  "....#...##.......",
  "....#.......###..",
  ".................",
  ".................",
];

export const width = board[0].length;
export const height = board.length;
export const cells = board.join("").split("");
export const start = cells.indexOf("S");
export const goal = cells.indexOf("G");

function neighbors(cell: number) {
  const column = cell % width;
  const row = Math.floor(cell / width);
  return [
    column < width - 1 ? cell + 1 : -1,
    row > 0 ? cell - width : -1,
    row < height - 1 ? cell + width : -1,
    column > 0 ? cell - 1 : -1,
  ].filter(next => next >= 0 && cells[next] !== "#");
}

function manhattan(cell: number) {
  return Math.abs(cell % width - goal % width) +
    Math.abs(Math.floor(cell / width) - Math.floor(goal / width));
}

export function search(algorithm: Algorithm) {
  const distance = Array<number>(cells.length).fill(Infinity);
  const parent = new Map<number, number>();
  const frontier = new Set([start]);
  const explored: number[] = [];
  distance[start] = 0;

  const priority = (cell: number) =>
    distance[cell] + (algorithm === "astar" ? manhattan(cell) : 0);

  while (frontier.size) {
    const current = [...frontier].reduce((best, cell) => priority(cell) < priority(best) ? cell : best);
    frontier.delete(current);
    explored.push(current);

    if (current === goal) {
      const route = [goal];
      for (let previous = parent.get(goal); previous !== undefined; previous = parent.get(previous)) {
        route.push(previous);
      }
      return { explored, route: route.reverse() };
    }

    for (const next of neighbors(current)) {
      const cost = distance[current] + 1;
      if (cost < distance[next]) {
        distance[next] = cost;
        parent.set(next, current);
        frontier.add(next);
      }
    }
  }

  return { explored, route: [] };
}

export type Algorithm = "astar" | "dijkstra";
export type SearchResult = { trace: number[]; route: number[] };

const board = [
  "...............",
  "...###...###...",
  "......#........",
  ".S...........G.",
  "......#........",
  "...###...###...",
  "...............",
];

export const width = board[0].length;
export const height = board.length;
export const cells = board.join("").split("");
export const start = cells.indexOf("S");
export const goal = cells.indexOf("G");
export const routeObstacle = 3 * width + 8;
export const initialWalls = new Set(cells.flatMap((cell, index) => cell === "#" ? [index] : []));

function adjacent(cell: number) {
  const column = cell % width;
  const row = Math.floor(cell / width);
  return [
    column < width - 1 ? cell + 1 : -1,
    row > 0 ? cell - width : -1,
    row < height - 1 ? cell + width : -1,
    column > 0 ? cell - 1 : -1,
  ].filter(next => next >= 0);
}

function neighbors(cell: number, walls: ReadonlySet<number>) {
  return walls.has(cell) ? [] : adjacent(cell).filter(next => !walls.has(next));
}

function manhattan(from: number, to: number) {
  return Math.abs(from % width - to % width) +
    Math.abs(Math.floor(from / width) - Math.floor(to / width));
}

export function search(algorithm: Algorithm, walls: ReadonlySet<number>): SearchResult {
  const distance = Array<number>(cells.length).fill(Infinity);
  const parent = new Map<number, number>();
  const frontier = new Set([start]);
  const trace: number[] = [];
  if (walls.has(start) || walls.has(goal)) return { trace, route: [] };
  distance[start] = 0;

  const priority = (cell: number) =>
    distance[cell] + (algorithm === "astar" ? manhattan(cell, goal) : 0);

  while (frontier.size) {
    const current = [...frontier].reduce((best, cell) => priority(cell) < priority(best) ? cell : best);
    frontier.delete(current);
    trace.push(current);

    if (current === goal) {
      const route = [goal];
      for (let previous = parent.get(goal); previous !== undefined; previous = parent.get(previous)) {
        route.push(previous);
      }
      return { trace, route: route.reverse() };
    }

    for (const next of neighbors(current, walls)) {
      const cost = distance[current] + 1;
      if (cost < distance[next]) {
        distance[next] = cost;
        parent.set(next, current);
        frontier.add(next);
      }
    }
  }

  return { trace, route: [] };
}

type Key = readonly [number, number];
const precedes = (a: Key, b: Key) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);

// Koenig and Likhachev, D* Lite (AAAI 2002), Figure 3. The start stays
// fixed in this demo, so the moving-start key modifier remains zero.
export class DStarLite {
  private readonly walls: Set<number>;
  private readonly g = Array<number>(cells.length).fill(Infinity);
  private readonly rhs = Array<number>(cells.length).fill(Infinity);
  private readonly queue = new Map<number, Key>();

  constructor(walls: ReadonlySet<number>) {
    this.walls = new Set(walls);
    this.updateVertex(goal);
  }

  private key(cell: number): Key {
    const best = Math.min(this.g[cell], this.rhs[cell]);
    return [best + manhattan(start, cell), best];
  }

  private updateVertex(cell: number) {
    this.rhs[cell] = cell === goal && !this.walls.has(goal)
      ? 0
      : Math.min(...neighbors(cell, this.walls).map(next => 1 + this.g[next]));
    this.queue.delete(cell);
    if (this.g[cell] !== this.rhs[cell]) this.queue.set(cell, this.key(cell));
  }

  block(cell: number): SearchResult {
    if (!this.walls.has(cell)) {
      this.walls.add(cell);
      // Both directions of each incident edge change cost.
      this.updateVertex(cell);
      for (const neighbor of adjacent(cell)) this.updateVertex(neighbor);
    }
    return this.plan();
  }

  plan(): SearchResult {
    const trace: number[] = [];
    while (this.queue.size) {
      const [cell, oldKey] = [...this.queue].reduce((best, item) => precedes(item[1], best[1]) ? item : best);
      if (!precedes(oldKey, this.key(start)) && this.g[start] === this.rhs[start]) break;

      this.queue.delete(cell);
      const newKey = this.key(cell);
      if (precedes(oldKey, newKey)) {
        this.queue.set(cell, newKey);
        continue;
      }

      trace.push(cell);
      if (this.g[cell] > this.rhs[cell]) {
        this.g[cell] = this.rhs[cell];
      } else {
        this.g[cell] = Infinity;
        this.updateVertex(cell);
      }
      for (const neighbor of adjacent(cell)) this.updateVertex(neighbor);
    }

    if (!Number.isFinite(this.rhs[start])) return { trace, route: [] };

    const route = [start];
    while (route.at(-1) !== goal) {
      const cell = route.at(-1)!;
      const next = neighbors(cell, this.walls).find(neighbor => this.g[neighbor] === this.g[cell] - 1);
      if (next === undefined) return { trace, route: [] };
      route.push(next);
    }
    return { trace, route };
  }
}

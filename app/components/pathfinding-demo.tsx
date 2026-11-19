"use client";

import { useEffect, useRef, useState } from "react";
import { cells, DStarLite, goal, height, initialWalls, routeObstacle, search, start, width, type SearchResult } from "./pathfinding";

const algorithms = [
  { id: "dijkstra", title: "Dijkstra", detail: "Distance from the start" },
  { id: "astar", title: "A*", detail: "Distance from the start + Manhattan estimate" },
  { id: "dstar", title: "D* Lite", detail: "Incremental repair from the goal" },
] as const;

type Results = Record<(typeof algorithms)[number]["id"], SearchResult>;
type Run = { playback: number; initial: Results; repaired?: Results };

const size = 20;
const stepTime = 19;
const x = (cell: number) => cell % width * size;
const y = (cell: number) => Math.floor(cell / width) * size;
const points = (route: number[]) => route.map(cell => `${x(cell) + size / 2},${y(cell) + size / 2}`).join(" ");

function Board({ algorithm, result, oldRoute }: {
  algorithm: (typeof algorithms)[number]; result?: SearchResult; oldRoute?: number[];
}) {
  const figure = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!result || !figure.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, [result]);

  const delay = oldRoute ? 280 : 0;
  const trace = result?.trace ?? [];
  const processed = new Set(trace).size;
  const route = result?.route ?? [];
  return (
    <figure className="algorithm-board" ref={figure} data-waiting={Boolean(result) && !visible ? "" : undefined}>
      <figcaption><strong>{algorithm.title}</strong><span>{algorithm.detail}</span></figcaption>
      <svg viewBox={`0 0 ${width * size} ${height * size}`} role="img" aria-label={`${algorithm.title} search grid`}>
        {cells.map((_, cell) => (
          <rect key={cell} className={initialWalls.has(cell) ? "board-wall" : "board-cell"} x={x(cell)} y={y(cell)} width={size} height={size} />
        ))}
        {trace.map((cell, index) => (
          <rect key={index} className="board-explored" x={x(cell) + 1} y={y(cell) + 1} width={size - 2} height={size - 2} style={{ animationDelay: `${delay + index * stepTime}ms` }} />
        ))}
        {oldRoute && <polyline className="board-old-route" points={points(oldRoute)} />}
        {route.length > 0 && <polyline className="board-route" points={points(route)} pathLength="1" style={{ animationDelay: `${delay + trace.length * stepTime + 110}ms` }} />}
        {oldRoute && (
          <g className="board-obstacle" transform={`translate(${x(routeObstacle)}, ${y(routeObstacle)})`}>
            <rect x="1" y="1" width="18" height="18" />
            <path d="m6 6 8 8m0-8-8 8" />
          </g>
        )}
        <circle cx={x(start) + 10} cy={y(start) + 10} r="5" className="board-marker" />
        <rect x={x(goal) + 5} y={y(goal) + 5} width="10" height="10" className="board-marker" />
      </svg>
      <p className="demo-result">
        {result
          ? <>{route.length ? `${route.length - 1} moves` : "Goal unreachable"} · {processed} cells processed{processed < trace.length && ` (${trace.length} visits)`}</>
          : "Ready to search"}
      </p>
    </figure>
  );
}

export default function PathfindingDemo() {
  const [run, setRun] = useState<Run>();
  const planner = useRef<DStarLite | null>(null);

  function runInitial() {
    const dstar = new DStarLite(initialWalls);
    planner.current = dstar;
    const initial = {
      dijkstra: search("dijkstra", initialWalls),
      astar: search("astar", initialWalls),
      dstar: dstar.plan(),
    };
    setRun(previous => ({ playback: (previous?.playback ?? 0) + 1, initial }));
  }

  function blockRoute() {
    if (!run || run.repaired || !planner.current) return;
    const walls = new Set([...initialWalls, routeObstacle]);
    setRun({ ...run, repaired: {
      dijkstra: search("dijkstra", walls),
      astar: search("astar", walls),
      dstar: planner.current.block(routeObstacle),
    } });
  }

  function reset() {
    planner.current = null;
    setRun(undefined);
  }

  const results = run?.repaired ?? run?.initial;

  return (
    <section className="path-demo" aria-labelledby="path-demo-heading">
      <h4 id="path-demo-heading">Try the algorithms</h4>
      <p>I built this browser demo for my portfolio. Each algorithm uses the same grid and moves one cell at a time in four directions. Block the initial route to see Dijkstra and A* start over while D* Lite repairs its earlier search.</p>
      <div className="path-controls">
        <button type="button" onClick={runInitial}>Run initial search</button>
        <button type="button" aria-disabled={!run || Boolean(run.repaired)} onClick={blockRoute}>Block the route</button>
        <button type="button" onClick={reset}>Reset</button>
      </div>
      <ul className="board-legend" aria-label="Board legend">
        <li className="legend-start">Start</li><li className="legend-goal">Goal</li><li className="legend-wall">Obstacle</li>
        <li className="legend-obstacle">New obstacle</li><li className="legend-explored">Processed</li>
        <li className="legend-old-route">Previous route</li><li className="legend-route">Route</li>
      </ul>
      <div className="path-boards" key={`${run?.playback ?? 0}-${Boolean(run?.repaired)}`}>
        {algorithms.map(algorithm => (
          <Board key={algorithm.id} algorithm={algorithm} result={results?.[algorithm.id]}
            oldRoute={run?.repaired && run.initial[algorithm.id].route} />
        ))}
      </div>
      <p className="sr-only" role="status">
        {results && `${run?.repaired ? "Route blocked." : "Initial search."} ` +
          algorithms.map(({ id, title }) => {
            const result = results[id];
            return `${title}: ${result.route.length ? `${result.route.length - 1} moves` : "Goal unreachable"}, ${new Set(result.trace).size} cells processed.`;
          }).join(" ")}
      </p>
    </section>
  );
}

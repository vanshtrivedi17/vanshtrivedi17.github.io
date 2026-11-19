"use client";

import { useState } from "react";
import { type Algorithm, cells, goal, height, search, start, width } from "./pathfinding";

const names = { astar: "A*", dijkstra: "Dijkstra" };
const size = 20;
const x = (cell: number) => cell % width * size;
const y = (cell: number) => Math.floor(cell / width) * size;

export default function PathfindingDemo() {
  const [run, setRun] = useState<{ algorithm: Algorithm; playback: number; result: ReturnType<typeof search> }>();

  function play(algorithm: Algorithm) {
    const result = search(algorithm);
    setRun(previous => ({ algorithm, result, playback: (previous?.playback ?? 0) + 1 }));
  }

  const explored = run?.result.explored ?? [];
  const route = run?.result.route ?? [];
  const interval = 720 / Math.max(1, explored.length);
  const routePoints = route.map(cell => `${x(cell) + size / 2},${y(cell) + size / 2}`).join(" ");

  return (
    <figure className="path-figure">
      <figcaption>Browser demo <span>· Same board, four-direction movement</span></figcaption>
      <div className="path-controls">
        <button type="button" onClick={() => play("astar")}>Run A*</button>
        <button type="button" onClick={() => play("dijkstra")}>Run Dijkstra</button>
        <button type="button" disabled={!run} onClick={() => run && play(run.algorithm)}>Replay</button>
      </div>
      <svg viewBox={`0 0 ${width * size} ${height * size}`} role="img" aria-label="Pathfinding board with a circular start, a square goal, and blocked cells. Run results are listed below.">
        {cells.map((cell, index) => (
          <rect key={index} className={cell === "#" ? "board-wall" : "board-cell"} x={x(index)} y={y(index)} width={size} height={size} />
        ))}
        <g key={run?.playback}>
          {explored.map((cell, index) => (
            <rect key={cell} className="board-explored" x={x(cell) + 1} y={y(cell) + 1} width={size - 2} height={size - 2} style={{ animationDelay: `${index * interval}ms` }} />
          ))}
          {route.length > 0 && <polyline className="board-route" points={routePoints} pathLength="1" style={{ animationDelay: "720ms" }} />}
        </g>
        <circle cx={x(start) + 10} cy={y(start) + 10} r="5" className="board-marker" />
        <rect x={x(goal) + 5} y={y(goal) + 5} width="10" height="10" className="board-marker" />
      </svg>
      <ul className="board-legend" aria-label="Board legend">
        <li className="legend-start">Start</li><li className="legend-goal">Goal</li><li className="legend-wall">Obstacle</li>
        <li className="legend-explored">Explored</li><li className="legend-route">Route</li>
      </ul>
      <p className="demo-result" role="status">
        {run
          ? `${names[run.algorithm]} · ${route.length ? `Path length ${route.length - 1} moves` : "No route"} · ${explored.length} cells explored`
          : "Choose an algorithm to compare the results."}
      </p>
    </figure>
  );
}

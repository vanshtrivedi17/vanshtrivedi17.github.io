"use client";

import { useEffect, useRef, useState } from "react";
import { leher } from "../../content/portfolio";

export default function DiscoveryFlow() {
  const figure = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 701px)");
    let scrollStep: number | undefined;

    function update() {
      if (!desktop.matches || !figure.current) {
        scrollStep = undefined;
        return;
      }
      const { top, height, bottom } = figure.current.getBoundingClientRect();
      if (bottom <= 0 || top >= window.innerHeight) return;

      const progress = (window.innerHeight * 0.62 - top) / height;
      const next = Math.max(0, Math.min(leher.steps.length - 1, Math.floor(progress * leher.steps.length)));
      if (scrollStep !== next) {
        scrollStep = next;
        setActive(next);
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <figure className="discovery" ref={figure}>
      <figcaption>Leher · Product schematic</figcaption>
      <ol>
        {leher.steps.map((step, index) => (
          <li key={step.title}>
            <button type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
              <strong>{step.title}</strong><span>{step.summary}</span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
  );
}

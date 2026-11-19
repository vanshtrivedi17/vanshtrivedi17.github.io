"use client";

import { useEffect, useState } from "react";
import { navigation } from "../../content/portfolio";

export default function SectionNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = navigation.map(([id]) => document.getElementById(id));
    function update() {
      const cutoff = sections[0] ? parseFloat(getComputedStyle(sections[0]).scrollMarginTop) + 4 : 0;
      const current = sections.findLast(section => section && section.getBoundingClientRect().top <= cutoff);
      const atEnd = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActive(atEnd ? "contact" : current?.id ?? "");
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return (
    <nav aria-label="Main navigation">
      <ul>
        {navigation.map(([id, label]) => (
          <li key={id}><a href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useEffect, useRef } from "react";

export function useScrollAlias(ids: string[]) {
  const activeId = useRef<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });

        if (!bestEntry) return;

        const id = (bestEntry as IntersectionObserverEntry).target.id;

        if (activeId.current === id) return;

        activeId.current = id;

        requestAnimationFrame(() => {
          history.replaceState(null, "", `#${id}`);
        });
      },
      {
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);
}
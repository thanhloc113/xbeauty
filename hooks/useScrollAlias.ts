"use client";

import { useEffect, useRef } from "react";

export function useScrollAlias(ids: string[]) {
  const activeId = useRef<string | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (!visible) return;

        const id = visible.target.id;

        if (activeId.current === id) return;

        if (!ticking.current) {
          ticking.current = true;

          requestAnimationFrame(() => {
            activeId.current = id;
            history.replaceState(null, "", `#${id}`);
            ticking.current = false;
          });
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);
}
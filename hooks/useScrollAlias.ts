"use client";

import { useEffect, useRef } from "react";

export function useScrollAlias(ids: string[]) {
  const activeId = useRef<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);

        if (!visible) return;

        const id = visible.target.id;

        if (activeId.current === id) return;

        activeId.current = id;

        history.replaceState(null, "", `#${id}`);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section!));

    return () => observer.disconnect();
  }, [ids]);
}
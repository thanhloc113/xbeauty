"use client";

import { useEffect } from "react";

export function useScrollAlias(ids: string[]) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            history.replaceState(null, "", `#${id}`);
          }
        });
      },
      {
        threshold: 0.6, // 60% section visible
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [ids]);
}
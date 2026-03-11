"use client";

import { useScrollAlias } from "@/hooks/useScrollAlias";

export default function ScrollAlias({ ids }: { ids: string[] }) {
  useScrollAlias(ids);
  return null;
}
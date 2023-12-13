"use client";

import { cn } from "@/lib/utils";

export default function CategoryIcon({ color }) {
  return (
    <div className={cn(`w-4 h-4 rounded-md border-2 border-${color}`)}></div>
  );
}

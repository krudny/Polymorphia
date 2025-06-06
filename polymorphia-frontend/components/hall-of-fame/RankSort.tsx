"use client";

import { useState } from "react";

export default function RankSort() {
  const [isAsc, setIsAsc] = useState<boolean>(false);

  return (
    <button className="flex-centered w-fit" onClick={() => setIsAsc(!isAsc)}>
      <span className="material-symbols text-2xl md:text-3xl">
        arrow_{isAsc ? "up" : "down"}ward
      </span>
      <h1 className="text-xl md:text-3xl ml-2">Sortuj</h1>
    </button>
  );
}

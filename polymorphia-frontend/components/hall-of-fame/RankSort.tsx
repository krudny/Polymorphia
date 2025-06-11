"use client";

import { useState } from "react";

export default function RankSort() {
  const [isAsc, setIsAsc] = useState<boolean>(false);

  return (
    <button
      className="hall-of-fame-sort-button"
      onClick={() => setIsAsc(!isAsc)}
    >
      <span>arrow_{isAsc ? "up" : "down"}ward</span>
      <h1>Sortuj</h1>
    </button>
  );
}

"use client";

import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import Pagination from "@/components/general/Pagination";
import RankCardMobile from "@/components/hall-of-fame/RankCardMobile";
import { useEffect, useState } from "react";

function handleResize(setPages: (value: number) => void) {
  const width = window.innerWidth;
  if (width < 800) {
    setPages(10);
  } else {
    setPages(12);
  }
}

export default function RankMobile() {
  const [pages, setPages] = useState(10);

  // useEffect(() => {
  //   const onResize = () => handleResize(setPages);
  //   window.addEventListener("resize", onResize);
  //   onResize();
  //   return () => window.removeEventListener("resize", onResize);
  // }, []);

  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-16 flex justify-between">
        <RankSearch />
        <RankSort />
      </div>

      <div className="w-full grid grid-cols-1 min-[650px]:grid-cols-2 gap-2 min-[700px]:gap-3 overflow-y-scroll custom-scrollbar">
        {Array.from({ length: pages }, (_, i) => (
          <RankCardMobile key={i} position={i + 1} />
        ))}
      </div>

      <div className="w-full min-h-14 flex items-center justify-center text-2xl">
        <Pagination
          totalPages={250 / pages}
          onPageChangeAction={() => {}}
          forcePage={0}
        />
      </div>
    </div>
  );
}

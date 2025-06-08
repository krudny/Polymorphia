"use client";

import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import Pagination from "@/components/general/Pagination";
import { useEffect, useState } from "react";
import RankCardMobile from "@/components/hall-of-fame/RankCardMobile";

export default function RankMobile() {
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    setCurrentPage(2);
  }, []);

  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-16 flex justify-between">
        <RankSearch />
        <RankSort />
      </div>
      {currentPage === 1 ? (
        <div className="w-full flex flex-col flex-1">
          {([1, 2, 3] as const).map((position) => (
            <RankPodium key={position} position={position} />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 min-[550px]:grid-cols-2 min-[700px]:grid-cols-3 gap-2 min-[700px]:gap-3 overflow-y-scroll custom-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
            <RankCardMobile key={i} />
          ))}
        </div>
      )}

      <div className="w-full min-h-14 flex items-center justify-center text-2xl">
        <Pagination
          totalPages={5}
          onPageChangeAction={() => {}}
          forcePage={1}
        />
      </div>
    </div>
  );
}

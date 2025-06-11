"use client";

import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import Pagination from "@/components/general/Pagination";
import RankCardMobile from "@/components/hall-of-fame/RankCardMobile";
import { useState } from "react";
import "../../styles/hall-of-fame.css"
import {useScaleShow} from "@/animations/General";

export default function RankMobile() {
  const wrapperRef = useScaleShow();
  const [pages] = useState(16);

  return (
    <div ref={wrapperRef} className="hall-of-fame-mobile">
      <div className="hall-of-fame-mobile-search-wrapper">
        <RankSearch />
        <RankSort />
      </div>

      <div className="hall-of-fame-mobile-rank-wrapper">
        {Array.from({ length: pages }, (_, i) => (
          <RankCardMobile key={i} position={i + 1} />
        ))}
      </div>

      <div className="hall-of-fame-pagination-wrapper">
        <Pagination
          totalPages={250 / pages}
          onPageChangeAction={() => {}}
          forcePage={0}
        />
      </div>
    </div>
  );
}

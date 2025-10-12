import HallOfFameImage from "@/views/hall-of-fame/general/HallOfFameImage";
import HallOfFamePointsSummary from "@/views/hall-of-fame/general/HallOfFamePointsSummary";
import HallOfFameUserData from "@/views/hall-of-fame/general/HallOfFameUserData";
import UserPoints from "@/components/user-points/UserPoints";
import "./index.css";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import { filterXpDetails } from "@/providers/hall-of-fame/utils/filterXpDetails";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import { forwardRef } from "react";

export default forwardRef<HTMLDivElement, HallOfFameRecordDTO>(
  function HallOfFameCardMobile({ userDetails, xpDetails }, ref) {
    const borderColors: Record<1 | 2 | 3, string> = {
      1: "border-amber-400",
      2: "border-slate-400",
      3: "border-amber-800",
    };
    const { position, imageUrl } = userDetails;
    const border = borderColors[position as 1 | 2 | 3] ?? "border-none";
    const { filters } = useHallOfFameContext();
    const filteredXpDetails = filterXpDetails(
      xpDetails,
      filters.configs.find((config) => config.id === "rankingOptions"),
      filters.getAppliedFilterValues
    );

    return (
      <div className={`hall-of-fame-mobile-record-wrapper ${border}`} ref={ref}>
        <div>
          <HallOfFameImage position={position} imageUrl={imageUrl} />
          <HallOfFameUserData {...userDetails} />
          <HallOfFamePointsSummary total={xpDetails.total} />
        </div>
        <div>
          <UserPoints
            titleSize="xs"
            xpSize="sm"
            separators={false}
            xpDetails={filteredXpDetails}
          />
        </div>
      </div>
    );
  }
);

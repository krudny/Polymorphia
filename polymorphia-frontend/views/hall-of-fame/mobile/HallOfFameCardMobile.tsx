import HallOfFameImage from "@/views/hall-of-fame/general/HallOfFameImage";
import HallOfFamePointsSummary from "@/views/hall-of-fame/general/HallOfFamePointsSummary";
import HallOfFameUserData from "@/views/hall-of-fame/general/HallOfFameUserData";
import UserPoints from "@/components/user-points/UserPoints";
import "./index.css";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import { API_STATIC_URL } from "@/services/api";
import { filterXpDetails } from "@/providers/hall-of-fame/utils/filterXpDetails";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";

export default function RankCard({
  userDetails,
  xpDetails,
}: HallOfFameRecordDTO) {
  const borderColors: Record<1 | 2 | 3, string> = {
    1: "border-amber-400",
    2: "border-slate-400",
    3: "border-amber-800",
  };
  const border =
    borderColors[userDetails.position as 1 | 2 | 3] ?? "border-none";
  const { filters } = useHallOfFameContext();
  const filteredXpDetails = filterXpDetails(
    xpDetails,
    filters.configs.find((config) => config.id === "rankingOptions"),
    filters.getAppliedFilterValues
  );

  return (
    <div className={`hall-of-fame-mobile-record-wrapper ${border}`}>
      <div>
        <HallOfFameImage
          position={userDetails.position}
          imageUrl={`${API_STATIC_URL}/${userDetails.imageUrl}`}
        />
        <HallOfFameUserData {...userDetails} />
        <HallOfFamePointsSummary total={xpDetails.total} />
      </div>
      <div>
        <UserPoints
          titleSize={"xs"}
          xpSize={"sm"}
          separators={false}
          xpDetails={filteredXpDetails}
        />
      </div>
    </div>
  );
}

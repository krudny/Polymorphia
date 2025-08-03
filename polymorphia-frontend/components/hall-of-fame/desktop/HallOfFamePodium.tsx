import XPCard from "@/components/xp-card/XPCard";
import "./index.css";
import Loading from "@/components/loading/Loading";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { useQuery } from "@tanstack/react-query";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";

export default function HallOfFamePodium() {
  const { data: podium = [], isLoading } = useQuery({
    queryKey: ["podium"],
    queryFn: () => HallOfFameService.getPodium(),
  });

  if (isLoading) {
    return (
      <div className="hall-of-fame-loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {podium.map((item, index) => (
        <div className="hall-of-fame-podium" key={index}>
          <XPCard
            title={item.userDetails.animalName}
            subtitle={item.userDetails.evolutionStage}
            color={
              item.userDetails.position === 1
                ? "gold"
                : item.userDetails.position === 2
                  ? "silver"
                  : "bronze"
            }
            component={
              <XPCardPoints
                points={item.xpDetails.total}
                isSumLabelVisible={true}
                isXPLabelVisible={false}
              />
            }
            size={"hofDesktop"}
          />
        </div>
      ))}
    </>
  );
}

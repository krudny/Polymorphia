import XPCard from "@/components/xp-card/XPCard";
import "./index.css";
import Loading from "@/components/loading/Loading";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { useQuery } from "@tanstack/react-query";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

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
      {podium.map((student, index) => {
        const { animalName, evolutionStage, position } = student.userDetails;

        return (
          <div className="hall-of-fame-podium" key={index}>
            <XPCard
              title={animalName}
              subtitle={evolutionStage}
              color={
                position === 1 ? "gold" : position === 2 ? "silver" : "bronze"
              }
              rightComponent={
                <XPCardPoints
                  points={student.xpDetails.total}
                  isSumLabelVisible={true}
                  isXPLabelVisible={false}
                />
              }
              size={"hofDesktop"}
            />
          </div>
        );
      })}
    </>
  );
}

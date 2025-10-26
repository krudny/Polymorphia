import useStudentGradableEventDetails from "@/hooks/course/useStudentGradableEventDetails";
import Loading from "@/components/loading";
import { StudentGradableEventDetailsProps } from "@/components/column-schema/column-component/course-groups/last-activity/last-activity/types";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPointsWithRewards from "@/components/xp-card/components/XPCardPointsWithRewards";

export default function StudentGradableEventDetails({
  userId,
  gradableEventId,
}: StudentGradableEventDetailsProps) {
  const {
    data: studentGradableEventDetails,
    isLoading,
    isError,
  } = useStudentGradableEventDetails({
    userId,
    gradableEventId,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !studentGradableEventDetails) {
    return <div>Błąd podczas ładowania szczegółów</div>;
  }

  return (
    <div className="">
      {studentGradableEventDetails.map((detail) => (
        <div className="my-2" key={detail.id}>
          <XPCard
            title={detail.criteriaName}
            subtitle={detail.gradeDate}
            color="green"
            size="xs"
            rightComponent={
              <XPCardPointsWithRewards
                points={detail.gainedXp.toFixed(1)}
                isSumLabelVisible={true}
                hasChest={detail.hasReward}
                color="gray"
              />
            }
          />
        </div>
      ))}
    </div>
  );
}

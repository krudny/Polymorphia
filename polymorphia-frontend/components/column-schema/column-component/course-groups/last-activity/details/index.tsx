import useStudentLastActivityDetails from "@/hooks/course/useStudentLastActivityDetails";
import Loading from "@/components/loading";
import { StudentGradableEventDetailsProps } from "@/components/column-schema/column-component/course-groups/last-activity/details/types";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPointsWithRewards from "@/components/xp-card/components/XPCardPointsWithRewards";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";

export default function StudentGradableEventDetails({
  userId,
  gradableEventId,
}: StudentGradableEventDetailsProps) {
  const {
    data: lastActivityDetails,
    isLoading,
    isError,
  } = useStudentLastActivityDetails({
    userId,
    gradableEventId,
  });

  const { setGradableEventId } = useCourseGroupsContext();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !lastActivityDetails) {
    return <div>Błąd podczas ładowania szczegółów</div>;
  }

  return (
    <div className="">
      {lastActivityDetails.map((detail) => (
        <div
          className="my-2"
          key={detail.id}
          onClick={() => setGradableEventId(gradableEventId)}
        >
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

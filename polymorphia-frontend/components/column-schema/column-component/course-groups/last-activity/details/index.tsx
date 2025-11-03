import { StudentGradableEventDetailsProps } from "@/components/column-schema/column-component/course-groups/last-activity/details/types";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPointsWithRewards from "@/components/xp-card/components/XPCardPointsWithRewards";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import { Fragment } from "react";

export default function LastActivityDetails({
  lastActivity,
}: StudentGradableEventDetailsProps) {
  const { setGradableEventId } = useCourseGroupsContext();

  return (
    <Fragment key={lastActivity.id}>
      <XPCard
        title={lastActivity.gradableEventName}
        subtitle={lastActivity.gradeDate}
        color="gray"
        size="xs"
        onClick={() => setGradableEventId(lastActivity.id)}
        rightComponent={
          <XPCardPointsWithRewards
            points={lastActivity.gainedXp.toFixed(1)}
            isSumLabelVisible={true}
            hasChest={lastActivity.hasReward}
            color="gray"
          />
        }
      />
    </Fragment>
  );
}

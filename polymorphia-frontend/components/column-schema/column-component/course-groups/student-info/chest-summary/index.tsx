import { Fragment, JSX } from "react";
import Loading from "@/components/loading";
import useStudentChests from "@/hooks/course/useStudentChests";
import EquipmentChest from "@/components/equipment/components/chest";
import "../index.css";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export default function ChestSummary(): JSX.Element {
  const { targetId } = useTargetContext();
  const { data: chests, isLoading } = useStudentChests(targetId);

  if (isLoading || !chests) {
    return <Loading />;
  }

  return (
    <div className="course-group-student-info-grid">
      {chests.map((chest) => (
        <Fragment key={chest.base.id}>
          <EquipmentChest chestData={chest} showBadge={true} size="md" />
        </Fragment>
      ))}
    </div>
  );
}

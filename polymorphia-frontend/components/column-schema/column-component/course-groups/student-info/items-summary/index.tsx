import useStudentItems from "@/hooks/course/useStudentItems";
import Loading from "@/components/loading";
import EquipmentItem from "@/components/equipment/components/item";
import { JSX } from "react";
import "../index.css";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export default function ItemsSummary(): JSX.Element {
  const { targetId } = useTargetContext();
  const { data: items, isLoading } = useStudentItems(targetId);

  if (isLoading || !items) {
    return <Loading />;
  }

  return (
    <div className="course-group-student-info-grid">
      {items.map((item) => (
        <div key={item.base.id}>
          <EquipmentItem itemData={item} size="md" />
        </div>
      ))}
    </div>
  );
}

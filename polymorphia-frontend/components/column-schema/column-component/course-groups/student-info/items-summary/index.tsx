import useStudentItems from "@/hooks/course/useStudentItems";
import Loading from "@/components/loading";
import EquipmentItem from "@/components/equipment/components/item";
import { JSX } from "react";
import "../index.css";

const USER_ID = 1;

export default function ItemsSummary(): JSX.Element {
  const { data: items, isLoading } = useStudentItems(USER_ID);

  if (isLoading || !items) {
    return <Loading />;
  }

  return (
    <div className="course-group-student-info-grid">
      {items.map((item) => (
        <div key={item.base.id}>
          <EquipmentItem itemData={item} />
        </div>
      ))}
    </div>
  );
}

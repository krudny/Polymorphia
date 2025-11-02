import { JSX } from "react";
import "../index.css";
import EquipmentItem from "@/components/equipment/components/item";
import { ItemsSummaryProps } from "@/components/column-schema/column-component/course-groups/student-info/items-summary/types";

export default function ItemsSummary({
  items,
}: ItemsSummaryProps): JSX.Element {
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

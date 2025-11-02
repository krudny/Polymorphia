import { JSX } from "react";
import EquipmentChest from "@/components/equipment/components/chest";
import "../index.css";
import { ChestSummaryProps } from "@/components/column-schema/column-component/course-groups/student-info/chest-summary/types";

export default function ChestSummary({
  chests,
}: ChestSummaryProps): JSX.Element {
  return (
    <div className="course-group-student-info-grid">
      {chests.map((chest) => (
        <div key={chest.base.id}>
          <EquipmentChest chestData={chest} showBadge={true} size="md" />
        </div>
      ))}
    </div>
  );
}

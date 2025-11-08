import { useScaleShow } from "@/animations/ScaleShow";
import { EquipmentSection } from "@/components/equipment/EquipmentSection";
import "./index.css";
import { EquipmentSectionWrapperProps } from "@/components/equipment/types";

export default function EquipmentSectionWrapper({
  items,
  chests,
}: EquipmentSectionWrapperProps) {
  const wrapperRef = useScaleShow();
  const columns = Math.max(
    Math.min(items.length, 4),
    Math.min(chests.length, 4)
  );

  return (
    <div ref={wrapperRef}>
      <EquipmentSection type="item" data={items} columns={columns} />
      <EquipmentSection type="chest" data={chests} columns={columns} />
    </div>
  );
}

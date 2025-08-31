import { useScaleShow } from "@/animations/ScaleShow";
import { EquipmentSection } from "@/components/equipment/EquipmentSection";
import "./index.css";
import { EquipmentSectionWrapperProps } from "@/components/equipment/types";

export default function EquipmentSectionWrapper({
  items,
  chests,
}: EquipmentSectionWrapperProps) {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef}>
      <EquipmentSection type="item" data={items} />
      <EquipmentSection type="chest" data={chests} />
    </div>
  );
}

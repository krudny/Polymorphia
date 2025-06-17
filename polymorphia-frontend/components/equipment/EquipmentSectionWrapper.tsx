import { useScaleShow } from "@/animations/General";
import { EquipmentSection } from "@/components/equipment/EquipmentSection";
import { EquipmentSectionWrapperProps } from "@/interfaces/equipment/EquipmentInterfaces";
import "../../styles/equipment.css";

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

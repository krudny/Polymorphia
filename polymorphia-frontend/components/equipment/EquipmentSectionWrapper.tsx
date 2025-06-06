import { useScaleShow } from "@/animations/General";
import EquipmentSection from "@/components/equipment/EquipmentSection";
import {
  ChestData,
  EquipmentSectionWrapperProps,
  ItemData,
} from "@/interfaces/equipment/EquipmentInterfaces";
import "../../styles/equipment.css";

export default function EquipmentSectionWrapper({
  items,
  chests,
  setCurrentItemModalData,
  setCurrentChestModalData,
}: EquipmentSectionWrapperProps) {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef}>
      <EquipmentSection
        type="item"
        data={items}
        onClick={(item) => {
          setCurrentItemModalData(item as ItemData);
        }}
      />

      <EquipmentSection
        type="chest"
        data={chests}
        onClick={(chest) => {
          setCurrentChestModalData(chest as ChestData);
        }}
      />
    </div>
  );
}

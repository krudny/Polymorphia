import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import { OpenedChestButtonsProps } from "@/components/equipment/chest-buttons/types";

export function ChestButtons({ chestData }: OpenedChestButtonsProps) {
  const { setCurrentChestModalData, setCurrentOpeningChestModalData } =
    useEquipmentContext();

  return (
    <div className="equipment-chest-btn-wrapper">
      {chestData.details.isUsed ? (
        <ButtonWithBorder
          text={`Otwarta ${chestData.details.usedDate}`}
          onClick={() => setCurrentChestModalData(chestData)}
          className="equipment-chest-btn"
        />
      ) : (
        <ButtonWithBorder
          text="Otwórz skrzynię"
          onClick={() => setCurrentOpeningChestModalData(chestData)}
          className="equipment-chest-btn"
        />
      )}
    </div>
  );
}

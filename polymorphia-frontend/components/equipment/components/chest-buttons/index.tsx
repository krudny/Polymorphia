import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import { OpenedChestButtonsProps } from "@/components/equipment/components/chest-buttons/types";
import { EquipmentActions } from "@/providers/equipment/reducer/types";

export function ChestButtons({ chestData }: OpenedChestButtonsProps) {
  const { dispatch } = useEquipmentContext();

  const handleOpenedChestClick = () => {
    dispatch({
      type: EquipmentActions.SHOW_CHEST_MODAL,
      payload: chestData,
    });
  };

  const handleOpenChestClick = () => {
    dispatch({
      type: EquipmentActions.SHOW_OPENING_CHEST_MODAL,
      payload: chestData,
    });
  };

  return (
    <div className="equipment-chest-btn-wrapper">
      {chestData.details.isUsed ? (
        <ButtonWithBorder
          text={`Otwarta ${chestData.details.usedDate}`}
          onClick={handleOpenedChestClick}
          className="equipment-chest-btn"
        />
      ) : (
        <ButtonWithBorder
          text="Otwórz skrzynię"
          onClick={handleOpenChestClick}
          className="equipment-chest-btn"
        />
      )}
    </div>
  );
}

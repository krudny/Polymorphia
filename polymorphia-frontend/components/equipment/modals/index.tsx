import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import ItemModal from "@/components/equipment/modals/item";
import { EquipmentActions } from "@/providers/equipment/reducer/types";
import ChestModal from "@/components/equipment/modals/chest";
import OpeningChestModal from "@/components/equipment/modals/opening-chest";

export default function EquipmentModals() {
  const { state, dispatch } = useEquipmentContext();

  return (
    <>
      {state.currentItemModal && (
        <ItemModal
          equipment={state.currentItemModal}
          onClose={() => dispatch({ type: EquipmentActions.CLOSE_ITEM_MODAL })}
        />
      )}
      {state.currentChestModal && (
        <ChestModal
          equipment={state.currentChestModal}
          onClose={() => dispatch({ type: EquipmentActions.CLOSE_CHEST_MODAL })}
        />
      )}
      {state.currentOpeningChestModal && (
        <OpeningChestModal
          equipment={state.currentOpeningChestModal}
          onClose={() =>
            dispatch({ type: EquipmentActions.CLOSE_OPENING_CHEST_MODAL })
          }
        />
      )}
    </>
  );
}

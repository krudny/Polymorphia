import {
  EquipmentAction,
  EquipmentActions,
  EquipmentState,
} from "@/providers/equipment/reducer/types";

export const initialEquipmentState: EquipmentState = {
  currentItemModal: null,
  currentChestModal: null,
  currentOpeningChestModal: null,
  pickedItemId: null,
  pickedItemKey: null,
};

export const equipmentReducer = (
  state: EquipmentState,
  action: EquipmentAction
): EquipmentState => {
  switch (action.type) {
    case EquipmentActions.SHOW_ITEM_MODAL:
      return {
        ...state,
        currentItemModal: action.payload,
      };
    case EquipmentActions.SHOW_CHEST_MODAL:
      return {
        ...state,
        currentChestModal: action.payload,
      };
    case EquipmentActions.SHOW_OPENING_CHEST_MODAL:
      return {
        ...state,
        currentOpeningChestModal: action.payload,
      };
    case EquipmentActions.CLOSE_ITEM_MODAL:
      return {
        ...state,
        currentItemModal: null,
      };
    case EquipmentActions.CLOSE_CHEST_MODAL:
      return {
        ...state,
        currentChestModal: null,
      };
    case EquipmentActions.CLOSE_OPENING_CHEST_MODAL:
      return {
        ...state,
        currentOpeningChestModal: null,
      };
    case EquipmentActions.SET_PICKED_ITEM:
      return {
        ...state,
        pickedItemId: action.payload.id,
        pickedItemKey: action.payload.key,
      };
    case EquipmentActions.CLEAR_PICKED_ITEM:
      return {
        ...state,
        pickedItemId: null,
        pickedItemKey: null,
      };
    case EquipmentActions.RESET_TO_DEFAULT:
      return initialEquipmentState;
    default:
      return state;
  }
};

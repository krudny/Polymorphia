import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";

export const EquipmentActions = {
  SHOW_ITEM_MODAL: "SHOW_ITEM_MODAL",
  SHOW_CHEST_MODAL: "SHOW_CHEST_MODAL",
  SHOW_OPENING_CHEST_MODAL: "SHOW_OPENING_CHEST_MODAL",
  CLOSE_ITEM_MODAL: "CLOSE_ITEM_MODAL",
  CLOSE_CHEST_MODAL: "CLOSE_CHEST_MODAL",
  CLOSE_OPENING_CHEST_MODAL: "CLOSE_OPENING_CHEST_MODAL",
  SET_PICKED_ITEM: "SET_PICKED_ITEM",
  CLEAR_PICKED_ITEM: "CLEAR_PICKED_ITEM",
  RESET_TO_DEFAULT: "RESET_TO_DEFAULT",
} as const;

export type EquipmentActionType =
  (typeof EquipmentActions)[keyof typeof EquipmentActions];

export interface EquipmentState {
  currentItemModal: EquipmentItemResponseDTO | null;
  currentChestModal: EquipmentChestResponseDTO | null;
  currentOpeningChestModal: EquipmentChestResponseDTO | null;
  pickedItemId: number | null;
  pickedItemKey: string | null;
}

export type EquipmentAction =
  | {
      type: typeof EquipmentActions.SHOW_ITEM_MODAL;
      payload: EquipmentItemResponseDTO;
    }
  | {
      type: typeof EquipmentActions.SHOW_CHEST_MODAL;
      payload: EquipmentChestResponseDTO;
    }
  | {
      type: typeof EquipmentActions.SHOW_OPENING_CHEST_MODAL;
      payload: EquipmentChestResponseDTO;
    }
  | { type: typeof EquipmentActions.CLOSE_ITEM_MODAL }
  | { type: typeof EquipmentActions.CLOSE_CHEST_MODAL }
  | { type: typeof EquipmentActions.CLOSE_OPENING_CHEST_MODAL }
  | {
      type: typeof EquipmentActions.SET_PICKED_ITEM;
      payload: { id: number; key: string };
    }
  | { type: typeof EquipmentActions.CLEAR_PICKED_ITEM }
  | { type: typeof EquipmentActions.RESET_TO_DEFAULT };

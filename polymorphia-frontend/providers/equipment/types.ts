import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { Dispatch, SetStateAction } from "react";

export interface EquipmentContextInterface {
  currentItemModalData: EquipmentItemResponseDTO | null;
  setCurrentItemModalData: (modalData: EquipmentItemResponseDTO | null) => void;
  currentChestModalData: EquipmentChestResponseDTO | null;
  setCurrentChestModalData: (
    modalData: EquipmentChestResponseDTO | null
  ) => void;
  currentOpeningChestModalData: EquipmentChestResponseDTO | null;
  setCurrentOpeningChestModalData: (
    modalData: EquipmentChestResponseDTO | null
  ) => void;
  pickedItemId: number | undefined;
  setPickedItemId: Dispatch<SetStateAction<number | undefined>>;
  pickedItemKey: string | undefined;
  setPickedItemKey: Dispatch<SetStateAction<string | undefined>>;
}

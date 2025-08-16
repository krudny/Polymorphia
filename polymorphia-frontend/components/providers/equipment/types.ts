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
  pickedItemsIds: number[];
  setPickedItemsIds: Dispatch<SetStateAction<number[]>>;
}

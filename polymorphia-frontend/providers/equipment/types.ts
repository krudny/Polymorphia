import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";
import { Dispatch, SetStateAction } from "react";

export interface EquipmentContextInterface {
  currentItemModalData: EquipmentItemResponseDTO | null;
  setCurrentItemModalData: Dispatch<
    SetStateAction<EquipmentItemResponseDTO | null>
  >;
  currentChestModalData: EquipmentChestResponseDTO | null;
  setCurrentChestModalData: Dispatch<
    SetStateAction<EquipmentChestResponseDTO | null>
  >;
  currentOpeningChestModalData: EquipmentChestResponseDTO | null;
  setCurrentOpeningChestModalData: Dispatch<
    SetStateAction<EquipmentChestResponseDTO | null>
  >;
  pickedItemId: number | null;
  setPickedItemId: Dispatch<SetStateAction<number | null>>;
  pickedItemKey: string | null;
  setPickedItemKey: Dispatch<SetStateAction<string | null>>;
}

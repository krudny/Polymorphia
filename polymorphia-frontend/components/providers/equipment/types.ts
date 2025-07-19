import { ChestData, ItemData } from "@/components/equipment/types";
import { Dispatch, SetStateAction } from "react";

export interface EquipmentContextInterface {
  currentItemModalData: ItemData | null;
  setCurrentItemModalData: (modalData: ItemData | null) => void;
  currentChestModalData: ChestData | null;
  setCurrentChestModalData: (modalData: ChestData | null) => void;
  currentOpeningChestModalData: ChestData | null;
  setCurrentOpeningChestModalData: (modalData: ChestData | null) => void;
  pickedItemsIds: number[];
  setPickedItemsIds: Dispatch<SetStateAction<number[]>>;
}

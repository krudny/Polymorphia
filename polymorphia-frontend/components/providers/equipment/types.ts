import { ChestData, ItemData } from "@/components/equipment/types";

export interface EquipmentContextType {
  currentItemModalData: ItemData | null;
  setCurrentItemModalData: (modalData: ItemData | null) => void;
  currentChestModalData: ChestData | null;
  setCurrentChestModalData: (modalData: ChestData | null) => void;
  currentOpeningChestModalData: ChestData | null;
  setCurrentOpeningChestModalData: (modalData: ChestData | null) => void;
  pickedItemsIds: number[];
  setPickedItemsIds: React.Dispatch<React.SetStateAction<number[]>>;
}

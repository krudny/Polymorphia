export type EquipmentSectionType = "item" | "chest";

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

export interface EquipmentSectionProps {
  type: EquipmentSectionType;
  data: ItemData[] | ChestData[];
}

export interface ItemData {
  itemId: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  quantity: number;
  items: Item[];
}

export interface ChestData {
  chestId: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  behavior: "ONE_OF_MANY" | "ALL";
  openedDate: string | undefined;
  items: Item[];
}

export interface Item {
  itemId: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  bonusXp: string;
}

export interface EquipmentSectionWrapperProps {
  items: ItemData[];
  chests: ChestData[];
}

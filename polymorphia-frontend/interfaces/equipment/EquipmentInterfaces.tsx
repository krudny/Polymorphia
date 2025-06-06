export type EquipmentSectionType = 'item' | 'chest';

export interface EquipmentSectionProps {
  type: EquipmentSectionType;
  data: ItemData[] | ChestData[];
  onClick: (item: ItemData | ChestData) => void;
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

export interface ItemModalProps {
  item: ItemData | null;
  onClose: () => void;
}

export interface ChestModalProps {
  chest: ChestData | null;
  onClose: () => void;
}

export interface EquipmentSectionWrapperProps {
  items: ItemData[];
  chests: ChestData[];
  setCurrentChestModalData: (modalData: ChestData) => void;
  setCurrentItemModalData: (modalData: ItemData) => void;
}



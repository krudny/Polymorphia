import { createContext, ReactNode, useState } from "react";
import { EquipmentContextType } from "@/components/providers/equipment/types";
import { ChestData, ItemData } from "@/components/equipment/types";

export const EquipmentContext = createContext<EquipmentContextType>({
  currentItemModalData: null,
  setCurrentItemModalData: () => {},
  currentChestModalData: null,
  setCurrentChestModalData: () => {},
  currentOpeningChestModalData: null,
  setCurrentOpeningChestModalData: () => {},
  pickedItemsIds: [],
  setPickedItemsIds: () => {},
});

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [currentItemModalData, setCurrentItemModalData] =
    useState<ItemData | null>(null);
  const [currentChestModalData, setCurrentChestModalData] =
    useState<ChestData | null>(null);
  const [currentOpeningChestModalData, setCurrentOpeningChestModalData] =
    useState<ChestData | null>(null);
  const [pickedItemsIds, setPickedItemsIds] = useState<number[]>([]);

  return (
    <EquipmentContext.Provider
      value={{
        currentItemModalData,
        setCurrentItemModalData,
        currentChestModalData,
        setCurrentChestModalData,
        currentOpeningChestModalData,
        setCurrentOpeningChestModalData,
        pickedItemsIds,
        setPickedItemsIds,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

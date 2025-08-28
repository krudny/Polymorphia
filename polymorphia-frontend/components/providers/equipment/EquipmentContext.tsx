import { createContext, ReactNode, useState } from "react";
import { EquipmentContextInterface } from "@/components/providers/equipment/types";
import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";

export const EquipmentContext = createContext<
  EquipmentContextInterface | undefined
>(undefined);

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [currentItemModalData, setCurrentItemModalData] =
    useState<EquipmentItemResponseDTO | null>(null);
  const [currentChestModalData, setCurrentChestModalData] =
    useState<EquipmentChestResponseDTO | null>(null);
  const [currentOpeningChestModalData, setCurrentOpeningChestModalData] =
    useState<EquipmentChestResponseDTO | null>(null);
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

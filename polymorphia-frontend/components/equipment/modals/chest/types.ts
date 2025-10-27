import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";
import { Dispatch, SetStateAction } from "react";

export interface ChestModalProps {
  currentChestModalData: EquipmentChestResponseDTO;
  setCurrentChestModalData: Dispatch<
    SetStateAction<EquipmentChestResponseDTO | null>
  >;
}

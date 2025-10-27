import { EquipmentItemResponseDTO } from "@/interfaces/api/equipment";
import { Dispatch, SetStateAction } from "react";

export interface ItemModalProps {
  currentItemModalData: EquipmentItemResponseDTO;
  setCurrentItemModalData: Dispatch<
    SetStateAction<EquipmentItemResponseDTO | null>
  >;
}

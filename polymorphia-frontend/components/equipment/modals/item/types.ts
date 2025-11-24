import { EquipmentItemResponseDTO } from "@/interfaces/api/equipment";

export interface ItemModalProps {
  equipment: EquipmentItemResponseDTO;
  onClose: () => void;
}

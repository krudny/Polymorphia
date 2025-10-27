import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";

export interface ChestModalProps {
  equipment: EquipmentChestResponseDTO;
  onClose: () => void;
}

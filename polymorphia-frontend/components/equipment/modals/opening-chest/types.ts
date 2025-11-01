import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";

export interface OpeningChestModalProps {
  equipment: EquipmentChestResponseDTO;
  onClose: () => void;
}

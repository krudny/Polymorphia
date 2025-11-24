import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";

export interface UseOpeningChestModal {
  currentOpeningChestModalData: EquipmentChestResponseDTO;
}

export interface EquipmentModalProps {
  targetStudentIdOverride?: number | null;
}

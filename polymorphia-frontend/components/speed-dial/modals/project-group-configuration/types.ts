import { TargetRequestDTO } from "@/interfaces/api/target";

export interface ProjectConfigurationModalProps {
  onClosedAction: () => void;
  initialTarget: TargetRequestDTO | null;
}

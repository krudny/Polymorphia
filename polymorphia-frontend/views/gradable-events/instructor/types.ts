import {
  GradableEventDTO,
  TeachingRoleGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";
import { Size } from "@/interfaces/general";

export interface InstructorGradableEventCardProps {
  gradableEvent: TeachingRoleGradableEventResponseDTO;
  size: Size;
  handleClick: (gradableEvent: GradableEventDTO) => void;
}

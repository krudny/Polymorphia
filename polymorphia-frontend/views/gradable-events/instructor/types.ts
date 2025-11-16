import {
  GradableEventDTO,
  InstructorGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";
import { Size } from "@/interfaces/general";

export interface InstructorGradableEventCardProps {
  gradableEvent: InstructorGradableEventResponseDTO;
  size: Size;
  handleClick: (gradableEvent: GradableEventDTO) => void;
}

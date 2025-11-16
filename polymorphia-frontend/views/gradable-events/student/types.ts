import {
  GradableEventDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";
import { Size } from "@/interfaces/general";

export interface StudentGradableEventCardProps {
  gradableEvent: StudentGradableEventResponseDTO;
  size: Size;
  handleClick: (gradableEvent: GradableEventDTO) => void;
}

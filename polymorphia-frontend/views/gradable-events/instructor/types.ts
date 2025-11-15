import {
  GradableEventDTO,
  InstructorGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";
import { Size } from "@/components/xp-card/types";

export interface InstructorGradableEventCardProps {
  gradableEvent: InstructorGradableEventResponseDTO;
  size: Size;
  isMobile: boolean;
  handleClick: (gradableEvent: GradableEventDTO) => void;
}

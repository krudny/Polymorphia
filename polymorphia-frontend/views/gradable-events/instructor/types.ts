import {
  GradableEventDTO,
  InstructorGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";
import { XPCardSize } from "@/components/xp-card/types";

export interface InstructorGradableEventCardProps {
  gradableEvent: InstructorGradableEventResponseDTO;
  size: XPCardSize;
  isMobile: boolean;
  handleClick: (gradableEvent: GradableEventDTO) => void;
}

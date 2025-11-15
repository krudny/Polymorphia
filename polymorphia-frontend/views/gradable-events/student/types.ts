import {
  GradableEventDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";
import { XPCardSize } from "@/components/xp-card/types";

export interface StudentGradableEventCardProps {
  gradableEvent: StudentGradableEventResponseDTO;
  size: XPCardSize;
  isMobile: boolean;
  handleClick: (gradableEvent: GradableEventDTO) => void;
}

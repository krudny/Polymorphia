import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";

export interface GradableEventCardProps {
  gradableEvent: StudentGradableEventResponseDTO;
  isMobile: boolean;
  handleGradableEventClick: (id: number, isLocked: boolean) => void;
}

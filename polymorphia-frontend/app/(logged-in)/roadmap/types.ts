import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import { Dispatch, SetStateAction } from "react";

export interface RoadmapModalsProps {
  selectedGradableEvent: StudentGradableEventResponseDTO | undefined;
  setSelectedGradableEvent: Dispatch<
    SetStateAction<StudentGradableEventResponseDTO | undefined>
  >;
}

export interface RoadmapCardsProps {
  gradableEvent: StudentGradableEventResponseDTO;
  onCardClicked: (gradableEvent: StudentGradableEventResponseDTO) => void;
}

export interface RoadmapGradeModalProps {
  gradableEvent: StudentGradableEventResponseDTO;
}

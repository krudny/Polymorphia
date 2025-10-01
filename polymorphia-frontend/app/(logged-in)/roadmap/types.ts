import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import { Dispatch, SetStateAction } from "react";

export interface RoadmapModalsProps {
  selectedGradableEvent: StudentGradableEventResponseDTO | undefined;
  setSelectedGradableEvent: Dispatch<
    SetStateAction<StudentGradableEventResponseDTO | undefined>
  >;
}

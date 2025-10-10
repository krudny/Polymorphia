import { StudentDetailsDTOWithNullableName } from "@/interfaces/api/user";

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  currentUser: {
    page: number;
  };
  page: {
    number: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: StudentDetailsDTOWithNullableName;
  xpDetails: Record<string, string>;
}

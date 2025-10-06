import { StudentDetailsDTOWithNullableName } from "@/interfaces/api/user";

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  page: {
    number: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: StudentDetailsDTOWithNullableName;
  xpDetails: Record<string, string>;
}

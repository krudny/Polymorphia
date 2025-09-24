import { StudentDetailsDTO } from "../user";

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  page: {
    number: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: StudentDetailsDTO;
  xpDetails: Record<string, string>;
}

import { StudentDetailsDTO } from "../user";

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  page: {
    pageNumber: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: StudentDetailsDTO;
  xpDetails: Record<string, string>;
}

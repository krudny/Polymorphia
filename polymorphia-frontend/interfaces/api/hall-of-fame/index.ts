import { UserDetailsDTO } from "../user";

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  page: {
    number: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: UserDetailsDTO;
  xpDetails: Record<string, string>;
}

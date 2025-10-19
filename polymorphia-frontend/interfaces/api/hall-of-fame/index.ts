import { HallOfFameUserDTO } from "@/interfaces/api/user";

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
  userDetails: HallOfFameUserDTO;
  xpDetails: Record<string, string>;
}

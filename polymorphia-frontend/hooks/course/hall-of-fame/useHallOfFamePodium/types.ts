import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";

export interface UseHallOfFamePodium {
  data: HallOfFameRecordDTO[] | undefined;
  isLoading: boolean;
}

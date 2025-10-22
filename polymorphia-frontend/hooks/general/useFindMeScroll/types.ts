import { Dispatch, RefObject, SetStateAction } from "react";
import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";

export interface UseFindMeScrollParams {
  recordRefs: RefObject<Record<number, HTMLElement | null>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  shouldScrollToMe: boolean;
  setShouldScrollToMe: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  hallOfFame: HallOfFameResponseDTO | undefined;
}

import { HallOfFameResponseDTO } from "@/interfaces/api/hall-of-fame";

export interface useHallOfFameProps {
  page: number;
  pageSize: number;
  courseId: number;
  debouncedSearch: string;
  sortOrder: string[];
  sortBy: string[];
  groups: string[];
}

export interface UseHallOfFame {
  data: HallOfFameResponseDTO | undefined;
  isLoading: boolean;
}

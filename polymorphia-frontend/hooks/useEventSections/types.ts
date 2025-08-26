import { EventSectionResponseDTO } from "@/interfaces/api/course";

export interface UseEventSections {
  data: EventSectionResponseDTO[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

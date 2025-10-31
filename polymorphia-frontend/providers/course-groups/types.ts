import { Dispatch, SetStateAction } from "react";
import { useFilters } from "@/hooks/course/useFilters";
import { StudentSummaryResponseDTO } from "@/interfaces/api/student";
import { StudentLastActivityDTO } from "@/interfaces/api/course-groups";

export interface CourseGroupsContextInterface {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  filters: ReturnType<typeof useFilters<CourseGroupsFilterId>>;
  gradableEventId: number | null;
  setGradableEventId: Dispatch<SetStateAction<number | null>>;
  studentSummary: StudentSummaryResponseDTO | undefined;
  lastActivities: StudentLastActivityDTO[] | undefined;
  isSpecificDataLoading: boolean;
}

export type CourseGroupsFilterId = "sortOrder" | "sortBy";

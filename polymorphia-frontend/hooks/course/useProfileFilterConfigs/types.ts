import { FilterConfig } from "@/hooks/course/useFilters/types";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";

export type UseProfileFilterConfigs = {
  data: FilterConfig<ProfileFilterId>[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

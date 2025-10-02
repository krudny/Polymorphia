"use client";

import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  HallOfFameContextInterface,
  HallOfFameFilterId,
} from "@/providers/hall-of-fame/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useHallOfFameFilterConfigs } from "@/hooks/course/useHallOfFameFilterConfigs";
import useHallOfFame from "@/hooks/course/useHallOfFame";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export const HallOfFameContext = createContext<
  HallOfFameContextInterface | undefined
>(undefined);

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const { courseId } = useUserDetails();
  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useHallOfFameFilterConfigs(courseId);
  const filters = useFilters<HallOfFameFilterId>(filterConfigs ?? []);

  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["desc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];

  const { data: hallOfFame, isLoading } = useHallOfFame({
    page,
    pageSize,
    courseId,
    debouncedSearch,
    sortOrder,
    sortBy,
    groups,
  });

  return (
    <HallOfFameContext.Provider
      value={{
        hallOfFame,
        page,
        setPage,
        search,
        setSearch,
        isModalOpen: areFiltersOpen,
        setIsModalOpen: setAreFiltersOpen,
        isLoading,
        filters,
        isFiltersLoading,
        isFiltersError,
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

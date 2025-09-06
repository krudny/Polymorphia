"use client";

import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import {
  HallOfFameContextInterface,
  HallOfFameFilterId,
} from "@/components/providers/hall-of-fame/types";
import { useFilters } from "../filters/useFilters";
import { useHallOfFameFilterConfigs } from "./utils/useHallOfFameFilterConfigs";
import { getEmptyFiltersObject } from "../filters/utils/getEmptyFiltersObject";

const emptyDataObject = {
  content: [],
  page: {
    number: 0,
    totalPages: 0,
  },
};

export const HallOfFameContext = createContext<HallOfFameContextInterface>({
  data: emptyDataObject,
  page: 0,
  setPage: () => {},
  search: "",
  setSearch: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  isLoading: true,
  filters: getEmptyFiltersObject(),
  isFiltersLoading: true,
  isFiltersError: false,
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const COURSE_ID = 1;
  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useHallOfFameFilterConfigs(COURSE_ID);
  const filters = useFilters<HallOfFameFilterId>(filterConfigs ?? []);

  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["desc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];

  const { data = emptyDataObject, isLoading } = useQuery({
    queryKey: [
      "hallOfFame",
      page,
      pageSize,
      debouncedSearch,
      sortOrder,
      sortBy,
      groups,
    ],
    queryFn: () =>
      HallOfFameService.getHallOfFame(
        page,
        pageSize,
        debouncedSearch,
        sortBy[0],
        sortOrder[0] === "asc" || sortOrder[0] === "desc"
          ? sortOrder[0]
          : undefined,
        groups[0] !== "all" ? groups : undefined
      ),
  });

  return (
    <HallOfFameContext.Provider
      value={{
        data,
        page,
        setPage,
        search,
        setSearch,
        isModalOpen,
        setIsModalOpen,
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

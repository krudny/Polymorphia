"use client";

import { createContext, ReactNode, useEffect, useReducer, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { filters } from "@/components/providers/hall-of-fame/filters/InitialFilters";
import { HallOfFameReducer } from "@/components/providers/hall-of-fame/filters/HallOfFameReducer";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { HallOfFameContextInterface } from "@/components/providers/hall-of-fame/types";
import { getAllFilters } from "@/components/providers/hall-of-fame/utils/getAllFilters";
import { getAppliedQueryParams } from "@/components/providers/hall-of-fame/utils/getAppliedQueryParams";
import { addFieldToFilter } from "@/components/providers/hall-of-fame/utils/addFieldToFilter";
import { addEventSectionsToFilters } from "@/components/providers/hall-of-fame/utils/addEventSectionsToFilters";
import { sortFilters } from "@/components/providers/hall-of-fame/utils/sortFilters";
import { selectMinimumOptions } from "@/components/providers/hall-of-fame/utils/selectMinimumOptions";
import useEventSections from "@/hooks/useEventSections";

const emptyDataObject = {
  content: [],
  page: {
    pageNumber: 0,
    totalPages: 0,
  },
};

export const HallOfFameContext = createContext<HallOfFameContextInterface>({
  data: emptyDataObject,
  page: 0,
  setPage: () => {
  },
  search: "",
  setSearch: () => {
  },
  isModalOpen: false,
  setIsModalOpen: () => {
  },
  filtersState: [],
  filtersDispatch: () => {
  },
  isLoading: true,
  appliedFiltersState: [],
  setAppliedFiltersState: () => {
  },
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtersState, filtersDispatch] = useReducer(
    HallOfFameReducer,
    filters,
  );
  const [appliedFiltersState, setAppliedFiltersState] = useState(filtersState);
  const { sortByFilter, rankingOptionsFilter } = getAllFilters(filtersState);
  const { sortOrder, sortBy, groups } =
    getAppliedQueryParams(appliedFiltersState);
  const initRef = useRef(false);
  const { data: eventSections } = useEventSections();

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
        groups,
      ),
  });

  useEffect(() => {
    if (
      !initRef.current &&
      data &&
      eventSections &&
      sortByFilter &&
      rankingOptionsFilter
    ) {
      addFieldToFilter(
        {
          label: "Bonusy",
          value: "Bonusy",
          orderIndex: Number.MAX_SAFE_INTEGER,
          isSelected: false,
        },
        sortByFilter,
      );
      addFieldToFilter(
        {
          label: "Bonusy",
          value: "Bonusy",
          orderIndex: Number.MAX_SAFE_INTEGER,
          isSelected: true,
        },
        rankingOptionsFilter,
      );
      addFieldToFilter(
        {
          label: "Suma",
          value: "total",
          orderIndex: Number.MAX_SAFE_INTEGER,
          isSelected: true,
        },
        sortByFilter,
      );
      addEventSectionsToFilters(eventSections, sortByFilter);
      addEventSectionsToFilters(eventSections, rankingOptionsFilter);
      sortFilters(filtersState);
      selectMinimumOptions(rankingOptionsFilter);
      initRef.current = true;
    }
  }, [data, eventSections, sortByFilter, rankingOptionsFilter, filtersState]);

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
        filtersState,
        filtersDispatch,
        isLoading,
        appliedFiltersState,
        setAppliedFiltersState,
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/course/event-section/EventSectionService";
import {
  addEventSectionsToFilters,
  addFieldToFilter,
  getAllFilters,
  getAppliedQueryParams,
  selectMinimumOptions,
  sortFilters,
} from "@/services/hall-of-fame/Helpers";
import { filters } from "@/services/hall-of-fame/InitialFilters";
import { HallOfFameReducer } from "@/services/hall-of-fame/HallOfFameReducer";
import { HallOfFameContextType } from "@/interfaces/hall-of-fame/HallOfFameLogicInterfaces";
import HallOfFameService from "@/services/hall-of-fame/HallOfFameService";

const emptyDataObject = {
  content: [],
  page: {
    pageNumber: 0,
    totalPages: 0,
  },
};

export const HallOfFameContext = createContext<HallOfFameContextType>({
  data: emptyDataObject,
  page: 0,
  setPage: () => {},
  search: "",
  setSearch: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  filtersState: [],
  filtersDispatch: () => {},
  isLoading: true,
  appliedFiltersState: [],
  setAppliedFiltersState: () => {},
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtersState, filtersDispatch] = useReducer(
    HallOfFameReducer,
    filters
  );
  const [appliedFiltersState, setAppliedFiltersState] = useState(filtersState);
  const { sortByFilter, rankingOptionsFilter } = getAllFilters(filtersState);
  const { sortOrder, sortBy, groups } =
    getAppliedQueryParams(appliedFiltersState);
  const initRef = useRef(false);

  const { data: eventSections } = useQuery({
    queryKey: ["eventSections"],
    queryFn: () => EventSectionService.getEventSections(1),
  });

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
        groups
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
          priority: Number.MAX_SAFE_INTEGER,
          isSelected: false,
        },
        sortByFilter
      );
      addFieldToFilter(
        {
          label: "Bonusy",
          value: "Bonusy",
          priority: Number.MAX_SAFE_INTEGER,
          isSelected: true,
        },
        rankingOptionsFilter
      );
      addFieldToFilter(
        {
          label: "Suma",
          value: "total",
          priority: Number.MAX_SAFE_INTEGER,
          isSelected: true,
        },
        sortByFilter
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

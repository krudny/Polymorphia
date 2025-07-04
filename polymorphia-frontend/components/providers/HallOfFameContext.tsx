"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/course/event-section/EventSectionService";
import {
  addEventSectionsToFilters,
  getAllFilters,
  getAppliedQueryParams,
  selectMinimumOptions,
} from "@/services/hall-of-fame/Helpers";
import { filters } from "@/services/hall-of-fame/InitialFilters";
import { HallOfFameReducer } from "@/services/hall-of-fame/HallOfFameReducer";
import { HallOfFameContextType } from "@/interfaces/hall-of-fame/HallOfFameLogicInterfaces";
import HallOfFameService from "@/services/hall-of-fame/HallOfFameService";
import Loading from "@/components/general/Loading";

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
  const { sortOrder, sortBy, groups, rankingOptions } =
    getAppliedQueryParams(appliedFiltersState);

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
    if (eventSections && sortByFilter && rankingOptionsFilter) {
      addEventSectionsToFilters(eventSections, sortByFilter);
      addEventSectionsToFilters(eventSections, rankingOptionsFilter);
      selectMinimumOptions(rankingOptionsFilter);
    }
  }, [eventSections, sortByFilter, rankingOptionsFilter]);

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
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

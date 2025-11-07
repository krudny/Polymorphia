"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import {
  HallOfFameContextInterface,
  HallOfFameFilterId,
} from "@/providers/hall-of-fame/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useHallOfFameFilterConfigs } from "@/hooks/course/useHallOfFameFilterConfigs";
import useHallOfFame from "@/hooks/course/useHallOfFame";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { useFindMeScroll } from "@/hooks/general/useFindMeScroll";
import { Roles } from "@/interfaces/api/user";
import ErrorState from "@/components/error-state";

export const HallOfFameContext = createContext<
  HallOfFameContextInterface | undefined
>(undefined);

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const { courseId } = useUserDetails();
  const { userRole } = useUserContext();

  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const recordRefs = useRef<Record<number, HTMLElement | null>>({});
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [shouldScrollToMe, setShouldScrollToMe] = useState(false);
  const [areAnimalNamesVisible, setAreAnimalNamesVisible] = useState(true);
  const searchBy = areAnimalNamesVisible ? "animalName" : "studentName";

  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useHallOfFameFilterConfigs(courseId);
  const filters = useFilters<HallOfFameFilterId>(filterConfigs ?? []);

  const sortByFilterValues = useMemo(
    () => filters.getAppliedFilterValues("sortBy") ?? ["total"],
    [filters]
  );
  const sortBy = sortByFilterValues.map((value) =>
    value === "name" ? searchBy : value
  );
  const sortOrder = useMemo(
    () => filters.getAppliedFilterValues("sortOrder") ?? ["desc"],
    [filters]
  );
  const groups = useMemo(
    () => filters.getAppliedFilterValues("groups") ?? ["all"],
    [filters]
  );

  const {
    data: hallOfFame,
    isLoading,
    isError,
  } = useHallOfFame({
    page,
    pageSize,
    courseId,
    debouncedSearch,
    searchBy,
    sortOrder,
    sortBy,
    groups,
  });

  useFindMeScroll({
    recordRefs,
    page,
    setPage,
    shouldScrollToMe,
    setShouldScrollToMe,
    isLoading,
    hallOfFame,
  });

  useEffect(() => {
    recordRefs.current = {};
  }, [page, debouncedSearch, searchBy, sortBy, sortOrder, groups]);

  const toggleAnimalNamesVisibility = () => {
    if (userRole !== Roles.STUDENT) {
      setAreAnimalNamesVisible((prev) => !prev);
    }
  };

  if (isError) {
    return (
      <ErrorState message="Nie udało się załadować wyników hall of fame." />
    );
  }

  return (
    <HallOfFameContext.Provider
      value={{
        hallOfFame,
        page,
        setPage,
        search,
        setSearch,
        areFiltersOpen,
        setAreFiltersOpen,
        isLoading,
        filters,
        isFiltersLoading,
        isFiltersError,
        setShouldScrollToMe,
        areAnimalNamesVisible,
        toggleAnimalNamesVisibility,
        recordRefs,
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

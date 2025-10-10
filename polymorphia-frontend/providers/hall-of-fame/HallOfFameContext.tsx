"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import {
  HallOfFameContextInterface,
  HallOfFameFilterId,
  recordRefType,
} from "@/providers/hall-of-fame/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useHallOfFameFilterConfigs } from "@/hooks/course/useHallOfFameFilterConfigs";
import useHallOfFame from "@/hooks/course/useHallOfFame";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";

export const HallOfFameContext = createContext<
  HallOfFameContextInterface | undefined
>(undefined);

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const { courseId } = useUserDetails();
  const userContext = useUserContext();

  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const recordRefs = useRef<recordRefType>({});
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

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

  useEffect(() => {
    console.log(recordRefs);
  }, [page, debouncedSearch, sortBy, sortOrder, groups]);

  useEffect(() => {
    recordRefs.current = {};
  }, [page, debouncedSearch, sortBy, sortOrder, groups]);

  const [shouldScrollToMe, setShouldScrollToMe] = useState(false);

  const findMe = () => {
    if (userContext.userRole !== Roles.STUDENT) {
      return;
    }

    const position = userContext.userDetails.position;
    const targetPage = Math.floor(position / pageSize);

    setShouldScrollToMe(true);

    if (targetPage !== page) {
      setPage(targetPage);
    }
  };

  useLayoutEffect(() => {
    if (
      !shouldScrollToMe ||
      isLoading ||
      userContext.userRole !== Roles.STUDENT
    ) {
      return;
    }

    const position = userContext.userDetails.position;
    const element = recordRefs.current[position];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setShouldScrollToMe(false);
    }
  }, [hallOfFame, shouldScrollToMe, isLoading]);

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
        findMe,
        recordRefs,
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

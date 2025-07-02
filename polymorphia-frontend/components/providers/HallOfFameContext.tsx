"use client"

import {createContext, ReactNode, useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {useQuery} from "@tanstack/react-query";
import {EventSectionService} from "@/services/course/event-section/EventSectionService";
import {addEventSectionsToCategories, getAllCategories} from "@/services/hall-of-fame/Helpers";
import {filtersCategories} from "@/services/hall-of-fame/FilterCategories";


export const HallOfFameContext = createContext({
  page: 0,
  setPage: (newPage: number) => {},
  search: "",
  setSearch: (newSearch: string) => {},
  isModalOpen: false,
})

export const HallOfFameProvider = ({children} : {children:ReactNode}) => {
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtersState, setFiltersState] = useState(filtersCategories);
  const { sortByCategory, rankingOptionsCategory} = getAllCategories(filtersState);

  const { data: eventSections } = useQuery({
    queryKey: ["eventSections"],
    queryFn: () => EventSectionService.getEventSections(1),
  });

  useEffect(() => {
    if (eventSections) {
      addEventSectionsToCategories(eventSections, sortByCategory);
      addEventSectionsToCategories(eventSections, rankingOptionsCategory);
    }
  }, [eventSections, sortByCategory, rankingOptionsCategory]);


  <HallOfFameContext.Provider
    value={{
      page,
      setPage,
      search,
      setSearch,
      isModalOpen,
    }}
  >
    {children}
  </HallOfFameContext.Provider>
}
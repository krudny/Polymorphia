"use client";

import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { HallOfFameContextInterface } from "@/components/providers/hall-of-fame/types";
import { useFilters } from "@/components/filters/useFilters";
import { FilterConfig } from "@/components/filters/types";

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
  setPage: () => {},
  search: "",
  setSearch: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  isLoading: true,
  filters: {
    configs: [],
    state: {},
    appliedState: {},
    dispatch: () => {},
    applyFilters: () => {
      return { ok: false };
    },
    resetFiltersToApplied: () => {},
    resetFiltersToInitial: () => {},
  },
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: filterConfigs } = useQuery({
    queryKey: ["hallOfFameFilters"],
    queryFn: () => {
      const data: FilterConfig[] = [
        {
          id: "sortOrder",
          title: "Sortowanie",
          options: [
            {
              value: "asc",
              label: "Rosnąco",
            },
            {
              value: "desc",
              label: "Malejąco",
            },
          ],
          defaultValues: ["desc"],
        },
        {
          id: "sortBy",
          title: "Sortowanie po kategorii",
          options: [
            {
              value: "name",
              label: "Nazwa",
            },
            {
              value: "Git",
            },
            {
              value: "Kartkówka",
            },
            {
              value: "Laboratorium",
            },
            {
              value: "Specjalny lab",
            },
            {
              value: "Projekt 1",
            },
            {
              value: "Projekt 2",
            },
            {
              value: "Bonusy",
            },
            {
              value: "total",
              label: "Suma",
            },
          ],
          defaultValues: ["total"],
        },
        {
          id: "groups",
          title: "Grupy",
          options: [
            {
              value: "all",
              label: "Wszystkie",
              specialBehavior: "EXCLUSIVE",
            },
            { label: "MI-15-00", value: "mi-15-00" },
            { label: "BM-16-00", value: "bm-16-00" },
            { label: "BM-17-00", value: "bm-17-00" },
            { label: "BM-18-00", value: "bm-18-00" },
            { label: "BM-19-00", value: "bm-19-00" },
            { label: "BM-20-00", value: "bm-20-00" },
            { label: "BM-21-00", value: "bm-21-00" },
            { label: "BM-22-00", value: "bm-22-00" },
            { label: "BM-23-00", value: "bm-23-00" },
            { label: "BM-01-00", value: "bm-01-00" },
            { label: "BM-02-00", value: "bm-02-00" },
            { label: "BM-03-00", value: "bm-03-00" },
          ],
          defaultValues: ["all"],
          max: 12,
        },
        {
          id: "rankingOptions",
          title: "Wyświetlanie",
          options: [
            {
              value: "Git",
            },
            {
              value: "Kartkówka",
            },
            {
              value: "Laboratorium",
            },
            {
              value: "Specjalny lab",
            },
            {
              value: "Projekt 1",
            },
            {
              value: "Projekt 2",
            },
            {
              value: "Bonusy",
            },
          ],
          min: 4,
          max: 4,
          defaultValues: ["Git", "Laboratorium", "Kartkówka", "Bonusy"],
        },
      ];

      return data;
    },
  });

  const filters = useFilters(filterConfigs ?? []);

  const sortBy = filters.appliedState.sortBy ?? ["total"];
  const sortOrder = filters.appliedState.sortOrder ?? ["desc"];
  const groups = filters.appliedState.groups ?? ["all"];

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
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

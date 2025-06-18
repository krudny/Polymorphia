import {useQuery} from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import {createContext, ReactNode, useEffect, useState} from "react";
import Loading from "../general/Loading";

export const HallOfFameContext = createContext({
  search: "",
  page: 0,
  setPage: (newPage: number) => {},
  data: [],
  setSearch: (newSearch: string) => {},
  isLoading: false,
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["hallOfFame", page, size, debouncedSearch],
    queryFn: () => HallOfFameService.getHallOfFame(page, size, debouncedSearch),
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <HallOfFameContext.Provider value={{ data, page, setPage, search, setSearch, isLoading }}>
      {children}
    </HallOfFameContext.Provider>
  );
};
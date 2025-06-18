import {useQuery, useQueryClient} from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import { createContext, ReactNode } from "react";
import Loading from "../general/Loading";

export const HallOfFameContext = createContext({
  searchSuggestions: [],
  refreshSuggestions: () => {},
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: searchSuggestions = [], isLoading } = useQuery({
    queryKey: ["hallOfFameNames"],
    queryFn: () => HallOfFameService.getHallOfFameNames(),
  });

  const refreshSuggestions = () => {
    queryClient.invalidateQueries({ queryKey: ["hallOfFameNames"] });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HallOfFameContext.Provider
      value={{
        searchSuggestions,
        refreshSuggestions,
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};
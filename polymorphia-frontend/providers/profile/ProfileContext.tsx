import { createContext, ReactNode, useState } from "react";
import { ProfileContextInterface } from "./types";

export const ProfileContext = createContext<
  ProfileContextInterface | undefined
>(undefined);

// TODO: handle filters
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  return (
    <ProfileContext.Provider value={{ areFiltersOpen, setAreFiltersOpen }}>
      {children}
    </ProfileContext.Provider>
  );
};

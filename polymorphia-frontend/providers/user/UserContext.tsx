import { createContext, ReactNode } from "react";
import Loading from "@/components/loading/Loading";
import { UserDetailsDTO } from "@/interfaces/api/user";
import useCurrentUser from "../../hooks/general/useCurrentUser";

export const UserContext = createContext<UserDetailsDTO | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading } = useCurrentUser();

  if (isLoading || !userData) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        ...userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

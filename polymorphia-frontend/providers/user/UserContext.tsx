import { createContext, ReactNode } from "react";
import Loading from "@/components/loading";
import { UserDetailsDTO } from "@/interfaces/api/user";
import useCurrentUser from "@/hooks/course/useCurrentUser";
import ErrorComponent from "@/components/error";

export const UserContext = createContext<UserDetailsDTO | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading, isError } = useCurrentUser();

  if (isError) {
    return (
      <ErrorComponent message="Nie udało się pobrać informacji o użytkowniku." />
    );
  }

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

import { createContext, ReactNode } from "react";
import Loading from "@/components/loading";
import { UserDetailsDTO } from "@/interfaces/api/user";
import useCurrentUser from "@/hooks/course/useCurrentUser";

export const UserContext = createContext<UserDetailsDTO | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading, isError } = useCurrentUser();

  if (isError) {
    return <div>Nie udało się pobrać użytkownika</div>;
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

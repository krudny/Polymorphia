/* eslint-disable */
// @ts-nocheck

import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import Loading from "@/components/loading/Loading";
import { UserDetailsDTO } from "@/interfaces/api/user";

export const UserContext = createContext<UserDetailsDTO>({
  studentName: "",
  animalName: "",
  evolutionStage: "",
  imageUrl: "",
  position: 0,
  group: "",
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        studentName: userData!.studentName,
        animalName: userData!.animalName,
        evolutionStage: userData!.evolutionStage,
        imageUrl: userData!.imageUrl,
        group: userData!.group,
        position: userData!.position,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

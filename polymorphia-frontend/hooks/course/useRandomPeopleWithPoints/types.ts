import { UserDetailsDTO } from "@/interfaces/api/user";

export interface UseRandomPeopleWithPoints {
  data: (UserDetailsDTO & { gainedXp?: string })[][] | undefined;
  isLoading: boolean;
  isError: boolean;
}

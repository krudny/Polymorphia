import { useQuery } from "@tanstack/react-query";
import { FilterConfig } from "../useFilters/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { UseProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs/types";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";
import UserService from "@/app/(logged-in)/profile/UserService";

export function useProfileFilterConfigs(): UseProfileFilterConfigs {
  const { courseId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileFilters", courseId],
    queryFn: async (): Promise<FilterConfig<ProfileFilterId>[]> => {
      const { xpDetails } = await UserService.getStudentProfile(courseId);
      const labels = Object.keys(xpDetails);
      return [
        {
          id: "rankingOptions",
          title: "Wyświetlanie",
          options: [
            ...labels.map((label) => ({
              value: label,
            })),
          ],
          min: Math.min(4, labels.length),
          max: Math.min(4, labels.length),
          defaultValues: [
            ...labels
              .slice(0, Math.min(3, Math.max(0, labels.length - 1)))
              .map((label) => label),
            "Suma",
          ],
        },
      ];
    },
  });

  return { data, isLoading, isError };
}

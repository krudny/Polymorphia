import NotificationService from "@/services/notification";
import { useQuery } from "@tanstack/react-query";
import { UseNotifications } from "@/hooks/notification/useNotifications/types";

export default function useNotifications(): UseNotifications {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getAllNotifications(),
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading, error };
}

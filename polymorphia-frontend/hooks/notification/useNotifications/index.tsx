import NotificationService from "@/services/notification";
import { useQuery } from "@tanstack/react-query";
import { UseNotifications } from "@/hooks/notification/useNotifications/types";

export default function useNotifications(): UseNotifications {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getAllNotifications(),
    refetchInterval: 15000,
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading, isError };
}

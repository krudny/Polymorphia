import { createContext, ReactNode, useState } from "react";
import { NotificationContextInterface } from "@/providers/notification/types";
import { useNotificationCount } from "@/hooks/notification/useNotificationCount";
import { useNotifications } from "@/hooks/notification/useNotifications";

export const NotificationContext = createContext<
  NotificationContextInterface | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { notificationCount } = useNotificationCount();
  const {
    notifications,
    isError: isNotificationsError,
    removeNotification,
  } = useNotifications(isNotificationModalOpen);

  return (
    <NotificationContext.Provider
      value={{
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        notifications,
        notificationCount,
        isNotificationsError,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

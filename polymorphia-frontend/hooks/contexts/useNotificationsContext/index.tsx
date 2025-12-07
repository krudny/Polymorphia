import { useContext } from "react";
import { NotificationContextInterface } from "@/providers/notification/types";
import { NotificationContext } from "@/providers/notification";

export default function useNotificationContext(): NotificationContextInterface {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext must be used within NotificationProvider"
    );
  }

  return context;
}

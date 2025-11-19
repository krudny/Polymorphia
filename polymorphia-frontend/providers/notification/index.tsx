import { createContext, ReactNode, useState } from "react";
import { NotificationContextInterface } from "@/providers/notification/types";
import { useNotificationCount } from "@/hooks/notification/useNotificationCount";
import { useNotifications } from "@/hooks/notification/useNotifications";
import NotificationModal from "@/components/notification-modal";
import { NotificationTypes } from "@/interfaces/api/notification";
import GradeModal from "@/components/speed-dial/modals/grade";
import useNotificationModal from "@/hooks/notification/useNotificationModal";

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
  const { activeModal, closeModal, handleNotificationClick } =
    useNotificationModal();

  return (
    <NotificationContext.Provider
      value={{
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        notifications,
        notificationCount,
        isNotificationsError,
        removeNotification,
        handleNotificationClick,
      }}
    >
      {children}
      {isNotificationModalOpen && <NotificationModal />}
      {activeModal.type === NotificationTypes.NEW_GRADE && (
        <GradeModal
          gradableEventIdProp={activeModal.props.gradableEventIdProp}
          onClosedAction={closeModal}
        />
      )}
    </NotificationContext.Provider>
  );
};

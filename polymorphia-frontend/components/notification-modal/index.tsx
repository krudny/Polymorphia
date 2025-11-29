"use client";

import Modal from "@/components/modal";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";
import Loading from "@/components/loading";
import NotificationCard from "@/components/notification-modal/card";
import "./index.css";

function renderNotificationContent(
  notificationCount: number,
  notificationsLength: number,
  isError: boolean,
  notifications: any[]
) {
  if (isError) {
    return (
      <div className="notification-content-message">
        <span>Nie udało się pobrać powiadomień</span>
      </div>
    );
  }

  if (notificationCount > 0 && notificationsLength === 0) {
    return (
      <div className="notification-content-loading">
        <Loading />
      </div>
    );
  }

  if (notificationsLength > 0) {
    return (
      <div className="notification-list">
        {notifications.map((notification, index) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            isNew={index === 0}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="notification-content-message">
      <span>Wszystkie powiadomienia przeczytane!</span>
    </div>
  );
}

export default function NotificationModal() {
  const {
    notifications,
    notificationCount,
    isNotificationsError,
    setIsNotificationModalOpen,
  } = useNotificationContext();

  return (
    <Modal
      isDataPresented={true}
      onClosed={() => setIsNotificationModalOpen(false)}
      title="Powiadomienia"
    >
      <div className="notification-modal-container">
        {renderNotificationContent(
          notificationCount,
          notifications?.length ?? 0,
          isNotificationsError,
          notifications ?? []
        )}
      </div>
    </Modal>
  );
}

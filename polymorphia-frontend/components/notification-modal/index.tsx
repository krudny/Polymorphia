import Modal from "@/components/modal";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";
import Loading from "@/components/loading";
import NotificationCard from "@/components/notification-modal/card";
import "./index.css";

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
      <div className="w-[350px] min-h-[100px] custom-ease-with-duration">
        {notificationCount > 0 &&
          notifications.length == 0 &&
          !isNotificationsError && (
            <div className="h-[100px] relative">
              <Loading />
            </div>
          )}
        {isNotificationsError && (
          <div className="h-[100px] relative flex-col-centered">
            <span className="text-3xl">Nie udało się pobrać powiadomień</span>
          </div>
        )}
        {notifications && notifications.length > 0 && (
          <div className="notification-list">
            {notifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                isNew={index == 0}
              />
            ))}
          </div>
        )}
        {notificationCount === 0 && !isNotificationsError && (
          <div className="h-[100px] relative flex-col-centered">
            <span className="text-2xl">
              Wszystkie powiadomienia przeczytane!
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}

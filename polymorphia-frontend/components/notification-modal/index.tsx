import Modal from "@/components/modal";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";
import Loading from "@/components/loading";
import NotificationCard from "@/components/notification-modal/card";
import "./index.css";

export default function NotificationModal() {
  const { notifications, isLoading, isError, setIsNotificationModalOpen } =
    useNotificationContext();

  return (
    <Modal
      isDataPresented={true}
      onClosed={() => setIsNotificationModalOpen(false)}
      title="Powiadomienia"
    >
      <div className="w-[350px]">
        {isLoading && (
          <div className="h-[100px] relative">
            <Loading />
          </div>
        )}
        {isError && !isLoading && (
          <div className="h-[100px] relative flex-col-centered">
            <span className="text-3xl">Nie udało się pobrać powiadomień</span>
          </div>
        )}
        {notifications && notifications.length > 0 && (
          <div className="notification-list">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
        {notifications && notifications.length === 0 && (
          <div className="h-[100px] relative flex-col-centered">
            <span className="text-lg text-gray-500">Brak powiadomień</span>
          </div>
        )}
      </div>
    </Modal>
  );
}

import Modal from "@/components/modal";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";

export default function NotificationModal() {
  const { setIsNotificationModalOpen } = useNotificationContext();

  return (
    <Modal
      isDataPresented={true}
      onClosed={() => setIsNotificationModalOpen(false)}
      title="Powiadomienia"
    >
      Content
    </Modal>
  );
}

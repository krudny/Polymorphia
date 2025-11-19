"use client";

import { useState } from "react";
import { NotificationModalState } from "./types";
import {
  NotificationResponseDTO,
  NotificationTypes,
} from "@/interfaces/api/notification";
import { useRouter } from "next/navigation";

export default function useNotificationModal() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<NotificationModalState>({
    type: null,
  });

  const openModal = (modalState: NotificationModalState) => {
    setActiveModal(modalState);
  };

  const closeModal = () => {
    setActiveModal({ type: null });
  };

  const handleNotificationClick = (notification: NotificationResponseDTO) => {
    closeModal();

    switch (notification.notificationType) {
      case NotificationTypes.NEW_GRADE:
        if (notification.relatedEntityId) {
          openModal({
            type: NotificationTypes.NEW_GRADE,
            props: {
              gradableEventIdProp: notification.relatedEntityId,
              onClosedAction: closeModal,
            },
          });
        }
        break;

      case NotificationTypes.NEW_REWARD:
        if (notification.relatedEntityId) {
          alert("Alert");
        }
        break;
    }
  };

  return {
    activeModal,
    openModal,
    closeModal,
    handleNotificationClick,
  };
}

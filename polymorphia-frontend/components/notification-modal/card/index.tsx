"use client";

import { X } from "lucide-react";
import { MouseEvent, useEffect, useRef } from "react";
import { NotificationCardProps } from "@/components/notification-modal/card/types";
import useDeleteNotification from "@/hooks/notification/useDeleteNotification";
import {
  animateNotificationEntry,
  animateNotificationRemoval,
} from "@/animations/Notification";
import "./index.css";
import { getNotificationCardCustomOptions } from "@/components/notification-modal/card/utils";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";

export default function NotificationCard({
  notification,
  isNew,
}: NotificationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleNotificationClick } = useNotificationContext();
  const { mutation } = useDeleteNotification();

  useEffect(() => {
    if (cardRef.current && isNew) {
      animateNotificationEntry(cardRef.current);
    }
  }, []);

  const handleClick = () => {
    handleNotificationClick(notification);
  };

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();

    if (cardRef.current && !mutation.isPending) {
      const element = cardRef.current;

      animateNotificationRemoval(element, () => {
        mutation.mutate(notification.id);
      });
    }
  };

  const { header, icon } = getNotificationCardCustomOptions(
    notification.notificationType
  );

  return (
    <div
      ref={cardRef}
      className={`notification-card ${isNew && "is-new"}`}
      onClick={handleClick}
    >
      <div className="notification-card-icon">
        <span className="material-symbols">{icon}</span>
      </div>

      <div className="notification-card-content">
        <div className="notification-card-header">
          <h3 className="notification-card-title">{header}</h3>
          <div className="notification-card-divider"></div>
          <h4 className="notification-card-date">
            {new Date(notification.createdAt).toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
        </div>

        <p className="notification-card-description">
          {notification.description}
        </p>
      </div>

      <button
        onClick={handleClose}
        disabled={mutation.isPending}
        className="notification-card-close-button"
        aria-label="Zamknij powiadomienie"
      >
        <X className="notification-card-close-icon" />
      </button>
    </div>
  );
}

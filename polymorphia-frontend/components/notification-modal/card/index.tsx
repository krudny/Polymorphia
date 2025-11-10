import { X } from "lucide-react";
import { MouseEvent, useRef } from "react";
import { NotificationCardProps } from "@/components/notification-modal/card/types";
import { getNotificationCardHeader } from "@/components/notification-modal/card/utils";
import useDeleteNotification from "@/hooks/notification/useDeleteNotification";
import { animateNotificationRemoval } from "@/animations/Notification";

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { mutation } = useDeleteNotification();

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();

    if (cardRef.current && !mutation.isPending) {
      const element = cardRef.current;

      animateNotificationRemoval(element, () => {
        mutation.mutate(notification.id);
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="w-full flex items-start gap-3 p-3 bg-neutral-50 dark:bg-primary-dark rounded-xl hover:shadow hover:cursor-pointer transition-shadow"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-secondary-dark flex-centered text-2xl">
        <span className="material-symbols text-neutral-50 text-xl">trophy</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-x-3">
          <h3 className="text-3xl">
            {getNotificationCardHeader(notification.notificationType)}
          </h3>
          <div className="w-[1px] my-auto h-6 bg-primary-gray"></div>
          <h4 className="text-xl text-primary-gray">
            {new Date(notification.createdAt).toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
        </div>

        <p className="text-lg break-words">
          {notification.description} Ala ma kota a kot ma ale
        </p>
      </div>

      <button
        onClick={handleClose}
        disabled={mutation.isPending}
        className="flex-shrink-0 w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex-centered transition-colors group custom-ease-with-duration disabled:opacity-50"
        aria-label="Zamknij powiadomienie"
      >
        <X className="w-6 h-6 text-secondary-gray group-hover:text-primary-gray dark:group-hover:text-gray-300 custom-ease-with-duration" />
      </button>
    </div>
  );
}

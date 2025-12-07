import { UseNotifications } from "@/hooks/notification/useNotifications/types";
import { useEffect, useRef, useState } from "react";
import { API_HOST } from "@/services/api";
import { NotificationResponseDTO } from "@/interfaces/api/notification";

const RECONNECT_DELAY = 5000;
const MAX_RECONNECT_ATTEMPTS = 5;

export function useNotifications(enabled: boolean): UseNotifications {
  const [notifications, setNotifications] = useState<NotificationResponseDTO[]>(
    []
  );
  const [isError, setIsError] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);

  const removeNotification = (notificationId: number): void => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  useEffect(() => {
    if (!enabled) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      reconnectAttemptsRef.current = 0;
      setIsError(false);
      setNotifications([]);
      return;
    }

    const connect = (): void => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      const eventSource = new EventSource(
        `${API_HOST}/notifications/stream/notifications`,
        { withCredentials: true }
      );

      eventSource.onopen = () => {
        reconnectAttemptsRef.current = 0;
        setIsError(false);
      };

      eventSource.addEventListener("notification", (event: MessageEvent) => {
        try {
          const notification: NotificationResponseDTO = JSON.parse(event.data);
          setNotifications((prev) => [notification, ...prev]);
        } catch (error) {
          // pass
        }
      });

      eventSource.onerror = (error: Event) => {
        eventSource.close();

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY);
        } else {
          setIsError(true);
        }
      };

      eventSourceRef.current = eventSource;
    };

    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      setNotifications([]);
    };
  }, [enabled]);

  return { notifications, isError, removeNotification };
}

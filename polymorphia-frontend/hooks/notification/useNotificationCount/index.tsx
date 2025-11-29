import { useEffect, useRef, useState } from "react";
import { API_HOST } from "@/services/api";
import { UseNotificationCount } from "@/hooks/notification/useNotificationCount/types";

const RECONNECT_DELAY = 30000;
const MAX_RECONNECT_ATTEMPTS = 5;

export function useNotificationCount(): UseNotificationCount {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  useEffect(() => {
    const connect = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      const eventSource = new EventSource(
        `${API_HOST}/notifications/stream/notification-count`,
        { withCredentials: true }
      );

      eventSource.onopen = () => {
        reconnectAttemptsRef.current = 0;
      };

      eventSource.addEventListener("unread-count", (event) => {
        const count = parseInt(event.data, 10);
        if (!isNaN(count)) {
          setNotificationCount(count);
        }
      });

      eventSource.onerror = (error) => {
        eventSource.close();

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY);
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
    };
  }, []);

  return { notificationCount };
}

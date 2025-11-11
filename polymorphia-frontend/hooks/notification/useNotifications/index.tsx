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

  useEffect(() => {
    if (!enabled) {
      console.log("[SSE Notifications] Closing connection - modal closed");
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

      console.log("[SSE Notifications] Opening connection");
      const eventSource = new EventSource(
        `${API_HOST}/notifications/stream/notifications`,
        { withCredentials: true }
      );

      eventSource.onopen = () => {
        console.log("[SSE Notifications] Connection opened");
        reconnectAttemptsRef.current = 0;
        setIsError(false);
      };

      eventSource.addEventListener("connected", (event: MessageEvent) => {
        console.log("[SSE Notifications] Connected:", event.data);
      });

      eventSource.addEventListener("notification", (event: MessageEvent) => {
        try {
          const notification: NotificationResponseDTO = JSON.parse(event.data);
          console.log(
            "[SSE Notifications] Received notification:",
            notification
          );
          setNotifications((prev) => [notification, ...prev]);
        } catch (error) {
          console.error(
            "[SSE Notifications] Failed to parse notification:",
            error
          );
        }
      });

      eventSource.onerror = (error: Event) => {
        console.error("[SSE Notifications] Error:", error);
        eventSource.close();

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          console.log(
            `[SSE Notifications] Reconnecting attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY);
        } else {
          console.error(
            "[SSE Notifications] Max reconnection attempts reached"
          );
          setIsError(true);
        }
      };

      eventSourceRef.current = eventSource;
    };

    connect();

    return () => {
      console.log("[SSE Notifications] Cleanup - closing connection");
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

  return { notifications, isError };
}

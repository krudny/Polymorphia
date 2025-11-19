import { useScaleShow } from "@/animations/ScaleShow";
import { ReactNode } from "react";
import "./index.css";
import { useTitle } from "@/hooks/general/useTitle";
import { useMediaQuery } from "react-responsive";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";
import NotificationModal from "@/components/notification-modal";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { title } = useTitle();
  const titleRef = useScaleShow();
  const isMd = useMediaQuery({ minWidth: "768px" });
  const { isNotificationModalOpen } = useNotificationContext();

  return (
    <>
      <div
        id="main-container"
        className="main-layout"
        screen-size={isMd ? "md" : "sm"}
      >
        <div className="main-layout-title">
          <h3 ref={titleRef}>{title}</h3>
        </div>
        <div className="main-layout-content-wrapper">{children}</div>
      </div>
      {isNotificationModalOpen && <NotificationModal />}
    </>
  );
}

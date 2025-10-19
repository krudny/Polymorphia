import { MenuIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import MenuSection from "@/components/navigation/MenuSection";
import Line from "@/components/navigation/Line";
import { animateNavbar } from "@/animations/Navigation";
import "./index.css";
import { updateMenuItems } from "@/components/course/event-section/EventSectionUtils";
import { useTitle } from "@/components/navigation/TitleContext";
import useEventSections from "@/hooks/course/useEventSections";
import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import {
  useBottomMenuItems,
  useMainMenuItems,
} from "@/hooks/general/useMenuOptions";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function Navbar() {
  const { isNavbarExpanded, setIsNavbarExpanded } = useNavigationContext();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { data: eventSections } = useEventSections();
  const { title } = useTitle();
  const { userRole } = useUserContext();

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) {
      return;
    }

    animateNavbar(drawer, isNavbarExpanded);
  }, [isNavbarExpanded]);

  useEffect(() => {
    if (isNavbarExpanded) {
      document.body.style.overflow = isNavbarExpanded ? "hidden" : "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavbarExpanded]);

  const menuItems = useMainMenuItems();

  if (eventSections) {
    updateMenuItems(menuItems, eventSections, userRole);
  }

  return (
    <div className="navbar">
      <div className="navbar-visible">
        <MenuIcon
          size={38}
          onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
          className="cursor-pointer"
        />
        <h1>{title}</h1>
        <span>notifications</span>
      </div>
      <div ref={drawerRef} className="navbar-drawer">
        <div className="flex-1">
          <MenuSection options={menuItems} />
        </div>
        <div className="mt-3">
          <Line />
          <MenuSection options={useBottomMenuItems()} />
        </div>
      </div>
    </div>
  );
}

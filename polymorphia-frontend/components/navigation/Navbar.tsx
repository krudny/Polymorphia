import { MenuIcon } from "lucide-react";
import { NavigationContext } from "@/components/providers/NavigationContext";
import { useContext, useEffect, useRef } from "react";
import {
  BottomMenuItems,
  MainMenuItems,
} from "@/components/navigation/MenuOptions";
import MenuSection from "@/components/navigation/MenuSection";
import Line from "@/components/navigation/Line";
import { animateNavbar } from "@/animations/Navigation";
import "../../styles/navigation.css";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/course/event-section/EventSectionService";
import { updateMenuItems } from "@/services/course/event-section/EventSectionUtils";
import { useTitle } from "./TitleContext";

export default function Navbar() {
  const { isNavbarExpanded, setIsNavbarExpanded } =
    useContext(NavigationContext);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const { title } = useTitle();

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
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

  const { data: eventSections, isSuccess } = useQuery({
    queryKey: ["eventSections"],
    queryFn: () => EventSectionService.getEventSections(),
  });

  const menuItems = [...MainMenuItems];
  if (isSuccess) {
    updateMenuItems(menuItems, eventSections);
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
          <MenuSection options={BottomMenuItems} />
        </div>
      </div>
    </div>
  );
}

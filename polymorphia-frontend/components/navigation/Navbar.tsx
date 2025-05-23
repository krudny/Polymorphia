import {MenuIcon} from "lucide-react";
import {NavigationContext} from "@/components/navigation/NavigationContext";
import {useContext, useEffect, useRef} from "react";
import {BottomMenuItems, MainMenuItems} from "@/components/navigation/MenuOptions";
import MenuSection from "@/components/navigation/MenuSection";
import Line from "@/components/navigation/Line";
import {animateNavbar} from "@/animations/Navigation";
import "../../styles/navigation.css"

export default function Navbar() {
  const { isNavbarExpanded, setIsNavbarExpanded } = useContext(NavigationContext);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    animateNavbar(drawer, isNavbarExpanded);
  }, [isNavbarExpanded]);

  useEffect(() => {
    if (isNavbarExpanded) {
      document.body.style.overflow = isNavbarExpanded ? 'hidden' : 'auto';

    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavbarExpanded]);

  return (
      <div className="navbar">
        <div className="navbar-visible">
          <MenuIcon size={38} onClick={() => setIsNavbarExpanded(!isNavbarExpanded)} className="cursor-pointer" />
          <h1 >Polymorphia</h1>
          <span>notifications</span>
        </div>
        <div
            ref={drawerRef}
            className="navbar-drawer"
        >
          <div className="flex-1">
            <MenuSection options={MainMenuItems} />
          </div>
          <div className="mt-3">
            <Line />
            <MenuSection options={BottomMenuItems} />
          </div>
        </div>
      </div>
  );
}
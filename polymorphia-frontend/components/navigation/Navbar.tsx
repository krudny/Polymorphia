import {MenuIcon} from "lucide-react";
import {NavigationContext} from "@/components/navigation/NavigationContext";
import {useContext, useEffect, useRef} from "react";
import {BottomMenuItems, MainMenuItems} from "@/components/navigation/MenuOptions";
import MenuSection from "@/components/navigation/MenuSection";
import Line from "@/components/navigation/Line";
import {animateNavbar} from "@/animations/Navigation";
import "../../styles/navigation.css"

export default function Navbar() {
  const { isExpanded, isLocked, setIsExpanded } = useContext(NavigationContext);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    animateNavbar(drawer, isExpanded);
  }, [isExpanded]);

  useEffect(() => {
    if (!isLocked && isExpanded) {
      document.body.style.overflow = isExpanded ? 'hidden' : 'auto';

    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  return (
      <div className="navbar">
        <div className="navbar-visible">
          <MenuIcon size={38} onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer" />
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
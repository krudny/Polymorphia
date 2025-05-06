import {MenuIcon} from "lucide-react";
import {NavigationContext} from "@/components/navigation/NavigationContext";
import {useContext, useEffect, useRef} from "react";
import {BottomMenuItems, MainMenuItems} from "@/components/navigation/MenuOptions";
import MenuSection from "@/components/navigation/MenuSection";
import Line from "@/components/navigation/Line";
import {animateNavbar} from "@/animations/Navigation";

export default function Navbar() {
  const { isExpanded, setIsExpanded } = useContext(NavigationContext);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    animateNavbar(drawer, isExpanded);
  }, [isExpanded]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  return (
      <div className="flex flex-col px-5">
        <div className="w-full h-20 flex items-center justify-between">
          <MenuIcon size={38} onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer" />
          <h1 className="text-4xl">Polymorphia</h1>
          <span className="material-symbols text-3xl cursor-pointer">notifications</span>
        </div>
        <div
            ref={drawerRef}
            className="fixed flex-col inset-0 top-20 bg-neutral-800 z-50 h-[calc(100dvh-5rem)] overflow-y-auto hidden"
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
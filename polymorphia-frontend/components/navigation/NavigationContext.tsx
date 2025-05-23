import {
  createContext,
  ReactNode, useEffect,
  useState
} from "react";
import { NavigationContextType } from "@/interfaces/navigation/NavigationInterfaces";

export const NavigationContext = createContext<NavigationContextType>({
  isSidebarExpanded: false,
  setIsSidebarExpanded: () => {},
  isSidebarLocked: false,
  setIsSidebarLocked: () => {},
  isNavbarExpanded: false,
  setIsNavbarExpanded: () => {}
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarLocked, setIsSidebarLocked] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarLocked', isSidebarLocked.toString());
  }, [isSidebarLocked]);

  useEffect(() => {
    const saved = localStorage.getItem('sidebarLocked');
    if (saved === 'true') {
      setIsSidebarLocked(true);
      setIsSidebarExpanded(true);
    } else {
      setIsSidebarExpanded(false);
    }
  }, [isSidebarLocked]);

  return (
      <NavigationContext.Provider
          value={{
            isSidebarExpanded,
            setIsSidebarExpanded,
            isSidebarLocked,
            setIsSidebarLocked,
            isNavbarExpanded,
            setIsNavbarExpanded
          }}
      >
        {children}
      </NavigationContext.Provider>
  );
};

import {
  createContext,
  ReactNode, useEffect,
  useState
} from "react";
import { NavigationContextType } from "@/interfaces/navigation/NavigationInterfaces";

export const NavigationContext = createContext<NavigationContextType>({
  isSidebarExpanded: false,
  setIsSidebarExpanded: () => {},
  isSidebarLockedOpened: false,
  setIsSidebarLockedOpened: () => {},
  isSidebarLockedClosed: false,
  setIsSidebarLockedClosed: () => {},
  isNavbarExpanded: false,
  setIsNavbarExpanded: () => {}
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarLockedOpened, setIsSidebarLockedOpened] = useState(() => {
    const stored = localStorage.getItem('sidebarLockedOpened');
    return stored !== null ? stored === 'true' : false;
  });
  const [isSidebarLockedClosed, setIsSidebarLockedClosed] = useState(() => {
    const stored = localStorage.getItem('sidebarLockedClosed');
    return stored !== null ? stored === 'true' : false;
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  useEffect(() => {
      localStorage.setItem('sidebarLockedOpened', isSidebarLockedOpened.toString());
      localStorage.setItem('sidebarLockedClosed', isSidebarLockedClosed.toString());
  }, [isSidebarLockedOpened, isSidebarLockedClosed]);

  useEffect(() => {
    const savedOpened = localStorage.getItem('sidebarLockedOpened');

    if (savedOpened === 'true') {
      setIsSidebarLockedOpened(true);
      setIsSidebarExpanded(true);
    } else {
      setIsSidebarExpanded(false);
    }
  }, [isSidebarLockedOpened]);

  return (
      <NavigationContext.Provider
          value={{
            isSidebarExpanded,
            setIsSidebarExpanded,
            isSidebarLockedOpened,
            setIsSidebarLockedOpened,
            isSidebarLockedClosed,
            setIsSidebarLockedClosed,
            isNavbarExpanded,
            setIsNavbarExpanded
          }}
      >
        {children}
      </NavigationContext.Provider>
  );
};

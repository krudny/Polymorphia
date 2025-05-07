import {
  createContext,
  ReactNode, useEffect,
  useState
} from "react";
import { NavigationContextType } from "@/interfaces/navigation/NavigationInterfaces";

export const NavigationContext = createContext<NavigationContextType>({
  isExpanded: false,
  setIsExpanded: () => {},
  isLocked: false,
  setIsLocked: () => {}
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarLocked', isLocked.toString());
  }, [isLocked]);

  useEffect(() => {
    console.log(isLocked);
    const saved = localStorage.getItem('sidebarLocked');
    if (saved === 'true') {
      setIsLocked(true);
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isLocked]);

  return (
      <NavigationContext.Provider
          value={{
            isExpanded,
            setIsExpanded,
            isLocked,
            setIsLocked
          }}
      >
        {children}
      </NavigationContext.Provider>
  );
};

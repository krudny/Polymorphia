import {
  createContext,
  ReactNode,
  useState
} from "react";
import { NavigationContextType } from "@/interfaces/navigation/NavigationInterfaces";

export const NavigationContext = createContext<NavigationContextType>({
  isExpanded: false,
  setIsExpanded: () => {},
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <NavigationContext.Provider
          value={{
            isExpanded,
            setIsExpanded,
          }}
      >
        {children}
      </NavigationContext.Provider>
  );
};

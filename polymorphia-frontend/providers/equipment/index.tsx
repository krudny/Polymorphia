import { createContext, ReactNode, useReducer } from "react";
import { EquipmentContextInterface } from "@/providers/equipment/types";
import {
  equipmentReducer,
  initialEquipmentState,
} from "@/providers/equipment/reducer";

export const EquipmentContext = createContext<
  EquipmentContextInterface | undefined
>(undefined);

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(equipmentReducer, initialEquipmentState);

  return (
    <EquipmentContext.Provider value={{ state, dispatch }}>
      {children}
    </EquipmentContext.Provider>
  );
};

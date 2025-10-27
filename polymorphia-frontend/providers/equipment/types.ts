import { Dispatch } from "react";
import {
  EquipmentAction,
  EquipmentState,
} from "@/providers/equipment/reducer/types";

export interface EquipmentContextInterface {
  state: EquipmentState;
  dispatch: Dispatch<EquipmentAction>;
}

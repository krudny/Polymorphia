import { useContext } from "react";
import { HallOfFameContextInterface } from "@/providers/hall-of-fame/types";
import { HallOfFameContext } from "@/providers/hall-of-fame";

export default function useHallOfFameContext(): HallOfFameContextInterface {
  const context = useContext(HallOfFameContext);

  if (!context) {
    throw new Error(
      "useHallOfFameContext must be used within HallOfFameProvider"
    );
  }

  return context;
}

import { useContext } from "react";
import { HallOfFameContextInterface } from "@/components/providers/hall-of-fame/types";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";

export default function useHallOfFameContext(): HallOfFameContextInterface {
  const context = useContext(HallOfFameContext);

  if (!context) {
    throw new Error(
      "useHallOfFameContext must be used within HallOfFameProvider"
    );
  }

  return context;
}

import {ChevronLeft, ChevronRight} from "lucide-react";
import {NavigationArrowProps} from "@/interfaces/slider/SliderInterfaces";

export default function NavigationArrow({ direction, onClick }: NavigationArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const position = direction === "left" ? "left-4" : "right-4";

  return (
      <button
          onClick={onClick}
          className={`absolute ${position} top-1/2 transform -translate-y-1/4 p-2 rounded-full transition-all group`}
          aria-label={direction === "left" ? "Poprzedni slajd" : "Następny slajd"}
      >
        <Icon
            size={48}
            className="text-neutral-100 transition-colors group-hover:text-neutral-300"
        />
      </button>
  );
}
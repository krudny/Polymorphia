import {ChevronLeft, ChevronRight} from "lucide-react";
import {NavigationArrowProps} from "@/interfaces/slider/SliderInterfaces";

export default function NavigationArrow({ direction, onClick, className }: NavigationArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const position = direction === "left" ? "-left-4 md:left-4" : "-right-4 md:right-4";

  return (
      <button
          onClick={onClick}
          className={`absolute ${position} top-1/2 -translate-y-1/2 transform rounded-full transition-all group ${className}`}
          aria-label={direction === "left" ? "Poprzedni slajd" : "Następny slajd"}
      >
        <Icon
            size={48}
            className="text-[#212121]  transition-colors group-hover:text-zinc-700"
        />
      </button>
  );
}
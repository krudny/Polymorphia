import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationArrowProps } from "@/interfaces/slider/SliderInterfaces";
import clsx from "clsx";
import "../../styles/slider.css";

export default function NavigationArrow({
  direction,
  onClick,
  className,
}: NavigationArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const position =
    direction === "left" ? "-left-4 lg:left-4" : "-right-4 lg:right-4";

  return (
    <button
      onClick={onClick}
      className={clsx(`slider-arrows ${position} ${className}`)}
      aria-label={direction === "left" ? "Poprzedni slajd" : "Następny slajd"}
    >
      <Icon size={48} />
    </button>
  );
}

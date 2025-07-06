import {
  HallOfFameFilter,
  HallOfFameFilterID,
} from "@/components/hall-of-fame/general/types";

export function animateFiltersModal(
  filters: HallOfFameFilter[],
  refs: Record<HallOfFameFilterID, HTMLDivElement | null>
) {
  filters.forEach((filter) => {
    const el = refs[filter.id];
    if (!el) return;

    if (filter.isOpen) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        marginTop: "0.5rem",
        duration: 0.4,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  });
}

import XPCard from "@/components/xp-card/XPCard";
import { useMediaQuery } from "react-responsive";

export default function RankPodium({ position }: { position: 1 | 2 | 3 }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const size = isMobile ? "hofMobile" : "hofDesktop";

  return (
    <div className="w-full h-[calc(33.333%-1rem)] max-h-52 my-2 bg-neutral-300 rounded-xl">
      <XPCard
        title="Gerard Małoduszny"
        subtitle="Majestatyczna Bestia"
        color={position === 1 ? "gold" : position === 2 ? "silver" : "bronze"}
        xp="128.9"
        size={size}
      />
    </div>
  );
}

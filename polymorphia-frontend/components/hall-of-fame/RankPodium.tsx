import XPCard from "@/components/xp-card/XPCard";

export default function RankPodium({ position }: { position: 1 | 2 | 3 }) {
  return (
    <div className="w-full h-full 2xl:h-[calc(33.333%-1rem)] max-h-36 2xl:max-h-52 bg-neutral-300 rounded-xl bg-green-300">
      <XPCard
        title="Gerard Małoduszny"
        subtitle="Majestatyczna Bestia"
        color={position === 1 ? "gold" : position === 2 ? "silver" : "bronze"}
        xp="128.9"
        size={"hofDesktop"}
      />
    </div>
  );
}

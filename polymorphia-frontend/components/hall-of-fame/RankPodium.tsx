import XPCard from "@/components/xp-card/XPCard";

export default function RankPodium({position}: {position: 1 | 2 | 3}) {
    return (
        <div className="w-full h-[calc(33.333%-1rem)] max-h-48 my-2 bg-neutral-300 rounded-xl">
            <XPCard
                title="Gerard Małoduszny"
                subtitle="Majestatyczna Bestia"
                color={position === 1 ? "gold" : position === 2 ? "silver" : "bronze"}
                xp="128.9"
                size="hallOfFame"
            />
        </div>
    )
}
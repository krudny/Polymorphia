import XPCard from "@/components/xp-card/XPCard";

export default function Test() {
    return (
        <>
            <div className="w-[900px] max-h-[80dvh]  m-auto custom-scrollbar bg-yellow-400">
                <XPCard
                    title="Gerard Małoduszny"
                    subtitle="Majestatyczna Bestia"
                    color="gold"
                    xp="128.9 xp"
                    size="hallOfFame"
                />
            </div>
        </>
    )
}
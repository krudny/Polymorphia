import RankCard from "@/app/(logged-in)/test/RankCard";

export default function Test() {
    return (
        <>
            <div className="w-[900px] max-h-[80dvh]  m-auto custom-scrollbar bg-yellow-400">
                {[1,2,3].map((_, i) => (
                    <RankCard key={i} />
                ))}
            </div>
        </>
    )
}
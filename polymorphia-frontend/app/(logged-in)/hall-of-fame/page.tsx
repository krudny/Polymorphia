"use client"
import RankCard from "@/components/hall-of-fame/RankCard";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import Pagination from "@/components/general/Pagination";
import '../../../styles/paginate.css';
import {useTitle} from "@/components/navigation/TitleContext";
import {useEffect} from "react";
import {useScaleShow} from "@/animations/General";

export default function HallOfFame() {
    const { setTitle } = useTitle();
    const wrapperRef = useScaleShow();

    useEffect(() => {
        setTitle("Hall of Fame");
    }, [setTitle]);

    return (
        <div ref={wrapperRef} className="w-full h-full mx-auto flex flex-col lg:px-10 lg:mt-4 lg:max-h-[calc(100dvh-5rem)] lg:min-h-[calc(100dvh-5rem)] lg:max-w-[1600px]">
            <div className="flex flex-1 min-h-0">
                <div className="w-[30%] min-h-full px-4 flex-col-centered">
                    <div className="w-full h-20 mb-4 flex-centered">
                        <h2 className="text-3xl">Podium</h2>
                    </div>
                    <div className="w-full flex justify-between flex-col flex-1 px-4">
                        {([1, 2, 3] as const).map((position) => (
                          <RankPodium key={position} position={position} />
                        ))}
                    </div>
                </div>
                <div className="w-[70%]  min-h-full flex-col-centered">
                    <div className="w-full h-20 mb-4 pl-4 flex justify-between">
                        <RankSearch />
                        <RankSort />
                    </div>
                    <div className="w-full flex flex-col flex-1 px-4 overflow-y-scroll custom-scrollbar">
                        {[1,2,3,4,5,6,7,8,9].map((_, i) => (
                            <RankCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full min-h-14 flex items-center justify-end text-2xl">
                <Pagination
                    totalPages={5}
                    onPageChangeAction={() => {}}
                    forcePage={1}
                />
            </div>
        </div>
    )
}
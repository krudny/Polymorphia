import { useScaleShow } from "@/animations/General";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankCardDesktop from "@/components/hall-of-fame/RankCardDesktop";
import Pagination from "@/components/general/Pagination";

export default function RankDesktop() {
  const wrapperRef = useScaleShow();

  // TODO: breakpointy
  return (
    <div
      ref={wrapperRef}
      className="w-full h-full mx-auto flex flex-col lg:px-10 lg:mt-4 lg:max-h-[calc(100dvh-5rem)] lg:min-h-[calc(100dvh-5rem)] lg:max-w-[1600px] 3xl:min-h-[54rem] 3xl:max-h-[54rem]"
    >
      <div className="flex flex-1 min-h-0">
        <div className="w-[30%] min-h-full px-4 flex flex-col">
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
            {Array.from({ length: 20 - 4 + 1 }, (_, i) => (
              <RankCardDesktop key={i} position={i + 3} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full min-h-14 flex items-center justify-end text-2xl">
        <Pagination
          totalPages={250 / 20}
          onPageChangeAction={() => {}}
          forcePage={0}
        />
      </div>
    </div>
  );
}

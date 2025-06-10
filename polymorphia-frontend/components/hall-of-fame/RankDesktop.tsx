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
      className="w-full opacity-0 h-full mx-auto flex flex-col lg:px-8 2xl:px-10 lg:mt-4 bg-red-800 2xl:max-h-[calc(100dvh-5rem)] lg:min-h-[calc(100dvh-5rem)] lg:max-w-[1600px] 3xl:min-h-[54rem] 3xl:max-h-[54rem]"
    >
      <div className="flex flex-col h-full 2xl:flex-1 min-h-0 px-4 bg-red-400">
        <div className="w-full 2xl:w-[30%] 2xl:min-h-full flex flex-col bg-purple-300">
          <div className="w-full h-14 2xl:mb-4 flex-centered">
            <h2 className="text-3xl">Podium</h2>
          </div>
          <div className="w-full h-fit py-3 grid grid-cols-3 gap-x-3 2xl:justify-between 2xl:flex-col 2xl:flex-1 2xl:px-4 bg-orange-200">
            {([1, 2, 3] as const).map((position) => (
              <RankPodium key={position} position={position} />
            ))}
          </div>
        </div>
        <div className="w-full 2xl:w-[70%]  2xl:min-h-full flex-col-centered bg-yellow-300">
          <div className="w-full h-14 2xl:pl-4 flex justify-between bg-blue-400">
            <RankSearch />
            <RankSort />
          </div>
          <div className="w-full flex flex-col flex-1 2xl:overflow-y-scroll custom-scrollbar">
            {Array.from({ length: 10 - 4 + 1 }, (_, i) => (
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

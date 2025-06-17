"use client"
import { useScaleShow } from "@/animations/General";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankCardDesktop from "@/components/hall-of-fame/RankCardDesktop";
import Pagination from "@/components/general/Pagination";
import "../../styles/hall-of-fame.css";
import {HallOfFameResponseDTO} from "@/interfaces/api/DTO";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import Loading from "@/components/general/Loading";

interface RankDesktopProps {
  data: HallOfFameResponseDTO;
  onPageChange: (newPage: number) => void;
}

export default function RankDesktop() {
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hallOfFame", page],
    queryFn: () => HallOfFameService.getHallOfFame(page, 50),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!data || data.content.length === 0) {
    return <div>No data found.</div>;
  }

  console.log(data)
  const podium = data.content.slice(0, 3);


  return (
    <div className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <div className="hall-of-fame-desktop-podium">
            {podium.map((item, index) => (
              <RankPodium
                key={`podium-${index}-${item.userDetails.studentName}`}
                position={index + 1}
                userDetails={item.userDetails}
                xpDetails={item.xpDetails}
              />
            ))}
          </div>
        </div>
        <div className="hall-of-fame-desktop-content-wrapper">
          <div className="hall-of-fame-desktop-search-wrapper">
            <RankSearch />
            <RankSort />
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {isLoading ? (
              <Loading />
            ) : (
              data.content.map((item, index) => (
                <RankCardDesktop
                  key={`rank-${index}-${item.userDetails.studentName}`}
                  position={page * 50 + (index + 1)}
                  userDetails={item.userDetails}
                  xpDetails={item.xpDetails}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="hall-of-fame-pagination-wrapper justify-end">
        <Pagination
          totalPages={data.page.totalPages}
          forcePage={data.page.number}
          onPageChangeAction={setPage}
        />
      </div>
    </div>
  );
}

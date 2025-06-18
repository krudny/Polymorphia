"use client"
import { useScaleShow } from "@/animations/General";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankCardDesktop from "@/components/hall-of-fame/RankCardDesktop";
import Pagination from "@/components/general/Pagination";
import "../../styles/hall-of-fame.css";
import {HallOfFameResponseDTO} from "@/interfaces/api/DTO";
import {useContext, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import Loading from "@/components/general/Loading";
import {HallOfFameContext} from "@/components/providers/HallOfFameContext";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function RankDesktop() {
  const { data, page, setPage, isLoading } = useContext(HallOfFameContext);

  return (
     <div className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <div className="hall-of-fame-desktop-podium">
            {!isLoading && data.content.slice(0,3).map((item, index) => (
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
            <ButtonWithBorder text="Filtry" className="!mx-0 !py-0 !border-0 !border-b-2"/>
            {/*<RankSort />*/}
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {isLoading ? (
              <div className="w-full h-full flex-centered">
                <Loading />
              </div>
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
        {!isLoading &&
        <Pagination
          totalPages={data.page.totalPages}
          forcePage={page}
          onPageChangeAction={setPage}
        />}
      </div>
    </div>
  );
}

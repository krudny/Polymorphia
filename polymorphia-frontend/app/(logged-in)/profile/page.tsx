"use client";
import Image from "next/image";
import { useScaleShow } from "@/animations/ScaleShow";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useState } from "react";
import UserPoints from "@/components/user-points/UserPoints";
import ProgressBarTextLabels from "@/components/progressbar/ProgressBarTextLabels";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/loading/Loading";
import isStudent from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";
import useStudentProfile from "@/hooks/course/useStudentProfile";
import { min } from "@popperjs/core/lib/utils/math";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";
import { useProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs";
import { useFilters } from "@/hooks/course/useFilters";
import { useQueryClient } from "@tanstack/react-query";
import { filterXpDetails } from "@/providers/hall-of-fame/utils/filterXpDetails";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";

export default function Profile() {
  const { setTitle } = useTitle();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSm = useMediaQuery({ maxWidth: 920 });
  const { data: profile, isLoading } = useStudentProfile();
  const wrapperRef = useScaleShow(!isLoading);
  const userContext = useUserContext();
  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useProfileFilterConfigs();
  const filters = useFilters<HallOfFameFilterId>(filterConfigs ?? []);
  const speedDialItems = [
    {
      id: 1,
      orderIndex: 1,
      label: "Filtry",
      icon: "tune",
      onClick: () => {
        setIsModalOpen(true);
      },
    },
  ];
  useEffect(() => {
    setTitle("Profil");
  }, [setTitle]);

  if (isLoading && !userContext) {
    return <Loading />;
  }

  //TODO: handle profile for other roles
  if ((userContext && !isStudent(userContext)) || !profile) {
    return <div>No data found.</div>;
  }

  const { imageUrl, userName, animalName, position } = userContext.userDetails;

  const lastEvolutionStageId = profile.evolutionStageThresholds.length - 1;
  const maxPoints =
    profile.evolutionStageThresholds[lastEvolutionStageId].minXp;

  const handleApplyFilters = () => {
    queryClient.invalidateQueries({
      queryKey: ["hallOfFame"],
    });
  };

  const filteredXpDetails = filterXpDetails(
    profile.xpDetails,
    filters.configs.find((config) => config.id === "rankingOptions"),
    filters.getAppliedFilterValues
  );
  console.log(filteredXpDetails);

  return (
    <div ref={wrapperRef} className="profile">
      <div className="profile-speed-dial-desktop">
        <SpeedDialDesktop items={speedDialItems} />
      </div>
      <div className="profile-speed-dial-mobile">
        <SpeedDialMobile items={speedDialItems} />
      </div>
      <div className="profile-wrapper">
        <div className="profile-content-wrapper">
          <div className="profile-image-wrapper">
            <Image
              src={`${API_STATIC_URL}/${imageUrl}`}
              alt="User profile"
              fill
              className="profile-img"
              priority
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <div className="profile-content">
            <div className="profile-content-text">
              <h1>{userName}</h1>
              <h2>{animalName}</h2>
              <h3>
                Jesteś {position} na {profile.totalStudentsInCourse} zwierzaków!
              </h3>
              <h4>Suma: {profile.totalXp} xp</h4>
            </div>
            <div className="profile-user-points-xs">
              <UserPoints
                separators
                titleSize="sm"
                xpSize="md"
                maxCols={6}
                xpDetails={filteredXpDetails}
              />
            </div>
            <div className="profile-user-points-md">
              <UserPoints
                separators
                titleSize="sm"
                xpSize="md"
                xpDetails={filteredXpDetails}
              />
            </div>
            <div className="profile-user-points-2xl">
              <UserPoints
                separators
                titleSize="md"
                xpSize="lg"
                xpDetails={filteredXpDetails}
              />
            </div>
          </div>
        </div>
        {/* TODO: maybe merge that */}
        <div className="profile-progress-bar-mobile">
          <ProgressBar
            minXP={0}
            currentXP={min(profile.totalXp, maxPoints)}
            maxXP={maxPoints}
            numSquares={2}
            segmentSizes={[0, 100, 0]}
            upperElement={
              <ProgressBarTextLabels
                textLabels={
                  (profile.evolutionStageThresholds
                    ?.map(
                      (evolutionStage) =>
                        `${evolutionStage.grade.toFixed(1)} (${evolutionStage.minXp.toFixed(1)}xp)`
                    )
                    .filter(Boolean) as string[]) || []
                }
                className="!min-h-8"
                size="sm"
              />
            }
            lowerElement={
              <ProgressBarTextLabels
                textLabels={
                  profile.evolutionStageThresholds?.map(
                    (evolutionStage) => evolutionStage.name
                  ) || []
                }
                size="sm"
              />
            }
          />
        </div>

        <div className="profile-progress-bar-desktop">
          <ProgressBar
            minXP={0}
            currentXP={min(profile.totalXp, maxPoints)}
            maxXP={maxPoints}
            numSquares={8}
            segmentSizes={[0, 25, 0, 25, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0]}
            upperElement={
              <ProgressBarTextLabels
                textLabels={
                  (profile.evolutionStageThresholds
                    ?.map(
                      (evolutionStage) =>
                        `${evolutionStage.grade.toFixed(1)} (${evolutionStage.minXp.toFixed(1)}xp)`
                    )
                    .filter(Boolean) as string[]) || []
                }
                className="!min-h-8"
                size={isSm ? "sm" : "md"}
              />
            }
            lowerElement={
              <ProgressBarTextLabels
                textLabels={
                  profile.evolutionStageThresholds.map(
                    (evolutionStage) => evolutionStage.name
                  ) || []
                }
                size={isSm ? "sm" : "md"}
              />
            }
          />
        </div>
        <FiltersModal<HallOfFameFilterId>
          filters={filters}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isFiltersLoading={isFiltersLoading}
          isFiltersError={isFiltersError}
          onFiltersApplied={() => handleApplyFilters()}
        />
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useScaleShow } from "@/animations/ScaleShow";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useState } from "react";
import UserPoints from "@/components/user-points/UserPoints";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/loading/Loading";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";
import useStudentProfile from "@/hooks/course/useStudentProfile";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import { useProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs";
import { useFilters } from "@/hooks/course/useFilters";
import { useQueryClient } from "@tanstack/react-query";
import { filterXpDetails } from "@/providers/hall-of-fame/utils/filterXpDetails";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";
import ProfileProgressBar from "@/components/progressbar/profile";

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
  const filters = useFilters<ProfileFilterId>(filterConfigs ?? []);
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
  if ((userContext && userContext.userType !== Roles.STUDENT) || !profile) {
    return null;
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

  const currentIndex = profile.evolutionStageThresholds.findIndex(
    (stage) => stage.name === userContext.userDetails.evolutionStage
  );

  let nextEvolutionStage;
  let currentEvolutionStage;

  if (profile.evolutionStageThresholds[currentIndex + 1]) {
    nextEvolutionStage = profile.evolutionStageThresholds[currentIndex + 1];
    currentEvolutionStage = profile.evolutionStageThresholds[currentIndex];
  } else {
    nextEvolutionStage = profile.evolutionStageThresholds[currentIndex];
    currentEvolutionStage = profile.evolutionStageThresholds[currentIndex - 1];
  }

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
          <ProfileProgressBar
            profile={profile}
            maxPoints={maxPoints}
            evolutionStages={[currentEvolutionStage, nextEvolutionStage]}
            numSquares={2}
            segmentSizes={[0, 100, 0]}
            size={"sm"}
          />
        </div>

        <div className="profile-progress-bar-desktop">
          <ProfileProgressBar
            profile={profile}
            maxPoints={maxPoints}
            evolutionStages={profile.evolutionStageThresholds}
            numSquares={profile.evolutionStageThresholds.length}
            segmentSizes={distributeTo100(
              profile.evolutionStageThresholds.length
            )}
            size={isSm ? "sm" : "md"}
          />
        </div>
        <FiltersModal<ProfileFilterId>
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

function distributeTo100(n: number) {
  const result = new Array(2 * n + 1).fill(0);
  const base = Math.floor(100 / n);
  const remainder = 100 % n;

  for (let i = 0; i < n; i++) {
    result[i * 2 + 1] = base + (i < remainder ? 1 : 0);
  }

  return result;
}

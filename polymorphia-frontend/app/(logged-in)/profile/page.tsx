"use client";
import Image from "next/image";
import { useScaleShow } from "@/animations/ScaleShow";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import UserPoints from "@/components/user-points/UserPoints";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/loading";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";
import useStudentProfile from "@/hooks/course/useStudentProfile";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import { useProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs";
import { useFilters } from "@/hooks/course/useFilters";
import { filterXpDetails } from "@/providers/hall-of-fame/utils/filterXpDetails";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";
import ProfileProgressBar from "@/components/progressbar/profile";
import { distributeTo100 } from "@/app/(logged-in)/profile/ProfileService";
import { ProfileProvider } from "@/providers/profile/ProfileContext";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import useProfileContext from "@/hooks/contexts/useProfileContext";
import { notFound } from "next/navigation";

function ProfileContent() {
  const { setTitle } = useTitle();

  // TODO: refactor the rest of the logic to ProfileContext
  const { areFiltersOpen, setAreFiltersOpen } = useProfileContext();
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

  useEffect(() => {
    setTitle("Profil");
  }, [setTitle]);

  if (userContext.userRole !== Roles.STUDENT || (!profile && !isLoading)) {
    notFound();
  }

  if (isLoading || !userContext.userRole || !profile) {
    return <Loading />;
  }

  const { imageUrl, fullName, animalName, position } = userContext.userDetails;

  const lastEvolutionStageId = profile.evolutionStageThresholds.length - 1;
  const maxPoints =
    profile.evolutionStageThresholds[lastEvolutionStageId].minXp;

  const filteredXpDetails = filterXpDetails(
    profile.xpDetails,
    filters.configs.find((config) => config.id === "rankingOptions"),
    filters.getAppliedFilterValues
  );

  return (
    <div ref={wrapperRef} className="profile">
      <SpeedDial speedDialKey={SpeedDialKeys.PROFILE_STUDENT} />
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
              <h1>{fullName}</h1>
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
        <div className="profile-progress-bar-mobile">
          <ProfileProgressBar
            totalXp={
              (profile.totalXp / profile.rightEvolutionStage.minXp) * 100
            }
            maxPoints={maxPoints}
            evolutionStages={[
              profile.leftEvolutionStage,
              profile.rightEvolutionStage,
            ]}
            numSquares={2}
            segmentSizes={[0, 100, 0]}
            size={"sm"}
          />
        </div>

        <div className="profile-progress-bar-desktop">
          <ProfileProgressBar
            totalXp={profile.totalXp}
            maxPoints={maxPoints}
            evolutionStages={profile.evolutionStageThresholds}
            numSquares={profile.evolutionStageThresholds.length}
            segmentSizes={distributeTo100(profile.evolutionStageThresholds)}
            size={isSm ? "sm" : "md"}
          />
        </div>
        <FiltersModal<ProfileFilterId>
          filters={filters}
          isModalOpen={areFiltersOpen}
          setIsModalOpen={setAreFiltersOpen}
          isFiltersLoading={isFiltersLoading}
          isFiltersError={isFiltersError}
        />
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}

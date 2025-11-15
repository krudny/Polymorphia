"use client";
import Image from "next/image";
import { useScaleShow } from "@/animations/ScaleShow";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import UserPoints from "@/components/user-points/UserPoints";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/loading";
import useUserContext from "@/hooks/contexts/useUserContext";
import useStudentProfile from "@/hooks/course/useStudentProfile";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import { useProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs";
import { useFilters } from "@/hooks/course/useFilters";
import { filterXpDetails } from "@/providers/hall-of-fame/utils/filterXpDetails";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";
import ProfileProgressBar from "@/components/progressbar/profile";
import { ProfileProvider } from "@/providers/profile";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import useProfileContext from "@/hooks/contexts/useProfileContext";
import { distributeTo100 } from "@/components/progressbar/profile/distributeTo100";
import ErrorComponent from "@/components/error";
import { Roles } from "@/interfaces/api/user";
import { Sizes } from "@/interfaces/general";

function ProfileContent() {
  // TODO: refactor the rest of the logic to ProfileContext
  const { areFiltersOpen, setAreFiltersOpen } = useProfileContext();
  const isSm = useMediaQuery({ maxWidth: 920 });
  const { data: profile, isLoading, isError } = useStudentProfile();
  const wrapperRef = useScaleShow(!isLoading);
  const userContext = useUserContext();
  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useProfileFilterConfigs();

  const filters = useFilters<ProfileFilterId>(filterConfigs ?? []);

  if (isLoading || !userContext.userRole) {
    return <Loading />;
  }

  if (isError || !profile || userContext.userRole !== Roles.STUDENT) {
    return <ErrorComponent message="Nie udało się załadować profilu." />;
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
                titleSize={Sizes.SM}
                xpSize={Sizes.MD}
                maxCols={6}
                xpDetails={filteredXpDetails}
              />
            </div>
            <div className="profile-user-points-md">
              <UserPoints
                separators
                titleSize={Sizes.SM}
                xpSize={Sizes.MD}
                xpDetails={filteredXpDetails}
              />
            </div>
            <div className="profile-user-points-2xl">
              <UserPoints
                separators
                titleSize={Sizes.MD}
                xpSize={Sizes.LG}
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
            size={Sizes.SM}
          />
        </div>

        <div className="profile-progress-bar-desktop">
          <ProfileProgressBar
            totalXp={profile.totalXp}
            maxPoints={maxPoints}
            evolutionStages={profile.evolutionStageThresholds}
            numSquares={profile.evolutionStageThresholds.length}
            segmentSizes={distributeTo100(profile.evolutionStageThresholds)}
            size={isSm ? Sizes.SM : Sizes.MD}
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

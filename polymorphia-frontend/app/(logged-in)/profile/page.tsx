"use client";
import Image from "next/image";
import { useScaleShow } from "@/animations/ScaleShow";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import UserPoints from "@/components/user-points/UserPoints";
import ProgressBarTextLabels from "@/components/progressbar/ProgressBarTextLabels";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/loading/Loading";
import isStudent from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";
import useStudentProfile from "@/hooks/course/useStudentProfile";

export default function Profile() {
  const wrapperRef = useScaleShow();
  const { setTitle } = useTitle();
  const isSm = useMediaQuery({ maxWidth: 920 });
  const { data: profile, isLoading } = useStudentProfile();
  const userContext = useUserContext();

  useEffect(() => {
    setTitle("Profil");
  }, [setTitle]);

  if (isLoading || !userContext) {
    return <Loading />;
  }

  //TODO: handle profile for other roles
  if ((userContext && !isStudent(userContext)) || !profile) {
    console.log("aaaaaa");
    return <div>No data found.</div>;
  }

  const { imageUrl, userName, animalName, position } = userContext.userDetails;

  console.log(profile);

  return (
    <div ref={wrapperRef} className="profile">
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
                xpDetails={profile.xpDetails}
              />
            </div>
            <div className="profile-user-points-md">
              <UserPoints
                separators
                titleSize="sm"
                xpSize="md"
                xpDetails={profile.xpDetails}
              />
            </div>
            <div className="profile-user-points-2xl">
              <UserPoints
                separators
                titleSize="md"
                xpSize="lg"
                xpDetails={profile.xpDetails}
              />
            </div>
          </div>
        </div>
        {/* TODO: maybe merge that */}
        <div className="profile-progress-bar-mobile">
          <ProgressBar
            minXP={60}
            currentXP={65}
            maxXP={70}
            numSquares={2}
            segmentSizes={[0, 100, 0]}
            upperElement={
              <ProgressBarTextLabels
                textLabels={
                  (profile.evolutionStageThresholds
                    ?.map((evolutionStage) => evolutionStage.gradingThreshold)
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
            currentXP={65}
            maxXP={100}
            numSquares={8}
            segmentSizes={[0, 25, 0, 25, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0]}
            upperElement={
              <ProgressBarTextLabels
                textLabels={
                  (profile.evolutionStageThresholds
                    ?.map((evolutionStage) => evolutionStage.gradingThreshold)
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
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useScaleShow } from "@/animations/ScaleShow";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { useTitle } from "@/components/navigation/TitleContext";
import { useContext, useEffect } from "react";
import UserPoints from "@/components/user-points/UserPoints";
import ProgressBarTextLabels from "@/components/progressbar/ProgressBarTextLabels";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/loading/Loading";
import { UserContext } from "@/components/providers/user/UserContext";

export default function Profile() {
  const wrapperRef = useScaleShow();
  const { setTitle } = useTitle();
  const isSm = useMediaQuery({ maxWidth: 920 });
  const userContext = useContext(UserContext);

  useEffect(() => {
    setTitle("Profil");
  }, [setTitle]);

  const { data: evolutionStages, isLoading } = useQuery({
    queryKey: ["evolution_stages", 1],
    queryFn: () =>
      KnowledgeBaseService.getEvolutionStages(userContext?.courseId),
  });

  if (isLoading) {
    return <Loading />;
  }

  const sampleXpDetails = {
    Laboratoria: "54.32",
    Kartkówki: "43.33",
    Projekt: "18.33",
    Bonusy: "12.98",
  };

  return (
    <div ref={wrapperRef} className="profile">
      <div className="profile-wrapper">
        <div className="profile-content-wrapper">
          <div className="profile-image-wrapper">
            <Image
              src={`${API_STATIC_URL}/${userContext?.imageUrl || "/"}`}
              alt="User profile"
              fill
              className="profile-img"
              priority
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <div className="profile-content">
            <div className="profile-content-text">
              <h1>{userContext?.userName}</h1>
              <h2>{userContext?.animalName}</h2>
              <h3>Jesteś 36 na 139 zwierzaków!</h3>
            </div>
            <div className="profile-user-points-xs">
              <UserPoints
                separators
                titleSize="sm"
                xpSize="md"
                xpDetails={sampleXpDetails}
              />
            </div>
            <div className="profile-user-points-md">
              <UserPoints
                separators
                titleSize="sm"
                xpSize="md"
                xpDetails={sampleXpDetails}
              />
            </div>
            <div className="profile-user-points-2xl">
              <UserPoints
                separators
                titleSize="md"
                xpSize="lg"
                xpDetails={sampleXpDetails}
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
                  (evolutionStages
                    ?.map(
                      (evolutionStage) => evolutionStage.additionalGradingInfo
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
                  evolutionStages?.map(
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
                  (evolutionStages
                    ?.map(
                      (evolutionStage) => evolutionStage.additionalGradingInfo
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
                  evolutionStages?.map(
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

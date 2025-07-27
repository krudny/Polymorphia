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

export default function Profile() {
  const wrapperRef = useScaleShow();
  const { setTitle } = useTitle();
  const isSm = useMediaQuery({ maxWidth: 920 });

  useEffect(() => {
    setTitle("Profil");
  }, [setTitle]);

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
              src={`${API_STATIC_URL}/images/evolution-stages/4.jpg`}
              alt="User profile"
              fill
              className="profile-img"
              priority
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <div className="profile-content">
            <div className="profile-content-text">
              <h1>Kamil Rudny</h1>
              <h2>Gerard Pocieszny</h2>
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
                textLabels={["3.5 (60xp)", "4.0 (70xp)"]}
                isHorizontal={true}
                className="!min-h-8"
                size="sm"
              />
            }
            lowerElement={
              <ProgressBarTextLabels
                textLabels={["Nieopierzony Odkrywca", "Samodzielny Zwierzak"]}
                isHorizontal={true}
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
                textLabels={[
                  "2.0 (0xp)",
                  "2.0 (25xp)",
                  "3.0 (50xp)",
                  "3.5 (60xp)",
                  "4.0 (70xp)",
                  "4.5 (80xp)",
                  "5.0 (90xp)",
                  "5.0 (100xp)",
                ]}
                isHorizontal={true}
                className="!min-h-8"
                size={isSm ? "sm" : "md"}
              />
            }
            lowerElement={
              <ProgressBarTextLabels
                textLabels={[
                  "Jajo",
                  "Pisklak",
                  "Podlot",
                  "Żółtodziób",
                  "Nieopierzony Odkrywca",
                  "Samodzielny Zwierzak",
                  "Majestatyczna Bestia",
                  "Władca Polymorphii",
                ]}
                isHorizontal={true}
                size={isSm ? "sm" : "md"}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

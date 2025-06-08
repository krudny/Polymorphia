"use client"
import Image from "next/image";
import {useScaleShow} from "@/animations/General";
import {API_STATIC_URL} from "@/services/api";
import "../../../styles/profile.css"
import ProgressBar from "@/components/progressbar/ProgressBar";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function Profile() {
  const wrapperRef = useScaleShow();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Profil');
  }, [setTitle]);

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
                <h1>Kamil Rudny</h1>
                <h2>Gerard (65xp)</h2>
                <h3>Jesteś 36 na 139 zwierzaków!</h3>
              </div>
            </div>
            <div className="profile-progress-bar-mobile">
                <ProgressBar
                    minXP={60}
                    currentXP={65}
                    maxXP={70}
                    numSquares={2}
                    segmentSizes={[0, 100, 0]}
                    upperTextLabels={["3.5 (60xp)", "4.0 (70xp)"]}
                    bottomTextLabels={["Żółtodziób", "Nieopierzony Odkrywca"]}
                    labelsSize="sm"
                />
            </div>

            <div className="profile-progress-bar-desktop">
                <ProgressBar
                    minXP={0}
                    currentXP={65}
                    maxXP={100}
                    numSquares={8}
                    segmentSizes={[0, 25, 0, 25, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0 ]}
                    upperTextLabels={["2.0 (0xp)", "2.0 (25xp)", "3.0 (50xp)", "3.5 (60xp)", "4.0 (70xp)", "4.5 (80xp)", "5.0 (90xp)", "5.0 (100xp)"]}
                    bottomTextLabels={["Jajo", "Pisklak", "Podlot", "Żółtodziób", "Nieopierzony Odkrywca", "Samodzielny Zwierzak", "Majestatyczna Bestia", "Władca Polymorphii"]}
                    labelsSize="sm"
                />
            </div>
          </div>
      </div>
  )
}
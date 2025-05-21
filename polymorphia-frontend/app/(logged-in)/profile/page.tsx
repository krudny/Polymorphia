"use client"
import Image from "next/image";
import {useScaleShow} from "@/animations/General";
import {API_STATIC_URL} from "@/services/api";
import "../../../styles/profile.css"
import {ClientProgressBar} from "@/app/(logged-in)/test/page";

export default function Profile() {
  const wrapperRef = useScaleShow();

  return (
      <div ref={wrapperRef} className="profile">
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
        <div className="profile-progress-bar" id="progress-bar-container">
            <ClientProgressBar
                currentXP={67}
                numSquares={7}
                // upperTextLabels={["2.0 (<25xp)", "2.0 (<50xp)", "3.0 (<60xp)", "3.5 (<70xp)", "4.0 (<80xp)", "4.5 (<90xp)", "5.0 (<100xp)"]}
                // bottomTextLabels={["Jajo", "Pisklak", "Podlot", "Żółtodziób", "Nieopierzony Odkrywca", "Samodzielny Zwierzak", "Majestatyczna Bestia"]}
            />
        </div>

      </div>
  )
}
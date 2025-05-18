"use client"
import Image from "next/image";
import {useScaleShow} from "@/animations/General";
import {API_STATIC_URL} from "@/services/api";
import "../../../styles/profile.css"
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function Profile() {
  const wrapperRef = useScaleShow();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Profil');
  }, [])

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
        <div className="profile-progress-bar">
          <h1>Duży pasek postępu</h1>
        </div>

      </div>
  )
}
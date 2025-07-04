import Image from "next/image";
import "../../styles/navigation.css";
import { API_STATIC_URL } from "@/services/api";
import { useContext } from "react";
import { UserContext } from "@/components/providers/UserContext";

export default function UserSection() {
  const { animalName, evolutionStage, profileImage } = useContext(UserContext);

  return (
    <div className="user-section">
      <div className="user-section-image-wrapper">
        <Image
          src={`${API_STATIC_URL}${profileImage}`}
          alt="Zwierzak użytkownika"
          fill
          priority
          className="object-cover rounded-lg"
        />
      </div>
      <div className="profile-block user-section-content">
        <h1>{animalName}</h1>
        <h3>{evolutionStage}</h3>
      </div>
    </div>
  );
}

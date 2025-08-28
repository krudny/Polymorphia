import Image from "next/image";
import "./index.css";
import { API_STATIC_URL } from "@/services/api";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function UserSection() {
  const { animalName, evolutionStage, imageUrl } = useUserContext();

  return (
    <div className="user-section">
      <div className="user-section-image-wrapper">
        <Image
          src={`${API_STATIC_URL}/${imageUrl}`}
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

import Image from "next/image";
import "./index.css";
import { API_STATIC_URL } from "@/services/api";
import useUserContext from "@/hooks/contexts/useUserContext";
import isStudent, { RoleTextMap } from "@/interfaces/api/user";

export default function UserSection() {
  const userContext = useUserContext();

  const title = isStudent(userContext)
    ? userContext.userDetails.animalName
    : userContext.userDetails.userName;

  const subtitle = isStudent(userContext)
    ? userContext.userDetails.evolutionStage
    : RoleTextMap[userContext.userType];

  return (
    <div className="user-section">
      <div className="user-section-image-wrapper">
        <Image
          src={`${API_STATIC_URL}/${userContext.userDetails.imageUrl}`}
          alt="Zwierzak użytkownika"
          fill
          priority
          fetchPriority="high"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="profile-block user-section-content">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
}

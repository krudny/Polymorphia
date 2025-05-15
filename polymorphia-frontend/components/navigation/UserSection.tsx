import Image from "next/image";
import "../../styles/navigation.css"
import {API_STATIC_URL} from "@/services/api";

export default function UserSection() {
  return (
      <div className="user-section">
        <div className="profile-image user-section-image-wrapper">
          <Image
              src={`${API_STATIC_URL}/images/evolution-stages/4.jpg`}
              alt="Profil uzytkownika"
              fill
              priority
              className="object-cover rounded-lg"
          />
        </div>
        <div className="profile-block user-section-content">
          <h1>Gerard Małoduszny</h1>
          <h3>Majestatyczna Bestia</h3>
        </div>
      </div>
  )
}
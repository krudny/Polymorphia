import Image from "next/image";
import "../../styles/navigation.css"

export default function UserSection() {
  return (
      <div className="user-section">
        <div className="profile-image user-section-image-wrapper">
          <Image
              src="/4.jpg"
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
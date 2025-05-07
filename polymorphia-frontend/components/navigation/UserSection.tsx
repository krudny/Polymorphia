import Image from "next/image";
// import {GraduationCapIcon, TrophyIcon} from "lucide-react";

export default function UserSection() {
  return (
      <div className="flex justify-between gap-x-4 my-6 px-4">
        <div className="relative aspect-square min-w-[65px] max-w-[100px] profile-image">
          <Image
              src="/4.jpg"
              alt="Profil uzytkownika"
              fill
              priority
              className="object-cover rounded-lg"
          />
        </div>
        <div className="profile-block flex-col justify-center flex-1 flex-nowrap text-nowrap overflow-visible hidden">
          <h1 className="text-3xl">Gerard Małoduszny</h1>
          <h3 className="text-xl">Majestatyczna Bestia</h3>
          {/*<div className="flex items-center gap-x-4">*/}
          {/*  <div className="flex gap-x-1">*/}
          {/*    <GraduationCapIcon />*/}
          {/*    <h4 className="text-lg">76xp</h4>*/}
          {/*  </div>*/}
          {/*  <div className="flex gap-x-1">*/}
          {/*    <TrophyIcon />*/}
          {/*    <h4 className="text-lg">#128</h4>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
  )
}
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import {EventTypes, ViewTypes} from "@/interfaces/general";

export default function CourseGroupView(){
  return (
    <div>
    <div className="fixed right-5 bottom-5 mb-2 z-[20]">
      <SpeedDialMobile eventType={EventTypes.PROJECT} viewType={ViewTypes.COURSE_GROUP} />
    </div>
    <div className="m-auto w-[600px] flex-col-centered text-xl">
      Widok grupy
    </div>
    </div>
  )
}
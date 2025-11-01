"use client";

import SpeedDial from "@/components/speed-dial/SpeedDial";
import { SpeedDialKeys } from "@/components/speed-dial/types";

export default function CourseGroupView() {
  return (
    <div>
      <SpeedDial speedDialKey={SpeedDialKeys.COURSE_GROUP} />
      <div className="m-auto w-[600px] flex-col-centered text-xl">
        Widok grupy
      </div>
    </div>
  );
}

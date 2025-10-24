import { useMediaQuery } from "react-responsive";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import ColumnSchema from "@/components/column-schema";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import { useCourseGroupsStrategy } from "@/hooks/strategy/useCourseGroupsStrategy";

export default function CourseGroups() {
  const isXL = useMediaQuery({ minWidth: "1280px" });
  const isMd = useMediaQuery({ minWidth: "768px" });
  const components = useCourseGroupsStrategy();

  if (!components) {
    return null;
  }

  return (
    <>
      <SpeedDial speedDialKey={SpeedDialKeys.COURSE_GROUP} />
      <ColumnSchema columns={isXL ? 3 : isMd ? 2 : 1} components={components} />
    </>
  );
}

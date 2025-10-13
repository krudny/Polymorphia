import XPCard from "@/components/xp-card/XPCard";
import { RoleTextMap } from "@/interfaces/api/user";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { RenderCardProps } from "@/components/course-choice/types";
import { ReactNode } from "react";
import useHasAnimalInGroup from "@/hooks/course/useAnimal";
import useCourseGroup from "@/hooks/course/useCourseGroup";
import toast from "react-hot-toast";

export default function RenderCard({
  availableCourse,
  currentCourseId,
  handleCourseSelection,
  setClickedDetails,
}: RenderCardProps): ReactNode {
  const { id, name, coordinatorName, imageUrl, userRole } = availableCourse;
  const { data: animal } = useHasAnimalInGroup(id);
  const { data: courseGroup } = useCourseGroup(id);

  return (
    <XPCard
      title={name}
      subtitle={`Koordynator: ${coordinatorName}`}
      details={`Twoja rola: ${RoleTextMap[userRole]}`}
      key={id}
      color={
        currentCourseId != null && currentCourseId === id ? "green" : "silver"
      }
      size="sm"
      leftComponent={<XPCardImage imageUrl={imageUrl} alt={name} />}
      onClick={() => {
        if (!courseGroup) {
          toast.error("Student nie został przypisany do żadnej grupy");
        } else if (!animal && courseGroup) {
          setClickedDetails({
            courseId: id,
            courseGroupId: courseGroup.courseGroupId,
          });
        } else {
          handleCourseSelection(id);
        }
      }}
    />
  );
}

import XPCard from "@/components/xp-card/XPCard";
import { RoleTextMap } from "@/interfaces/api/user";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { RenderCardProps } from "@/components/course-choice/types";
import { ReactNode } from "react";
import useIsAnimalValid from "@/hooks/course/useAnimal";

export default function RenderCard({
  availableCourse,
  currentCourseId,
  handleCourseSelection,
  setClickedCourseId,
}: RenderCardProps): ReactNode {
  const { id, name, coordinatorName, imageUrl, userRole } = availableCourse;
  const { data: animal } = useIsAnimalValid(id);

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
        if (!animal) {
          setClickedCourseId(id);
        } else {
          handleCourseSelection(id);
        }
      }}
    />
  );
}

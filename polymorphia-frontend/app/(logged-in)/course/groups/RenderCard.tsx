import { CourseGroupsResponseDTO } from "@/interfaces/api/course";
import { ReactNode } from "react";
import XPCard from "@/components/xp-card/XPCard";
import XPCardText from "@/components/xp-card/components/XPCardText";

export default function RenderCard(
  courseGroup: CourseGroupsResponseDTO,
  handleClick: (id: number) => void
): ReactNode {
  return (
    <XPCard
      title={courseGroup.name.toUpperCase()}
      subtitle={courseGroup.details ?? ""}
      color="sky"
      rightComponent={
        <XPCardText
          topText={courseGroup.studentCount.toString()}
          bottomText="Studentów"
          color="gray"
        />
      }
      size="md"
      forceWidth={true}
      onClick={() => handleClick(courseGroup.id)}
    />
  );
}

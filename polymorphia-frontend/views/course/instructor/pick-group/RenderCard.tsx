import { ReactNode } from "react";
import XPCard from "@/components/xp-card/XPCard";
import { ProjectGroupResponseDTO } from "@/app/(logged-in)/course/EventSectionService";
import { API_STATIC_URL } from "@/services/api";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardDoubleImage from "@/components/xp-card/components/XPCardDoubleImage";

//TODO: napisac util dla splitu
export default function renderCard(
  projectGroup: ProjectGroupResponseDTO,
  handleClick: (id: number) => void
): ReactNode {
  const [firstPerson, secondPerson] = projectGroup.members.slice(0, 2);

  const firstPersonName = firstPerson
    ? `${firstPerson.studentName.split(" ")[0].charAt(0)}. ${firstPerson.studentName.split(" ").slice(1).join(" ")}`
    : "";
  const secondPersonName = secondPerson
    ? `${secondPerson.studentName.split(" ")[0].charAt(0)}. ${secondPerson.studentName.split(" ").slice(1).join(" ")}`
    : "";
  const title = [firstPersonName, secondPersonName]
    .filter((name) => name)
    .join(", ");

  const firstGroup = firstPerson?.group || "";
  const secondGroup = secondPerson?.group || "";
  const subtitle =
    firstGroup === secondGroup
      ? firstGroup
      : [firstGroup, secondGroup].join(", ");

  return (
    <XPCard
      title={title}
      subtitle={subtitle}
      image={{
        url: `${API_STATIC_URL}/${firstPerson.imageUrl}`,
        alt: firstPersonName,
      }}
      color={projectGroup.gainedXp !== undefined ? "green" : "silver"}
      leftComponent={
        <XPCardDoubleImage
          images={[
            {
              imageUrl: firstPerson.imageUrl,
              alt: firstPerson.evolutionStage,
            },
            {
              imageUrl: secondPerson.imageUrl,
              alt: secondPerson.evolutionStage,
            },
          ]}
        />
      }
      rightComponent={
        <XPCardPoints
          points={projectGroup.gainedXp.toString()}
          isSumLabelVisible={true}
        />
      }
      size="projectGroup"
      onClick={() => handleClick(projectGroup.id)}
    />
  );
}

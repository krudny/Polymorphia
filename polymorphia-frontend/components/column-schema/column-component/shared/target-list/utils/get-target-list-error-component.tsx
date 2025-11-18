import ErrorComponent from "@/components/error";
import { EventType, EventTypes } from "@/interfaces/general";

export function getTargetListErrorComponent(eventType: EventType) {
  const shortTargetString =
    eventType === EventTypes.PROJECT ? "grup" : "studentów";
  const longTargetString =
    eventType === EventTypes.PROJECT ? "grup projektowych" : "studentów";

  return (
    <ErrorComponent
      title={`Brak ${shortTargetString}!`}
      message={`Nie znaleziono ${longTargetString} pasujących do podanych kryteriów.`}
    />
  );
}

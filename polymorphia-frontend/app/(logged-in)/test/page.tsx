import CardGrid from "@/components/xp-card/CardGrid";
import { EventType } from "@/interfaces/api/course";

export default function test() {
  return (
    <div className="w-[calc(100dvw-24rem)] h-[calc(100dvh-5rem)] bg-orange-300 flex-col-centered m-auto">
      <CardGrid eventType={EventType.ASSIGNMENT} eventSectionId={2} />
    </div>
  );
}

import CardGrid from "@/components/xp-card/CardGrid";

export default function test() {
  return (
    <div className="w-[calc(100dvw-24rem)] h-[calc(100dvh-5rem)] bg-orange-300 flex-col-centered m-auto">
      <CardGrid eventSectionType="assignment" eventSectionId={2} />
    </div>
  );
}

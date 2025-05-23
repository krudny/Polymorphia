import { useScaleShow } from "@/animations/General";
import "../../../styles/general.css";
import CardGrid from "@/components/card/CardGrid";
import PointsSummary from "./points-summary/PointsSummary";
import PointsSummaryElement from "./points-summary/PointsSummaryElement";

export default function TestsSection() {
  const wrapperRef = useScaleShow();

  return <div ref={wrapperRef} className="basic-container flex flex-col md:flex-row md:justify-between gap-10">
    <CardGrid />
    <PointsSummary>
      <PointsSummaryElement title="Zdobyte xp" xp="20 xp" />
      <PointsSummaryElement title="Bonusy punktowe" xp="+2,0 xp" />
      <PointsSummaryElement title="Bonusy procentowe" xp="+2,2 xp" />
      <PointsSummaryElement title="Łącznie" xp="25,4 xp" />
    </PointsSummary>
  </div>
}

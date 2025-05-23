import { useScaleShow } from "@/animations/General";
import "../../../styles/general.css";

export default function TestsSection() {
  const wrapperRef = useScaleShow();
  
  return <div ref={wrapperRef} className="basic-container">
    Hi.
  </div>
}

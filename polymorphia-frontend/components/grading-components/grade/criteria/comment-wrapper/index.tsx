import { useFadeInAnimate } from "@/animations/FadeIn";
import Comment from "../../comment";
import "./index.css";

export default function CommentWrapper() {
  const wrapperRef = useFadeInAnimate();

  return (
    <div className="grade-comment-wrapper" ref={wrapperRef}>
      <Comment />
    </div>
  );
}

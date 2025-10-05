import { useFadeInAnimate } from "@/animations/FadeIn";
import Comment from "../../comment";

export default function CommentWrapper() {
  const wrapperRef = useFadeInAnimate();

  return (
    <div className="grade-comment-wrapper" ref={wrapperRef}>
      <Comment />
    </div>
  );
}

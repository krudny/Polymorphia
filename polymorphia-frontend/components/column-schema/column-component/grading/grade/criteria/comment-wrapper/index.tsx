import { useFadeInAnimate } from "@/animations/FadeIn";
import Comment from "@/components/column-schema/column-component/grading/grade/comment";
import "./index.css";
import { CommentWrapperProps } from "@/components/column-schema/column-component/grading/grade/criteria/comment-wrapper/types";

export default function CommentWrapper({ comment }: CommentWrapperProps) {
  const wrapperRef = useFadeInAnimate();

  return (
    <div className="grade-comment-wrapper" ref={wrapperRef}>
      <Comment comment={comment} />
    </div>
  );
}

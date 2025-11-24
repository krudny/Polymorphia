import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useRouter } from "next/navigation";
import { NotFoundContentProps } from "@/components/home/not-found-content/types";
import "../index.css";

export default function NotFoundContent({
  titleRef,
  title = "Ooops!",
  subtitle = "Nie znaleźliśmy strony, której szukasz.",
  actionLabel = "Strona główna",
  redirectTo,
}: NotFoundContentProps) {
  const router = useRouter();

  const handleClick = () => {
    if (redirectTo) {
      router.push(redirectTo);
    }
    router.push("/");
  };

  return (
    <div className="hero-right-wrapper">
      <div ref={titleRef} className="hero-error">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <ButtonWithBorder text={actionLabel} onClick={handleClick} />
      </div>
    </div>
  );
}

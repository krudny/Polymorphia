import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useRouter } from "next/navigation";
import { NotFoundContentProps } from "@/components/home/not-found-content/types";
import "../index.css";

export default function NotFoundContent({ titleRef }: NotFoundContentProps) {
  const router = useRouter();

  return (
    <div className="hero-right-wrapper">
      <div ref={titleRef} className="hero-error">
        <h1>Ooops!</h1>
        <h2>Nie znaleźliśmy strony, której szukasz.</h2>
        <ButtonWithBorder text="Powrót" onClick={() => router.back()} />
      </div>
    </div>
  );
}

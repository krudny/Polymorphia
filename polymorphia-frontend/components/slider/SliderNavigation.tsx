import Link from "next/link";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function SliderNavigation() {
  return (
      <div className="slider-navigation">
        <Link href="/faq/evolution-stages">
          <ButtonWithBorder text="Postacie" size="sm" />
        </Link>
        <Link href="/faq/items">
          <ButtonWithBorder text="Nagrody" size="sm" />
        </Link>
        <Link href="/faq/chests">
          <ButtonWithBorder text="Skrzynki" size="sm" />
        </Link>
      </div>
  )

}
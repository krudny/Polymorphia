"use client"

import Link from "next/link";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "../../styles/slider.css";
import { usePathname } from 'next/navigation'

export default function SliderNavigation() {
  const pathname = usePathname();

  return (
      <div className="slider-navigation">
        <Link href="/knowledge-base/evolution-stages">
          <ButtonWithBorder
              text="Postacie"
              size="sm"
              isActive={pathname === '/knowledge-base/evolution-stages'}
          />
        </Link>
        <Link href="/knowledge-base/items">
          <ButtonWithBorder
              text="Nagrody"
              size="sm"
              isActive={pathname === '/knowledge-base/items'}
          />
        </Link>
        <Link href="/knowledge-base/chests">
          <ButtonWithBorder
              text="Skrzynki"
              size="sm"
              isActive={pathname === '/knowledge-base/chests'}
          />
        </Link>
      </div>
  );
}
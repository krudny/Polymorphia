import { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavigationContext } from "@/components/navigation/NavigationContext";
import { MenuSectionProps } from "@/interfaces/navigation/NavigationInterfaces";
import {animateSubMenuSection} from "@/animations/Navigation";
import Link from "next/link";
import "../../styles/navigation.css"

export default function MenuSection({ options }: MenuSectionProps) {
  const { isExpanded } = useContext(NavigationContext);
  const [openSubMenu, setOpenSubMenu] = useState<string[]>([]);
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu((prev) =>
        prev.includes(text) ? [] : [text]
    );
  };

  useEffect(() => {
    if (!isExpanded) {
      setOpenSubMenu([]);
    }
  }, [isExpanded]);

  useEffect(() => {
    animateSubMenuSection(containerRefs.current, openSubMenu, isExpanded, options);
  }, [openSubMenu, isExpanded, options]);

  return (
      <div className="menu-section">
        {options.map((option, idx) => {
          const Icon = option.icon;
          const isOpen = openSubMenu.includes(option.text);

          return (
              <div key={option.text}>
                <Link href={`/${option?.link ?? ""}`} key={option.text}>
                <div
                    className="menu-section-options"
                    onClick={() => option.subItems && isExpanded && toggleSubMenu(option.text)}
                >
                    <Icon />
                    <h2>{option.text}</h2>
                  {option.subItems && isExpanded && (
                      <div
                          className="menu-section-subitems chevron-container"
                          data-menu-index={idx}
                      >
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </div>
                  )}
                </div>
                </Link>

                {option.subItems && (
                    <div
                        ref={(el) => {containerRefs.current[idx] = el}}
                        className="menu-section-subitems-wrapper"
                        style={{ height: 0 }}
                    >
                      {option.subItems.map((sub) => (
                          <Link href={`/${sub?.link ?? ""}`} key={sub.text}>
                            <h3 key={sub.text}>
                              {sub.text}
                            </h3>
                          </Link>
                      ))}
                    </div>
                )}
              </div>
          );
        })}
      </div>
  );
}

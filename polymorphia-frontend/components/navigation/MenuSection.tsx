import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MenuSectionProps } from "@/components/navigation/types";
import { animateSubMenuSection } from "@/animations/Navigation";
import Link from "next/link";
import "./index.css";
import useNavigationContext from "@/hooks/contexts/useNavigationContext";

export default function MenuSection({ options }: MenuSectionProps) {
  const { isSidebarExpanded, isNavbarExpanded, setIsNavbarExpanded } =
    useNavigationContext();
  const [openSubMenu, setOpenSubMenu] = useState<string[]>([]);
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu((prev) => (prev.includes(text) ? [] : [text]));
  };

  const isExpanded = isNavbarExpanded || isSidebarExpanded;

  useEffect(() => {
    if (!isNavbarExpanded && !isSidebarExpanded) {
      setOpenSubMenu([]);
    }
  }, [isNavbarExpanded, isSidebarExpanded]);

  useEffect(() => {
    animateSubMenuSection(
      containerRefs.current,
      openSubMenu,
      isExpanded,
      options
    );
  }, [openSubMenu, isExpanded, options]);

  return (
    <div className="menu-section">
      {options.map((option, idx) => {
        const Icon = option.icon;
        const isOpen = openSubMenu.includes(option.text);
        const hasNotifications =
          option.notificationCount && option.notificationCount > 0;

        const content = (
          <div className="menu-section-options-link-part">
            <Icon />
            <h2>{option.text}</h2>

            {hasNotifications && option.notificationCount && (
              <span className="menu-section-notification-badge" />
            )}
          </div>
        );

        return (
          <div key={option.text}>
            <div className="menu-option-row-wrapper">
              {option.link && (
                <Link href={`/${option.link}`} key={option.text}>
                  {content}
                </Link>
              )}

              {option.onClick && (
                <div
                  key={option.text}
                  onClick={() => {
                    if (option.onClick) {
                      option.onClick();
                    }
                  }}
                >
                  {content}
                </div>
              )}

              {option.subItems && isExpanded && (
                <div
                  className="menu-section-subitems chevron-container"
                  data-menu-index={idx}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSubMenu(option.text);
                  }}
                >
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
              )}
            </div>

            {option.subItems && (
              <div
                ref={(el) => {
                  containerRefs.current[idx] = el;
                }}
                className="menu-section-subitems-wrapper"
                style={{ height: 0 }}
              >
                {option.subItems.map((sub) => (
                  <Link
                    href={`/${sub?.link ?? ""}`}
                    key={sub.text}
                    onClick={() => setIsNavbarExpanded(false)}
                  >
                    <h3 key={sub.text}>{sub.text}</h3>
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

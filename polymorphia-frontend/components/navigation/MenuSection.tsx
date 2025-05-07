import { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavigationContext } from "@/components/navigation/NavigationContext";
import { MenuSectionProps } from "@/interfaces/navigation/NavigationInterfaces";
import {animateSubMenuSection} from "@/animations/Navigation";
import Link from "next/link";

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
      <div className="flex flex-col my-1 px-4">
        {options.map((option, idx) => {
          const Icon = option.icon;
          const isOpen = openSubMenu.includes(option.text);

          return (
              <div key={option.text}>
                <Link href={`/${option?.link ?? ""}`} key={option.text}>
                <div
                    className="w-fit flex items-center ml-2 my-4 min-h-9 lg:min-h-8 lg:my-3 lg:ml-4 hover:cursor-pointer"
                    onClick={() => option.subItems && isExpanded && toggleSubMenu(option.text)}
                >
                    <Icon size="1.75rem" className="hover:cursor-pointer" />
                    <h2
                        className="text-3xl lg:text-2xl ml-5 whitespace-nowrap hover:text-neutral-400 transition-colors ease-in duration-150 opacity-0"
                    >
                      {option.text}
                    </h2>
                  {option.subItems && isExpanded && (
                      <div
                          className="ml-2 hidden chevron-container"
                          data-menu-index={idx}
                      >
                        {isOpen ? <ChevronUp size="1.2rem" /> : <ChevronDown size="1.2rem" />}
                      </div>
                  )}
                </div>
                </Link>

                {option.subItems && (
                    <div
                        ref={(el) => {containerRefs.current[idx] = el}}
                        className="ml-18 lg:ml-20 flex flex-col gap-y-3 overflow-hidden"
                        style={{ height: 0 }}
                    >
                      {option.subItems.map((sub) => (
                          <Link href={`/${sub?.link ?? ""}`} key={sub.text}>
                            <h3
                                key={sub.text}
                                className="text-2xl lg:text-xl cursor-pointer hover:text-neutral-400 transition-colors ease-in duration-150"
                            >
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

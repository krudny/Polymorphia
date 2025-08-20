import { useEffect, useRef } from "react";
import { useAccordion } from "../providers/accordion/AccordionContext";
import { AccordionSectionProps } from "./types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { animateAccordion } from "@/animations/Accordion";

export default function AccordionSection({
  id,
  title,
  children,
  initiallyOpened,
}: AccordionSectionProps) {
  const { register, unregister, isOpen, toggle, open } = useAccordion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(id);
    if (initiallyOpened) {
      open(id);
    }
    return () => unregister(id);
  }, [id, initiallyOpened, open, register, unregister]);

  const opened = isOpen(id);
  useEffect(() => {
    if (contentRef.current) {
      animateAccordion(contentRef.current, opened);
    }
  }, [opened]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">{title}</h1>
        <div
          className="flex-centered cursor-pointer hover:opacity-70 transition-opacity select-none"
          onClick={() => toggle(id)}
        >
          {opened ? (
            <div className="flex-centered gap-x-1">
              <ArrowUp className="w-5 h-5 transition-transform duration-300" />
              <h2 className="text-2xl">Zamknij</h2>
            </div>
          ) : (
            <div className="flex-centered gap-x-1">
              <ArrowDown className="w-5 h-5 transition-transform duration-300" />
              <h2 className="text-2xl">Otwórz</h2>
            </div>
          )}
        </div>
      </div>
      <div ref={contentRef} className="overflow-hidden h-0">
        {children}
      </div>
    </div>
  );
}

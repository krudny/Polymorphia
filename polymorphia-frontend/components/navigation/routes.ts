import useEventSectionTitle from "@/hooks/title/useEventSectionTitle";
import { TitleRule } from "./types";
import useCourseGroupTitle from "@/hooks/title/useCourseGroupTitle";
import useGradableEventTitle from "@/hooks/title/useGradableEventTitle";

export const APPLICATION_ROUTES: TitleRule[] = [
  { pattern: /^\/settings$/, useTitleHook: () => "Ustawienia" },
  { pattern: /^\/roadmap$/, useTitleHook: () => "Roadmapa" },
  { pattern: /^\/profile$/, useTitleHook: () => "Profil" },
  { pattern: /^\/knowledge-base\/rules$/, useTitleHook: () => "Zasady" },
  {
    pattern: /^\/knowledge-base\/evolution-stages$/,
    useTitleHook: () => "Postacie",
  },
  { pattern: /^\/knowledge-base\/items$/, useTitleHook: () => "Przedmioty" },
  { pattern: /^\/knowledge-base\/chests$/, useTitleHook: () => "Skrzynki" },
  {
    pattern: /^\/hall-of-fame$/,
    useTitleHook: () => "Hall of Fame",
  },
  { pattern: /^\/equipment$/, useTitleHook: () => "Ekwipunek" },
  {
    pattern: /^\/course\/groups$/,
    useTitleHook: () => "Grupy zajęciowe",
  },
  {
    pattern: /^\/course\/groups\/(\d+)$/,
    useTitleHook: useCourseGroupTitle,
  },
  {
    pattern: /^\/course\/([a-zA-Z-]+)\/(\d+)$/,
    useTitleHook: useEventSectionTitle,
  },
  {
    pattern: /^\/course\/([a-zA-Z-]+)\/(\d+)\/(\d+)(?:\/grading)?$/,
    useTitleHook: useGradableEventTitle,
  },
];

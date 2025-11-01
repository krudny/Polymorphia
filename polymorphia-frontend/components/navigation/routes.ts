import { TitleRule } from "./types";
import useCourseGroupTitle from "@/hooks/title/course-group";

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
    pattern: /^\/knowledge-base\/hall-of-fame$/,
    useTitleHook: () => "Hall of Fame",
  },
  { pattern: /^\/knowledge-base\/equipment$/, useTitleHook: () => "Ekwipunek" },
  {
    pattern: /^\/course\/groups$/,
    useTitleHook: () => "Grupy zajęciowe",
  },
  {
    pattern: /^\/course\/groups\/(\d+)$/,
    useTitleHook: useCourseGroupTitle,
  },
];

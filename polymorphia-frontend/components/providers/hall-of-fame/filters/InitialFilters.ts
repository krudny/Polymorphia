import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const filters: HallOfFameFilter[] = [
  {
    id: "sort",
    name: "Sortowanie",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    options: [
      { label: "Rosnąco", value: "asc", isSelected: false },
      { label: "Malejąco", value: "desc", isSelected: true },
    ],
  },
  {
    id: "sortBy",
    name: "Sortowanie po kategorii",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    options: [
      {
        label: "Nazwa",
        value: "name",
        order: Number.NEGATIVE_INFINITY,
        isSelected: false,
      },
    ],
  },
  {
    id: "groups",
    name: "Grupy",
    isOpen: false,
    minSelections: 1,
    maxSelections: 100,
    options: [
      { label: "Wszystkie", value: "all", isSelected: true },
      { label: "MI-15-00", value: "mi-15-00", isSelected: false },
      { label: "BM-16-00", value: "bm-16-00", isSelected: false },
      { label: "BM-17-00", value: "bm-17-00", isSelected: false },
      { label: "BM-18-00", value: "bm-18-00", isSelected: false },
      { label: "BM-19-00", value: "bm-19-00", isSelected: false },
      { label: "BM-20-00", value: "bm-20-00", isSelected: false },
      { label: "BM-21-00", value: "bm-21-00", isSelected: false },
      { label: "BM-22-00", value: "bm-22-00", isSelected: false },
      { label: "BM-23-00", value: "bm-23-00", isSelected: false },
      { label: "BM-01-00", value: "bm-01-00", isSelected: false },
      { label: "BM-02-00", value: "bm-02-00", isSelected: false },
      { label: "BM-03-00", value: "bm-03-00", isSelected: false },
    ],
  },
  {
    id: "rankingOptions",
    name: "Wyświetlanie",
    isOpen: false,
    minSelections: 4,
    maxSelections: 4,
    options: [],
  },
];

import { useQuery, useQueryClient } from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import { createContext, ReactNode, useReducer, useState } from "react";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import {EventSectionService} from "@/services/course/event-section/EventSectionService";

export const filterCategories = [
  {
    id: "sort",
    name: "Sortowanie",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    selectedOptions: ["desc"],
    availableOptions: new Map([
      ["asc", "Rosnąco"],
      ["desc", "Malejąco"],
    ]),
  },
  {
    id: "sortBy",
    name: "Sortowanie po kategorii",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    selectedOptions: ["total"],
    availableOptions: new Map([
      ["name", "Nazwa"],
      ["Laboratoria", "Laboratoria"],
      ["Kartkówki", "Kartkówki"],
      ["Projekt", "Projekt"],
      ["Bonusy", "Bonusy"],
      ["total", "Suma"],
    ]),
  },
  {
    id: "groups",
    name: "Grupy",
    isOpen: false,
    minSelections: 1,
    maxSelections: 100,
    selectedOptions: ["all"],
    availableOptions: new Map([
      ["all", "Wszystkie"],
      ["mi-15-00", "MI-15-00"],
      ["bm-16-00", "BM-16-00"],
      ["bm-17-00", "BM-17-00"],
      ["bm-18-00", "BM-18-00"],
      ["bm-19-00", "BM-19-00"],
      ["bm-20-00", "BM-20-00"],
      ["bm-21-00", "BM-21-00"],
      ["bm-22-00", "BM-22-00"],
      ["bm-23-00", "BM-23-00"],
      ["bm-01-00", "BM-01-00"],
      ["bm-02-00", "BM-02-00"],
      ["bm-03-00", "BM-03-00"],
    ]),
  },
  {
    id: "rankingOptions",
    name: "Wyświetlanie",
    isOpen: false,
    minSelections: 4,
    maxSelections: 4,
    selectedOptions: ["Bonusy"],
    availableOptions: new Map([
      ["Bonusy", "Bonusy"],
    ]),
  },
];


export const initialFiltersState = {
  isModalOpen: false,
  categories: filterCategories,
};

export const HallOfFameContext = createContext({
  search: "",
  page: 0,
  setPage: (newPage: number) => {},
  data: [],
  setSearch: (newSearch: string) => {},
  isLoading: false,
  filtersState: initialFiltersState,
  appliedFiltersState: initialFiltersState,
  filtersDispatch: (action: any) => {},
  confirmButtonAction: () => {},
  hasUnappliedChanges: false,
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [filtersState, filtersDispatch] = useReducer(
    RankReducer,
    initialFiltersState
  );

  // Stan dla zatwierdzonych filtrów
  const [appliedFiltersState, setAppliedFiltersState] =
    useState(initialFiltersState);

  // Funkcja do pobierania parametrów z zatwierdzonych filtrów
  const getAppliedQueryParams = (state) => {
    const sortCategory = state.categories.find(
      (cat) => cat.id === "sort"
    );
    const sortByCategory = state.categories.find(
      (cat) => cat.id === "sortBy"
    );
    const groupsCategory = state.categories.find(
      (cat) => cat.id === "groups"
    );
    const rankingOptionsCategory = state.categories.find(
      (cat) => cat.id === "rankingOptions"
    );

    return {
      sortOrder: sortCategory?.selectedOptions[0] || "",
      sortBy: sortByCategory?.selectedOptions[0] || "",
      groups: groupsCategory?.selectedOptions || [],
      rankingOptions: rankingOptionsCategory?.selectedOptions || [],
    };
  };

  const appliedParams = getAppliedQueryParams(appliedFiltersState);
  const queryClient = useQueryClient();

  // Sprawdzanie czy są niezatwierdzone zmiany
  const hasUnappliedChanges =
    JSON.stringify(filtersState) !== JSON.stringify(appliedFiltersState);

  const confirmButtonAction = (): boolean => {
    // Sprawdź wszystkie kategorie
    for (const category of filtersState.categories) {
      const selectedCount = category.selectedOptions.length;

      if (
        selectedCount < category.minSelections ||
        selectedCount > category.maxSelections
      ) {
        const rangeText =
          category.minSelections === category.maxSelections
            ? category.minSelections
            : `od ${category.minSelections} do ${category.maxSelections}`;

        const optionText =
          category.maxSelections === 1
            ? "opcję"
            : category.maxSelections < 5
              ? "opcje"
              : "opcji";

        toast.error(
          `Musisz wybrać dla kategorii ${category.name.toLowerCase()} ${rangeText} ${optionText}.`
        );
        return false;
      }
    }

    setAppliedFiltersState({ ...filtersState });

    queryClient.invalidateQueries({
      queryKey: ["hallOfFame"],
    });
    setPage(0);

    return true;
  };

  // useQuery używa zatwierdzonych parametrów
  const { data = [], isLoading } = useQuery({
    queryKey: [
      "hallOfFame",
      page,
      size,
      debouncedSearch,
      appliedParams.sortBy,
      appliedParams.sortOrder,
      appliedParams.groups,
      appliedParams.rankingOptions,
    ],
    queryFn: () =>
      HallOfFameService.getHallOfFame(
        page,
        size,
        debouncedSearch,
        appliedParams.sortBy,
        appliedParams.sortOrder,
        appliedParams.groups,
        appliedParams.rankingOptions
      ),
  });

  const { data: eventSections, isSuccess } = useQuery({
    queryKey: ["eventSections"],
    queryFn: () => EventSectionService.getEventSections(1),
  });

  const rankingOptions = initialFiltersState.categories.find((cat) => cat.id === "rankingOptions");
  eventSections?.forEach((category) => {
    if (rankingOptions && category.name) {
      if (!rankingOptions.availableOptions.has(category.name)) {
        rankingOptions.availableOptions.set(category.name, category.name);
      }
    }
  });

  return (
    <HallOfFameContext.Provider
      value={{
        data,
        page,
        setPage,
        search,
        setSearch,
        isLoading,
        filtersState,
        appliedFiltersState,
        filtersDispatch,
        confirmButtonAction,
        hasUnappliedChanges,
      }}
    >
      {children}
    </HallOfFameContext.Provider>
  );
};

function RankReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };

    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
      };

    case "TOGGLE_SORT_ORDER":
      return {
        ...state,
        isSortedAsc: !state.isSortedAsc,
      };

    case "ADD_CATEGORY_SELECTION":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.categoryId) {
            if (category.minSelections === 1 && category.maxSelections === 1) {
              return { ...category, selectedOptions: [action.payload.value] };
            } else {
              if (category.selectedOptions.length < category.maxSelections) {
                if (action.payload.value === "all") {
                  return {
                    ...category,
                    selectedOptions: [action.payload.value],
                  };
                }
                return {
                  ...category,
                  selectedOptions: [
                    ...category.selectedOptions,
                    action.payload.value,
                  ].filter((item) => item != "all"),
                };
              } else {
                toast.error("Możesz zaznaczyć tylko " + category.maxSelections);
              }
            }
          }
          return category;
        }),
      };

    case "REMOVE_CATEGORY_SELECTION":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.categoryId) {
            const newSelections = category.selectedOptions.filter(
              (option) => option !== action.payload.value
            );

            return {
              ...category,
              selectedOptions: newSelections,
            };
          }
          return category;
        }),
      };

    case "TOGGLE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.categoryId) {
            return { ...category, isOpen: !category.isOpen };
          } else {
            return { ...category, isOpen: false };
          }
        }),
      };

    case "CLOSE_ALL_CATEGORIES":
      return {
        ...state,
        categories: state.categories.map((category) => {
          return { ...category, isOpen: false };
        }),
      };

    case "RESET_FILTERS":
      return {
        ...initialFiltersState,
        isModalOpen: state.isModalOpen, // Zachowaj stan modala
      };

    default:
      return state;
  }
}

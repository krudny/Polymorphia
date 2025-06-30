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
    availableOptions: [
      { label: "Rosnąco", value: "asc", priority: 0 },
      { label: "Malejąco", value: "desc", priority: 1 },
    ],
  },
  {
    id: "sortBy",
    name: "Sortowanie po kategorii",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    selectedOptions: ["total"],
    availableOptions: [
      { label: "Nazwa", value: "name", priority: Number.NEGATIVE_INFINITY },
      { label: "Bonusy", value: "Bonusy", priority: Number.POSITIVE_INFINITY - 1 },
      { label: "Suma", value: "total", priority: Number.POSITIVE_INFINITY },
    ],
  },
  {
    id: "groups",
    name: "Grupy",
    isOpen: false,
    minSelections: 1,
    maxSelections: 100,
    selectedOptions: ["all"],
    availableOptions: [
      { label: "Wszystkie", value: "all", priority: 0 },
      { label: "MI-15-00", value: "mi-15-00", priority: 1 },
      { label: "BM-16-00", value: "bm-16-00", priority: 2 },
      { label: "BM-17-00", value: "bm-17-00", priority: 3 },
      { label: "BM-18-00", value: "bm-18-00", priority: 4 },
      { label: "BM-19-00", value: "bm-19-00", priority: 5 },
      { label: "BM-20-00", value: "bm-20-00", priority: 6 },
      { label: "BM-21-00", value: "bm-21-00", priority: 7 },
      { label: "BM-22-00", value: "bm-22-00", priority: 8 },
      { label: "BM-23-00", value: "bm-23-00", priority: 9 },
      { label: "BM-01-00", value: "bm-01-00", priority: 10 },
      { label: "BM-02-00", value: "bm-02-00", priority: 11 },
      { label: "BM-03-00", value: "bm-03-00", priority: 12 },
    ],
  },
  {
    id: "rankingOptions",
    name: "Wyświetlanie",
    isOpen: false,
    minSelections: 4,
    maxSelections: 4,
    selectedOptions: ["Bonusy"],
    availableOptions: [
      { label: "Bonusy", value: "Bonusy", priority: Number.POSITIVE_INFINITY },
    ],
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
  getAllCategories: (state) => {},
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




  const [appliedFiltersState, setAppliedFiltersState] =
    useState(initialFiltersState);

  const getAllCategories = (state) => {
    return {
      sortCategory: state.categories.find((cat) => cat.id === "sort"),
      sortByCategory: state.categories.find((cat) => cat.id === "sortBy"),
      groupsCategory: state.categories.find((cat) => cat.id === "groups"),
      rankingOptionsCategory: state.categories.find((cat) => cat.id === "rankingOptions"),
    };
  };

  const {
    sortCategory,
    sortByCategory,
    groupsCategory,
    rankingOptionsCategory,
  } = getAllCategories(initialFiltersState);

  const getAppliedQueryParams = (state) => {
    const {
      sortCategory,
      sortByCategory,
      groupsCategory,
      rankingOptionsCategory,
    } = getAllCategories(state);

    return {
      sortOrder: sortCategory?.selectedOptions[0] || "",
      sortBy: sortByCategory?.selectedOptions[0] || "",
      groups: groupsCategory?.selectedOptions || [],
      rankingOptions: rankingOptionsCategory?.selectedOptions || [],
    };
  };

  const appliedParams = getAppliedQueryParams(appliedFiltersState);
  const queryClient = useQueryClient();

  const hasUnappliedChanges =
    JSON.stringify(filtersState) !== JSON.stringify(appliedFiltersState);

  const confirmButtonAction = (): boolean => {
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


  const addEventSections = (category) => {
    const existingValues = new Set(category.availableOptions.map(option => option.value));

    eventSections?.forEach((eventSection) => {
      if (!existingValues.has(eventSection.name)) {
        category.availableOptions.push({
          label: eventSection.name,
          value: eventSection.name,
          priority: eventSection.priority,
        });
        existingValues.add(eventSection.name);

      }
    });
  }

  addEventSections(sortByCategory)
  addEventSections(rankingOptionsCategory);

  console.log(filtersState);

  console.log("APPLIED", appliedFiltersState);

  filterCategories.forEach(category => {
    if (category.selectedOptions.length < category.maxSelections) {
      const notSelected = category.availableOptions
        .filter(opt => !category.selectedOptions.includes(opt.value))
        .sort((a, b) => a.priority - b.priority);

      const toAdd = Math.min(
        category.maxSelections - category.selectedOptions.length,
        notSelected.length
      );

      const optionsToAdd = notSelected.slice(0, toAdd).map(opt => opt.value);
      category.selectedOptions = [...category.selectedOptions, ...optionsToAdd];
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
        getAllCategories,
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

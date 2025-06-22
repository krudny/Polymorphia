import {useQuery} from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import {createContext, ReactNode, useEffect, useReducer, useState} from "react";
import Loading from "../general/Loading";
import toast from "react-hot-toast";

export const filterCategories = [
  {
    id: "sort",
    name: "Sortowanie",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    defaultSelected: ["Rosnąco"],
    selectedOptions: ["Rosnąco"],
    availableOptions: [
      { value: "asc", label: "Rosnąco" },
      { value: "desc", label: "Malejąco" },
    ]
  },
  {
    id: "sortBy",
    name: "Sortowanie po kategorii",
    isOpen: false,
    minSelections: 1,
    maxSelections: 1,
    defaultSelected: ["Suma"],
    selectedOptions: ["Suma"],
    availableOptions: [
      { value: "Suma", label: "Suma" },
      { value: "Laboratoria", label: "Laboratoria" },
      { value: "Kartkówki", label: "Kartkówki" },
      { value: "Projekt", label: "Projekt" },
      { value: "Bonusy", label: "Bonusy" },
    ]
  },
  {
    id: "groups",
    name: "Grupy",
    isOpen: false,
    minSelections: 1,
    maxSelections: null,
    defaultSelected: ["Wszystkie"],
    selectedOptions: ["Wszystkie"],
    availableOptions: [
      { value: "all", label: "Wszystkie" },
      { value: "mi-15-00", label: "MI-15-00" },
      { value: "bm-16-00", label: "BM-16-00" },
      { value: "bm-17-00", label: "BM-17-00" },
      { value: "bm-18-00", label: "BM-18-00" },
      { value: "bm-19-00", label: "BM-19-00" },
      { value: "bm-20-00", label: "BM-20-00" },
      { value: "bm-21-00", label: "BM-21-00" },
      { value: "bm-22-00", label: "BM-22-00" },
      { value: "bm-23-00", label: "BM-23-00" },
      { value: "bm-01-00", label: "BM-01-00" },
      { value: "bm-02-00", label: "BM-02-00" },
      { value: "bm-03-00", label: "BM-03-00" },
    ]
  },
  {
    id: "rankingOptions",
    name: "Wyświetlanie",
    isOpen: false,
    minSelections: 4,
    maxSelections: 4,
    defaultSelected: ["Laboratoria", "Kartkówki", "Projekt", "Bonusy"],
    selectedOptions: ["Laboratoria", "Kartkówki", "Projekt", "Bonusy"],
    availableOptions: [
      { value: "Laboratoria", label: "Laboratoria" },
      { value: "Laboratoria2", label: "Laboratoria2" },
      { value: "Kartkówki", label: "Kartkówki" },
      { value: "Projekt", label: "Projekt" },
      { value: "Bonusy", label: "Bonusy" },
    ]
  },

];

export const initialFiltersState = {
  isModalOpen: false,
  isSortedAsc: false,
  categories: filterCategories,
}

export const HallOfFameContext = createContext({
  search: "",
  page: 0,
  setPage: (newPage: number) => {},
  data: [],
  setSearch: (newSearch: string) => {},
  isLoading: false,
  filtersState: initialFiltersState,
  filtersDispatch: (action: any) => {},
  getCategoryData: (categoryId: string) => {},
});

export const HallOfFameProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filtersState, filtersDispatch] = useReducer(RankReducer, initialFiltersState)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["hallOfFame", page, size, debouncedSearch],
    queryFn: () => HallOfFameService.getHallOfFame(page, size, debouncedSearch),
  });

  useEffect(() => {
    console.log(data)
  }, [data]);

  const getCategoryData = (categoryId) => {
    return filtersState.categories.find(cat => cat.id === categoryId);
  };

  return (
    <HallOfFameContext.Provider value={{ data, page, setPage, search, setSearch, isLoading, filtersState, filtersDispatch, getCategoryData }}>
      {children}
    </HallOfFameContext.Provider>
  );
};

function RankReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };

      case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
      };

      case 'CLOSE_MODAL':
        return {
        ...state,
          isModalOpen: false,
        };

    case 'TOGGLE_SORT_ORDER':
      return {
        ...state,
        isSortedAsc: !state.isSortedAsc
      };

    case 'ADD_CATEGORY_SELECTION':
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category.id === action.payload.categoryId) {
            const newSelections = [...category.selectedOptions, action.payload.value];

            if (category.maxSelections && newSelections.length > category.maxSelections) {
              toast.error(`Nie możesz zaznaczyć więcej niż ${category.maxSelections} opcji!`);
              return category;
            }
            return { ...category, selectedOptions: newSelections };
          }
          return category;
        })
      };

    case 'REMOVE_CATEGORY_SELECTION':
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category.id === action.payload.categoryId) {
            const newSelections = category.selectedOptions.filter(
              option => option !== action.payload.value
            );

            if (category.minSelections && newSelections.length < category.minSelections) {
              toast.error(`Nie możesz zaznaczyć mniej niż ${category.minSelections} opcji!`);
              return category;
            }

            return {
              ...category,
              selectedOptions: newSelections
            };
          }
          return category;
        })
      };

    case 'TOGGLE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category.id === action.payload.categoryId) {
            return { ...category, isOpen: !category.isOpen };
          } else {
            return { ...category, isOpen: false };
          }
        })
      };

    case 'SET_CATEGORY_OPEN':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.categoryId
            ? { ...category, isOpen: action.payload.isOpen }
            : category
        )
      };

    case 'SET_SORT_ORDER':
      return {
        ...state,
        isSortedAsc: action.payload
      };

    case 'SET_SORTED_BY':
      return {
        ...state,
        sortedBy: action.payload
      };

    case 'TOGGLE_GROUPS':
      return {
        ...state,
        isGroupsOpen: !state.isGroupsOpen
      };

    case 'SET_GROUPS_OPEN':
      return {
        ...state,
        isGroupsOpen: action.payload
      };

    case 'SET_SELECTED_GROUPS':
      return {
        ...state,
        selectedGroups: action.payload
      };

    case 'ADD_GROUP':
      return {
        ...state,
        selectedGroups: [...state.selectedGroups, action.payload]
      };

    case 'REMOVE_GROUP':
      return {
        ...state,
        selectedGroups: state.selectedGroups.filter(group => group !== action.payload)
      };

    case 'TOGGLE_RANKING_OPTIONS':
      return {
        ...state,
        isRankingOptionsOpen: !state.isRankingOptionsOpen
      };

    case 'SET_RANKING_OPTIONS_OPEN':
      return {
        ...state,
        isRankingOptionsOpen: action.payload
      };

    case 'SET_SELECTED_RANKING_OPTIONS':
      return {
        ...state,
        selectedRankingOptions: action.payload
      };

    case 'ADD_RANKING_OPTION':
      return {
        ...state,
        selectedRankingOptions: [...state.selectedRankingOptions, action.payload]
      };

    case 'REMOVE_RANKING_OPTION':
      return {
        ...state,
        selectedRankingOptions: state.selectedRankingOptions.filter(
          option => option !== action.payload
        )
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        isModalOpen: false,
        isSortedAsc: false,
        sortedBy: "Suma",
        isGroupsOpen: false,
        selectedGroups: ["Wszystkie"],
        isRankingOptionsOpen: false,
        selectedRankingOptions: ["Laboratoria", "Kartkówki", "Projekt", "Bonusy"]
      };

    default:
      return state;
  }
}

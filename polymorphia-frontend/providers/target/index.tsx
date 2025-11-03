"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import {
  AppliedFiltersAdapter,
  TargetContextInterface,
  TargetProviderProps,
} from "@/providers/target/types";
import { initialState, TargetReducer } from "@/providers/target/reducer";
import useTargets from "@/hooks/course/useTargets";
import isSelectedTargetStillAvailable from "@/providers/target/utils/is-target-still-available";
import { TargetReducerActions } from "@/providers/target/reducer/types";
import {
  StudentTargetData,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/target";
import { useQueryClient } from "@tanstack/react-query";

export const TargetContext = createContext<TargetContextInterface | undefined>(
  undefined
);

export const TargetProvider = ({ children }: TargetProviderProps) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(TargetReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersAdapter>(
    {}
  );
  const { selectedTarget } = state;

  const targetId = selectedTarget
    ? selectedTarget.type === TargetTypes.STUDENT
      ? selectedTarget.id
      : selectedTarget.groupId
    : null;

  const applyFiltersCallback = useCallback((filters: AppliedFiltersAdapter) => {
    setAppliedFilters(filters);
    return filters;
  }, []);

  const { data: targets, isLoading: isTargetsLoading } = useTargets({
    ...appliedFilters,
    search: debouncedSearch,
  });

  const handleApplyFilters = () => {
    queryClient.invalidateQueries({
      queryKey: ["targets"],
    });
  };

  useEffect(() => {
    if (!targets || targets.length < 1) {
      return;
    }

    const isSelectedTargetInNewTargets = isSelectedTargetStillAvailable(
      targets,
      state.selectedTarget
    );

    if (!isSelectedTargetInNewTargets) {
      dispatch({
        type: TargetReducerActions.HANDLE_STUDENT_SELECTION,
        payload: {
          target: targets[0],
          member:
            targets[0].type === TargetTypes.STUDENT
              ? targets[0]
              : targets[0].members[0],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targets]);

  const onTargetSelect = (
    target: TargetResponseDTO,
    member: StudentTargetData
  ) => {
    dispatch({
      type: TargetReducerActions.HANDLE_STUDENT_SELECTION,
      payload: {
        target,
        member,
      },
    });
  };

  return (
    <TargetContext.Provider
      value={{
        state,
        dispatch,
        selectedTarget,
        search,
        setSearch,
        areFiltersOpen,
        setAreFiltersOpen,
        targets,
        isTargetsLoading,
        onTargetSelect,
        handleApplyFilters,
        applyFiltersCallback,
        targetId,
      }}
    >
      {children}
    </TargetContext.Provider>
  );
};

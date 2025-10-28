"use client";

import { createContext, useEffect, useReducer, useState } from "react";
import { useDebounce } from "use-debounce";
import {
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

export const TargetContext = createContext<TargetContextInterface | undefined>(
  undefined
);

export const TargetProvider = ({
  children,
  targetsParams = {},
}: TargetProviderProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(TargetReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const { data: targets, isLoading: isTargetsLoading } = useTargets({
    ...targetsParams,
    search: debouncedSearch,
  });

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
        search,
        setSearch,
        areFiltersOpen,
        setAreFiltersOpen,
        targets,
        isTargetsLoading,
        onTargetSelect,
      }}
    >
      {children}
    </TargetContext.Provider>
  );
};

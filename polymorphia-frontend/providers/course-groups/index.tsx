"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useEventParams } from "@/hooks/general/useEventParams";
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import {
  GradingReducer,
  initialState,
} from "@/providers/grading/gradingReducer";
import useGradingTargets from "@/hooks/course/useGradingTargets";
import useShortGrade from "@/hooks/course/useShortGrade";
import { getRequestTargetFromResponseTarget } from "@/providers/grading/utils/getRequestTargetFromResponseTarget";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import isSelectedTargetStillAvailable from "@/providers/grading/utils/isSelectedTargetStillAvailable";
import { TargetTypes } from "@/interfaces/api/grade/target";
import useSubmissionDetails from "@/hooks/course/useSubmissionDetails";
import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";
import useSubmissionsUpdate from "@/hooks/course/useSubmissionsUpdate";
import useSubmissionRequirements from "@/hooks/course/useSubmissionRequirements";
import useCriteria from "@/hooks/course/useCriteria";
import CourseGroups from "@/services/course-groups";
import { CourseGroupsContextInterface } from "@/providers/course-groups/types";

export const CourseGroupsContext = createContext<
  CourseGroupsContextInterface | undefined
>(undefined);

export const CourseGroupsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CourseGroupsContext.Provider value={{}}>
      {children}
    </CourseGroupsContext.Provider>
  );
};

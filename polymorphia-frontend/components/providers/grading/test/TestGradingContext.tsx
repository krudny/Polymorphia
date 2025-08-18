"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import { UserDetailsDTO } from "@/interfaces/api/user";
import { GradeResponseDTO } from "@/interfaces/api/grade";
import { useEventParams } from "@/shared/params/useSeachParams";

export type TestGradingContextType = {
  search: string;
  setSearch: (search: string) => void;
  selectedStudent: UserDetailsDTO | null;
  setSelectedStudent: (student: UserDetailsDTO | null) => void;
  studentList: (UserDetailsDTO & { gainedXp?: string })[];
  grade: GradeResponseDTO;
  setGrade: (grade: GradeResponseDTO) => void;
};

export const TestGradingContext = createContext<
  TestGradingContextType | undefined
>(undefined);

// TODO: loading
export const TestGradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [selectedStudent, setSelectedStudent] = useState<UserDetailsDTO | null>(
    null
  );
  const [grade, setGrade] = useState<GradeResponseDTO | undefined>(undefined);

  const { data: studentList, isLoading } = useQuery({
    queryKey: ["allUsers", debouncedSearch],
    queryFn: () =>
      EventSectionService.getRandomPeopleWithPoints(debouncedSearch),
  });

  // TODO: !
  const { data: gradeResponse } = useQuery({
    queryKey: ["grade"],
    queryFn: () =>
      EventSectionService.getGrade2(selectedStudent!.id, gradableEventId),
  });

  useEffect(() => {
    if (studentList && studentList.length > 0) {
      setSelectedStudent(studentList[0]);
    }
  }, [studentList]);

  useEffect(() => {
    if (gradeResponse) {
      setGrade(gradeResponse);
    }
  }, [gradeResponse]);

  if (isLoading || !studentList || !grade) {
    return <Loading />;
  }

  return (
    <TestGradingContext.Provider
      value={{
        search,
        setSearch,
        selectedStudent,
        setSelectedStudent,
        studentList,
        grade,
        setGrade,
      }}
    >
      {children}
    </TestGradingContext.Provider>
  );
};

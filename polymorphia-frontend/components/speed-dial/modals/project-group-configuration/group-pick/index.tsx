import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import Loading from "@/components/loading";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCard from "@/components/xp-card/XPCard";
import useProjectGroupConfigurationContext from "@/hooks/contexts/useProjectGroupConfigurationContext";
import { useProjectGroupConfigurationGroupPickStudents } from "@/hooks/course/useProjectGroupConfigurationGroupPickStudents";
import { ProjectGroupConfigurationSteps } from "@/providers/project-group-configuration/types";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import "./index.css";
import Search from "@/components/search";
import { useMediaQuery } from "react-responsive";

export default function ProjectGroupPick() {
  const {
    initialTarget,
    currentProjectGroupConfiguration,
    setCurrentProjectGroupConfiguration,
    setCurrentStep,
    filters,
    setAreFiltersOpen,
  } = useProjectGroupConfigurationContext();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });
  const buttonVariant = isLg ? "md" : isMd ? "base" : "sm";

  const groups = useMemo(
    () => filters.getAppliedFilterValues("groups"),
    [filters]
  );

  const {
    data: studentsForGroupPick,
    isLoading: isStudentsForGroupPickLoading,
    isError: isStudentsForGroupPickError,
  } = useProjectGroupConfigurationGroupPickStudents({
    target: initialTarget,
    groups,
  });

  useEffect(() => {
    if (
      !studentsForGroupPick ||
      isStudentsForGroupPickLoading ||
      isStudentsForGroupPickError
    ) {
      return;
    }

    setCurrentProjectGroupConfiguration((previousConfiguration) => ({
      ...previousConfiguration,
      studentIds: previousConfiguration.studentIds.filter((studentId) =>
        studentsForGroupPick.some(({ id }) => studentId === id)
      ),
    }));
  }, [
    isStudentsForGroupPickError,
    isStudentsForGroupPickLoading,
    setCurrentProjectGroupConfiguration,
    studentsForGroupPick,
  ]);

  const handleStudentSelection = (selectedStudentId: number) => {
    setCurrentProjectGroupConfiguration((previousConfiguration) => ({
      ...previousConfiguration,
      studentIds: previousConfiguration.studentIds.some(
        (studentId) => selectedStudentId === studentId
      )
        ? previousConfiguration.studentIds
        : [...previousConfiguration.studentIds, selectedStudentId],
    }));
  };

  const handleStudentDeselection = (deselectedStudentId: number) => {
    setCurrentProjectGroupConfiguration((previousConfiguration) => ({
      ...previousConfiguration,
      studentIds: previousConfiguration.studentIds.filter(
        (studentId) => studentId !== deselectedStudentId
      ),
    }));
  };

  const handleSubmit = () => {
    if (selectedStudents.length < 1) {
      return;
    }

    setCurrentStep(ProjectGroupConfigurationSteps.VARIANT_PICK);
  };

  if (isStudentsForGroupPickLoading) {
    return (
      <div className="relative">
        <Loading />
      </div>
    );
  } else if (
    isStudentsForGroupPickError ||
    studentsForGroupPick === undefined
  ) {
    return (
      <ErrorComponent
        message="Nie udało się załadować studentów."
        size={ErrorComponentSizes.COMPACT}
      />
    );
  }

  let selectableStudents = studentsForGroupPick.filter(({ id }) =>
    currentProjectGroupConfiguration.studentIds.every(
      (studentId) => id !== studentId
    )
  );

  if (debouncedSearch !== "") {
    selectableStudents = selectableStudents.filter(
      ({ fullName }) =>
        fullName.toLowerCase().indexOf(debouncedSearch.toLowerCase()) !== -1
    );
  }

  const selectedStudents = studentsForGroupPick.filter(({ id }) =>
    currentProjectGroupConfiguration.studentIds.some(
      (studentId) => id === studentId
    )
  );

  return (
    <div className="flex-col w-full">
      <div onSubmit={(event) => event.preventDefault()}>
        <div className="group-pick-wrapper">
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Znajdź studenta..."
          />
          <div className="flex gap-x-2 lg:gap-x-4">
            <ButtonWithBorder
              text="Filtry"
              className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
              size={buttonVariant}
              onClick={() => setAreFiltersOpen(true)}
            />
          </div>
        </div>
        <div className="group-pick-search">
          {selectableStudents.length > 0 ? (
            selectableStudents.map((student, index) => {
              const { id, fullName, evolutionStage, group, imageUrl } = student;
              return (
                <div key={index} className="group-pick-card">
                  <XPCard
                    title={fullName}
                    subtitle={group + " | " + evolutionStage}
                    leftComponent={
                      <XPCardImage imageUrl={imageUrl} alt={evolutionStage} />
                    }
                    size="xs"
                    onClick={() => handleStudentSelection(id)}
                  />
                </div>
              );
            })
          ) : (
            <ErrorComponent
              title="Brak studentów"
              message="Brak studentów możliwych do przypisania."
              size={ErrorComponentSizes.COMPACT}
            />
          )}
        </div>
      </div>
      <h3 className="group-pick-text">Skład grupy</h3>
      <div className="group-pick-group">
        {selectedStudents.length > 0 ? (
          selectedStudents.map((student, index) => {
            const { id, fullName, evolutionStage, group, imageUrl } = student;

            return (
              <div key={index} className="group-pick-card">
                <XPCard
                  title={fullName}
                  subtitle={group + " | " + evolutionStage}
                  leftComponent={
                    <XPCardImage imageUrl={imageUrl} alt={evolutionStage} />
                  }
                  size="xs"
                  onClick={() => handleStudentDeselection(id)}
                />
              </div>
            );
          })
        ) : (
          <ErrorComponent
            title="Brak studentów"
            message="Brak studentów przypisanych do grupy."
            size={ErrorComponentSizes.COMPACT}
          />
        )}
      </div>
      <div className="group-pick-button">
        <ButtonWithBorder
          text="Dalej"
          className="w-full rounded-xl"
          isActive={selectedStudents.length > 0}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

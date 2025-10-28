import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import "./index.css";
import { Fragment } from "react";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import {
  StudentTargetData,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/target";
import areTargetsEqual from "@/providers/target/utils/are-targets-equal";
import TargetListTopBar from "@/components/column-schema/column-component/shared/target-list/top-bar";
import Loading from "@/components/loading";
import ColumnComponent from "@/components/column-schema/column-component";

export default function TargetList() {
  const {
    state,
    search,
    setSearch,
    setAreFiltersOpen,
    targets,
    isTargetsLoading,
    onTargetSelect,
  } = useTargetContext();

  const { selectedTarget } = state;

  const isTargetSelected = (
    target: TargetResponseDTO,
    student: StudentTargetData
  ): boolean => {
    if (!selectedTarget) {
      return false;
    }

    const isTargetMatchingSelectedTarget = areTargetsEqual(
      selectedTarget,
      target
    );

    const isStudentSelectedFromGroup =
      selectedTarget?.type === TargetTypes.STUDENT &&
      selectedTarget.id === student.id;

    return isTargetMatchingSelectedTarget || isStudentSelectedFromGroup;
  };

  const getCardColor = (
    isSelected: boolean,
    gainedXp?: string
  ): "green" | "sky" | "gray" => {
    return isSelected ? (gainedXp ? "green" : "sky") : "gray";
  };

  const topComponent = () => (
    <TargetListTopBar
      search={search}
      setSearch={setSearch}
      setAreFiltersOpen={setAreFiltersOpen}
    />
  );

  const mainComponent =
    isTargetsLoading || !targets
      ? () => (
          <div className="target-list-loading">
            <Loading />
          </div>
        )
      : () => (
          <div className="group-list custom-scrollbar">
            {targets.map((target, targetIndex) => (
              <Fragment key={targetIndex}>
                <div className="group-record">
                  {(target.type === TargetTypes.STUDENT
                    ? [target]
                    : target.members
                  ).map((student, studentIndex) => {
                    const isSelected = isTargetSelected(target, student);
                    const color = getCardColor(isSelected, student.gainedXp);

                    const handleSelection = () => {
                      onTargetSelect(target, student);
                    };

                    return (
                      <XPCard
                        key={studentIndex}
                        title={student.fullName}
                        color={color}
                        subtitle={student.group}
                        size="xs"
                        leftComponent={
                          <XPCardImage
                            imageUrl={student.imageUrl}
                            alt={student.evolutionStage}
                          />
                        }
                        rightComponent={
                          <XPCardPoints
                            points={student.gainedXp}
                            color={color}
                            isSumLabelVisible={true}
                            isXPLabelVisible={!!student.gainedXp}
                          />
                        }
                        onClick={handleSelection}
                      />
                    );
                  })}
                </div>
                {target.type === TargetTypes.STUDENT_GROUP && (
                  <div className="divider"></div>
                )}
              </Fragment>
            ))}
          </div>
        );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}

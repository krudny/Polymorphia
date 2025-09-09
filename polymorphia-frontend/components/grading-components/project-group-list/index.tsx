import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import { StudentDetailsDTOWithType } from "@/interfaces/api/user";
import Loading from "@/components/loading/Loading";
import { GradingReducerActions } from "@/providers/grading/GradingContext";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

export default function ProjectGroupList() {
  const isMd = useMediaQuery({ minWidth: "786px" });
  const {
    state,
    dispatch,
    search,
    setSearch,
    projectGroups,
    isProjectGroupsLoading,
    setAreFiltersOpen,
  } = useGradingContext();

  if (isProjectGroupsLoading || !projectGroups) {
    return <Loading />;
  }

  const topComponent = (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Szukaj studenta..."
      />
      <ButtonWithBorder
        text="Filtry"
        size={isMd ? "md" : "sm"}
        className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none !h-full"
        onClick={() => setAreFiltersOpen(true)}
      />
    </>
  );

  const mainComponent = () => (
    <div className="group-list">
      {projectGroups.map((group, index: number) => (
        <Fragment key={index}>
          <div
            key={index + group.id}
            className="group-record"
            onClick={() =>
              dispatch({
                type: GradingReducerActions.SET_TARGET,
                payload: [...group.members],
              })
            }
          >
            {group.members.map(
              (
                student: StudentDetailsDTOWithType & { gainedXp?: string },
                index: number
              ) => {
                const color = state.selectedTarget?.includes(student)
                  ? "sky"
                  : student.gainedXp
                    ? "green"
                    : "gray";
                const { userName, group, imageUrl, evolutionStage } =
                  student.userDetails;

                return (
                  <XPCard
                    key={index}
                    title={
                      userName ? userName : toast.error("No username found!")
                    }
                    color={color}
                    subtitle={group}
                    size={"xs"}
                    leftComponent={
                      <XPCardImage imageUrl={imageUrl} alt={evolutionStage} />
                    }
                    rightComponent={
                      <XPCardPoints
                        points={student.gainedXp}
                        color={color}
                        isSumLabelVisible={true}
                        isXPLabelVisible={!!student.gainedXp}
                      />
                    }
                  />
                );
              }
            )}
          </div>
          <div key={index} className="divider"></div>
        </Fragment>
      ))}
    </div>
  );

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}

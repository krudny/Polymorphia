import { Fragment, JSX } from "react";
import Loading from "@/components/loading";
import useStudentChests from "@/hooks/course/useStudentChests";
import EquipmentChest from "@/components/equipment/components/chest";

const USER_ID = 1;

export default function ChestSummary(): JSX.Element {
  const { data: chests, isLoading } = useStudentChests(USER_ID);

  if (isLoading || !chests) {
    return <Loading />;
  }

  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {chests.map((chest) => (
        <Fragment key={chest.base.id}>
          <EquipmentChest chestData={chest} showBadge={true} />
        </Fragment>
      ))}
    </div>
  );
}

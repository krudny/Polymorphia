"use client";

import useEquipment from "@/hooks/course/equipment/useEquipment";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import EquipmentModals from "@/components/equipment/modals";
import { useScaleShow } from "@/animations/ScaleShow";
import { EquipmentSection } from "@/views/equipment/section";
import { EquipmentSectionTypes } from "@/views/equipment/section/types";
import "./index.css";

export default function EquipmentView() {
  const { items, chests, isLoading } = useEquipment();
  const wrapperRef = useScaleShow();

  if (isLoading) {
    return <Loading />;
  }

  if (!items || !chests) {
    return <ErrorComponent message="Nie udało się załadować ekwipunku." />;
  }

  const columns = Math.max(
    Math.min(items.length, 4),
    Math.min(chests.length, 4)
  );

  return (
    <div className="equipment">
      <div ref={wrapperRef}>
        <EquipmentSection
          type={EquipmentSectionTypes.ITEM}
          data={items}
          columns={columns}
        />
        <EquipmentSection
          type={EquipmentSectionTypes.CHEST}
          data={chests}
          columns={columns}
        />
      </div>
      <EquipmentModals />
    </div>
  );
}

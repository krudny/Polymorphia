"use client";

import ColumnComponent from "@/components/column-schema/column-component";

export default function EquipmentSummary() {
  const topComponent = () => <h1>Ekwipunek</h1>;
  const mainComponent = () => <div>Content</div>;

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}

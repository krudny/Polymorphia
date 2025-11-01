import {
  ColumnComponent,
  ColumnSchemaProps,
} from "@/components/column-schema/types";

export const getDistributedColumns = ({
  columns,
  components,
}: ColumnSchemaProps): ColumnComponent[][] => {
  if (columns === 1) {
    return [components.flat()];
  }

  if (components.length <= columns) {
    return [...components, ...Array(columns - components.length).fill([])];
  }

  const flatComponents: ColumnComponent[] = components.flat();
  const columnData: ColumnComponent[][] = Array.from(
    { length: columns },
    () => []
  );
  let currentColumn = 0;
  const remainingComponents: ColumnComponent[] = [];

  for (const component of flatComponents) {
    if (component.forceFullHeight) {
      while (
        currentColumn < columns &&
        columnData[currentColumn].length > 0 &&
        columnData[currentColumn][0].forceFullHeight
      ) {
        currentColumn++;
      }

      if (currentColumn < columns) {
        columnData[currentColumn] = [component];
        currentColumn++;
      } else {
        remainingComponents.push(component);
      }
    } else {
      while (
        currentColumn < columns &&
        columnData[currentColumn].length > 0 &&
        columnData[currentColumn][0].forceFullHeight
      ) {
        currentColumn++;
      }

      if (currentColumn < columns) {
        columnData[currentColumn].push(component);
        currentColumn = (currentColumn + 1) % columns;
      } else {
        remainingComponents.push(component);
      }
    }
  }

  if (remainingComponents.length > 0) {
    columnData[columns - 1].push(...remainingComponents);
  }

  return columnData;
};

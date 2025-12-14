import "./index.css";

const gridColsMap: Record<number, string> = {
  1: "grid-cols-1 sm:grid-cols-1",
  2: "grid-cols-2 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const maxWidthMap: Record<number, string> = {
  1: "max-w-[15rem]",
  2: "max-w-[30rem]",
  3: "max-w-[45rem]",
  4: "max-w-[60rem]",
};

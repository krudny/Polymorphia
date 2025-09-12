import { Dispatch, SetStateAction } from "react";

export const handlePageChange = (setPage: Dispatch<SetStateAction<number>>) => {
  return ({ selected }: { selected: number }) => {
    setPage(selected);
  };
};

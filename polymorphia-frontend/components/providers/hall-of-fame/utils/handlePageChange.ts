export const handlePageChange = (
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  return ({ selected }: { selected: number }) => {
    setPage(selected);
  };
};

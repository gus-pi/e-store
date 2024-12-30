const SortArrow = ({
  column,
  sortColumn,
  orderBy,
}: {
  column: string;
  sortColumn: string;
  orderBy: string;
}) => {
  if (column !== sortColumn) {
    return null;
  }

  if (orderBy === 'asc') {
    return <i className="bi bi-arrow-up-short"></i>;
  }

  return <i className="bi bi-arrow-down-short"></i>;
};

export default SortArrow;

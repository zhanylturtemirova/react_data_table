import { ChangeEvent, useCallback, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import "./styles.scss";

interface Column {
  title: string;
  field: string;
}
interface Props {
  data: any;
  columns: Column[];
  searchField: Column;
}
enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
const className = "DataTable";

const DataTable: React.FC<Props> = ({ data, columns, searchField }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC);
  const [searchTerm, SetSearchTerm] = useState("");
  let results = data;

  const totalPages = Math.ceil(results.length / rowsPerPage);
  const startPoint = (currentPage - 1) * rowsPerPage;
  const endPoint = currentPage * rowsPerPage;
  results = results.slice(startPoint, endPoint);
  if (sortColumn !== "") {
    results.sort((firtsRow: typeof columns, otherColumn: typeof columns) => {
      return firtsRow.toString().localeCompare(otherColumn.toString());
    });
    if (sortOrder === SortOrder.DESC) {
      results = results.reverse();
    }
  }
  if (searchTerm !== "") {
    results = data.filter((dataRow: Column) => {
      return dataRow[searchField.field as keyof typeof dataRow]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }
  const handleRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(e.target.value as unknown as number);
    },
    [rowsPerPage]
  );

  const handlePrevButtonClick = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, totalPages]);

  const handleNextButtonClick = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handleSortOrderChange = useCallback(
    (field: string) => {
      console.log("field", field, sortColumn);

      setSortColumn(field);
      if (sortOrder === SortOrder.ASC) {
        setSortOrder(SortOrder.DESC);
      } else {
        setSortOrder(SortOrder.ASC);
      }
    },
    [sortOrder, sortColumn]
  );
  const handleSearch = useCallback(
    (e: Event) => {
      const { target } = e;
      if (target) {
        SetSearchTerm((target as HTMLButtonElement).value);
      }
    },
    [searchTerm]
  );

  return (
    <div className={className}>
      <input
        type="text"
        className={`${className}__search_bar`}
        placeholder={`Type ${searchField.title} to search`}
        onKeyUp={(e) => {
          handleSearch(e as unknown as Event);
        }}
      />
      <table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={`${column.title}_${i}`}>
                <button onClick={() => handleSortOrderChange(column.field)}>
                  {column.title}
                  {sortOrder === SortOrder.ASC ? (
                    <AiOutlineArrowUp />
                  ) : (
                    <AiOutlineArrowDown />
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!!results &&
            results.map(
              (dataRow: any, i: string) =>
                !!dataRow && (
                  <tr key={`${dataRow}_${i}`}>
                    {columns.map((column, i) => (
                      <td key={`${column.field}_${i}`}>
                        {dataRow[column.field]}
                      </td>
                    ))}
                  </tr>
                )
            )}
        </tbody>
      </table>
      <footer>
        <label htmlFor="rows_per_page">
          Choose number of rows per page:
          <select
            name="rows_per_page"
            id="rows_per_page"
            onChange={(e) => handleRowsPerPageChange(e)}
          >
            {Array(26)
              .fill(0)
              .map((_, n) => (
                <option
                  key={`${n}`}
                  value={n + 5}
                  selected={n + 5 === rowsPerPage}
                >
                  {n + 5}
                </option>
              ))}
            <option value=""></option>
          </select>
        </label>
        <div>Current page : {currentPage}</div>
        <div className="pagination">
          <button onClick={handlePrevButtonClick}>
            <AiOutlineArrowLeft />
          </button>
          <button onClick={handleNextButtonClick}>
            <AiOutlineArrowRight />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DataTable;

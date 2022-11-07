import React from "react";
import { useTable } from "react-table";
import styles from "./BasicTable.module.css";

export const BasicTable = ({ columns, data, pagination, url }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return data.length > 0 ? (
    <div className={styles.basicTable}>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i, arr) => {
            return (
              <tr
                className={styles.tr}
                key={i + arr[i + 2]}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      className={styles.th}
                      key={column.id ? column.id : column.Header}
                      {...column.getHeaderProps(column.getSortByToggleProps)}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "🔽"
                            : "🔼"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i, arr) => {
            prepareRow(row);
            return (
              <tr
                className={styles.tr}
                key={row.id ? row.id : i + arr[i + 2]}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  // console.log(cell);
                  return (
                    <td
                    data-label={cell.column.Header}
                      className={styles.td}
                      key={cell.column.id}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <p>Malumotlar yoq</p>
  );
};

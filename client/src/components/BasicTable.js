import React from "react";
import { useTable } from "react-table";
import styles from "./BasicTable.module.css"
export const BasicTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return data.length > 0 ? (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={styles.th} {...column.getHeaderProps(column.getSortByToggleProps)}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className={styles.tr} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td className={styles.td} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>Malumotlar yoq</p>
  );
};
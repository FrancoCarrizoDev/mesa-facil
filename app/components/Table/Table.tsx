"use client";
import React from "react";

interface TableProps {
  readonly columns: string[];
  readonly data: (string | number | JSX.Element)[][];
}

export default function Table({ columns, data }: TableProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column} className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            return (
              <tr
                className="odd:bg-white  even:bg-gray-50 "
                key={`table-${row.toString() + i}`}
              >
                {row.map((cell, i) => (
                  <th
                    key={`cell-${cell.toString() + i}`}
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

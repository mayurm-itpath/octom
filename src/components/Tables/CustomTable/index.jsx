import React from "react";

const CustomTable = ({ data = [], columns = [] }) => {
  return (
    <>
      <table className="border border-black border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} className="border border-black py-2 px-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.id} className="border border-black py-2 px-3">
                  {column.render
                    ? column.render({ item })
                    : item[column.fieldName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;

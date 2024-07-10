import React from "react";
import { useTable } from "react-table";

const CharacterTable = ({ characters, onRowClick }) => {
  // CharacterTable adlı fonksiyonel bileşen tanımlandı. characters ve onRowClick prop'ları destructure edildi.
  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" }, // Tablo başlığı ve karakter özelliği (name) eşleştirildi.
      { Header: "Status", accessor: "status" }, // Tablo başlığı ve karakter özelliği (status) eşleştirildi.
      { Header: "Species", accessor: "species" }, // Tablo başlığı ve karakter özelliği (species) eşleştirildi.
      { Header: "Gender", accessor: "gender" }, // Tablo başlığı ve karakter özelliği (gender) eşleştirildi.
    ],
    [] //useMemo yalnızca bileşen ilk render edildiğinde çalışır.
  );

  // useTable hook'u çağrılarak tablo özellikleri ve metotları elde edildi.
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: characters });

  return (
    <table
      {...getTableProps()}
      className=" w-full border-separate border border-slate-400"
    >
      <thead
        className="border-2
    p-3 bg-[#22a2bd] text-left text-white"
      >
        {headerGroups.map(
          (
            headerGroup // headerGroups üzerinden map ile dönülerek her bir başlık grubu render edildi.
          ) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {/* Her bir başlık grubu için <tr> elementi oluşturuldu. */}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th> /* Her bir sütun başlığı için <th> elementi oluşturuldu. Sütun başlığı render edildi. */
              ))}
            </tr>
          )
        )}
      </thead>
      <tbody {...getTableBodyProps()} className="border-2 bg-green-300">
        {rows.map((row) => {
          prepareRow(row); // Her bir satır için hazırlık işlemi yapıldı.
          return (
            <tr
              className="hover:bg-[#54d7c1] cursor-pointer text-green-800"
              {...row.getRowProps()} // Satır özellikleri spread edilerek eklendi.
              onClick={() => onRowClick(row.original)} // Satıra tıklanınca onRowClick fonksiyonu çağrıldı.
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td> /* Her bir hücre için <td> elementi oluşturuldu.  Hücre içeriği render edildi. */
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CharacterTable;

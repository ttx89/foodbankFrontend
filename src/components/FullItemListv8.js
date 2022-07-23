import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { ThemeContext } from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
// import ItemTableRow from "./ItemTableRow";
// import ReactTable from "react-table-6";
//import "react-table-6/react-table.css";
import "../styles/itemlist_g.css";
import {
  createColumnHelper,
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

// import {
//   RankingInfo,
//   rankItem,
//   compareItems,
// } from "@tanstack/match-sorter-utils";

const mytable = new Object();
mytable.itemname = "";
mytable.username = "";
mytable.expiredate = new Date();
mytable.address = "";
mytable.description = "";
mytable.isActive = true;
mytable.winner = "";

const defaultData: mytable[] = [
  {
    itemname: "tanner",
    username: "linsley",
    address: "In Relationship",
    description: "sdfsfd",
  },
  {
    itemname: "23565",
    username: "sdvf",
    address: "In 7654",
    description: "sdfsfd",
  },
  {
    itemname: "tre",
    username: "lk",
    address: "asfdgfh",
    description: "sdfsfd",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  // columnHelper.accessor("itemname", {
  //   cell: (info) => info.getValue(),
  //   footer: (info) => info.column.id,
  // }),
  columnHelper.accessor((row) => row.itemname, {
    id: "itemname",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Item Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("username", {
    header: () => "Username",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("expiredate", {
    header: () => <span>Expiration</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("address", {
    header: "Address",
    //cell: () => "adsadas",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("isActive", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
];

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const FullItemListv8 = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios
      .get(url + "/items/")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const DataTable = () => {
  //   return items.map((res, i) => {
  //     return <ItemTableRow obj={res} key={i} />;
  //   });
  // };

  const itemDetails = (_id) => {
    navigate("/details/" + _id);
  };

  // const columns= React.useMemo(
  //   () => [
  //   {
  //     header: "ItemName",
  //     accessor: "itemname",
  //     filterMethod: (filter, row) =>
  //       row[filter.id].startsWith(filter.value),
  //   },
  //   {
  //     header: "Restaurant Name",
  //     accessor: "username",
  //     filterMethod: (filter, row) =>
  //       row[filter.id].startsWith(filter.value),
  //   },
  //   {
  //     header: "Expire Date",
  //     accessor: "expiredate",
  //     filterMethod: (filter, row) =>
  //       row[filter.id].startsWith(filter.value),
  //   },
  //   {
  //     header: "Address",
  //     accessor: "address",
  //     filterMethod: (filter, row) =>
  //       row[filter.id].startsWith(filter.value),
  //   },
  //   {
  //     header: "Description",
  //     accessor: "description",
  //     filterMethod: (filter, row) =>
  //       row[filter.id].startsWith(filter.value),
  //   },
  //   {
  //     header: "Action",

  //     accessor: "isActive",
  //     // id: "over",
  //     // Cell: (data) => (
  //     //   <div>
  //     //     <Button
  //     //       size="sm"
  //     //       onClick={(props) => itemDetails(data.row._original._id)}
  //     //       variant="primary"
  //     //     >
  //     //       Grab
  //     //     </Button>
  //     //   </div>
  //     // ),
  //     // filterMethod: (filter, row) => {
  //     //   if (filter.value === "all") {
  //     //     return true;
  //     //   }
  //     //   if (filter.value === "true") {
  //     //     return row[filter.id];
  //     //   }
  //     //   return !row[filter.id];
  //     // },
  //     // Filter: ({ filter, onChange }) => (
  //     //   <select
  //     //     onChange={(event) => onChange(event.target.value)}
  //     //     style={{ width: "100%" }}
  //     //     value={filter ? filter.value : "all"}
  //     //   >
  //     //     <option value="all">Show All</option>
  //     //     <option value="true">Available</option>
  //     //     <option value="false">Unavailable</option>
  //     //   </select>
  //     // ),
  //   },
  // ],
  // []
  // )

  const rerender = React.useReducer(() => ({}), {})[1];
  //const [items, setItems] = React.useState(() => [...defaultData])
  const data = items;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);
  console.log(columns);
  table.getRowModel().rows.map((row) => console.log(row.id));

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {/* <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button> */}
    </div>
  );
};

export default FullItemListv8;

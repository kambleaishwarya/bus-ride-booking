// "use client";

// // Add this at the top to mark this file as a Client Component
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   faEdit,
//   faEye,
//   faPlus,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export type Route = {
//   id: string;
//   name: string;
//   number: string;
//   seats: number;
//   type: string;
// };

// // API Functions
// async function fetchRoutes(pageIndex: number, pageSize: number) {
//   const response = await fetch(
//     `/api/route?page=${pageIndex}&limit=${pageSize}`,
//   );
//   if (!response.ok) {
//     toast.error("Failed to fetch routes");
//     return { data: [], total: 0 };
//   }
//   return response.json();
// }

// async function deleteRoute(routeId: string) {
//   const response = await fetch(`/api/route/${routeId}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) throw new Error("Failed to delete routes");
// }

// export default function VehicleList() {
//   const [data, setData] = useState<Route[]>([]);
//   const [pageIndex, setPageIndex] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [viewMode, setViewMode] = useState(false);
//   const [vehicle, setVehicle] = useState<Route | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchRoutes(pageIndex, pageSize);
//         console.log("Fetched Data:", result); // Debug the API response
//         setData(result.data);
//         setTotal(result.total);
//       } catch (err) {
//         console.error("Error fetching vehicles:", err);
//         toast.error("Error loading vehicles");
//       }
//     };
//     fetchData();
//   }, [pageIndex, pageSize]);

//   const totalPages = Math.ceil(total / pageSize);

//   const handleDelete = async (vehicleId: string) => {
//     if (window.confirm("Are you sure you want to delete this vehicle?")) {
//       try {
//         await deleteRoute(vehicleId);
//         setData((prevData) =>
//           prevData.filter((vehicle) => vehicle.id !== vehicleId),
//         );
//         toast.success("Vehicle deleted successfully!");
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to delete vehicle.");
//       }
//     }
//   };

//   const handleView = (vehicle: Route) => {
//     setVehicle(vehicle);
//     setViewMode(true);
//     setIsOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsOpen(false);
//     setViewMode(false);
//     setVehicle(null);
//   };

//   const columns: ColumnDef<Route>[] = [
//     { accessorKey: "name", header: "Name" },
//     { accessorKey: "number", header: "Number" },
//     { accessorKey: "seats", header: "Seats" },
//     { accessorKey: "type", header: "Type" },
//     { accessorKey: "origin", header: "Origin" },
//     { accessorKey: "destination", header: "Destination" },
//     { accessorKey: "departureTime", header: "Departure Time" },
//     { accessorKey: "arrivalTime", header: "Arrival Time" },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => (
//         <div className="flex space-x-2">
//           <Button onClick={() => handleView(row.original)} variant="outline">
//             <FontAwesomeIcon icon={faEye} />
//           </Button>
//           <Button
//             onClick={() =>
//               router.push(`/dashboard/vehicle/edit/${row.original.id}`)
//             }
//             variant="outline"
//           >
//             <FontAwesomeIcon icon={faEdit} />
//           </Button>
//           <Button
//             onClick={() => handleDelete(row.original.id)}
//             variant="outline"
//           >
//             <FontAwesomeIcon icon={faTrash} />
//           </Button>
//         </div>
//       ),
//     },
//   ];
  

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     state: { pagination: { pageIndex, pageSize } },
//   });

//   return (
//     <div className="w-full">
//       <h2 className="mb-4 text-lg font-semibold">Routes List</h2>

//       <div className="mb-4 flex justify-end">
//         <button
//           onClick={() => router.push("/dashboard/route/create")}
//           className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//         >
//           <FontAwesomeIcon icon={faPlus} className="mr-2" />
//           Add Route
//         </button>
//       </div>

//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filter by name..."
//           onChange={(e) =>
//             table.getColumn("name")?.setFilterValue(e.target.value)
//           }
//           className="max-w-sm"
//         />
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {data.length > 0 ? (
//               data.map((vehicle) => (
//                 <TableRow key={vehicle.id}>
//                   <TableCell>{vehicle.origin}</TableCell>
//                   <TableCell>{vehicle.destination}</TableCell>
//                   <TableCell>{vehicle.departureTime}</TableCell>
//                   <TableCell>{vehicle.arrivalTime}</TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       <Button
//                         onClick={() => handleView(vehicle)}
//                         variant="outline"
//                       >
//                         <FontAwesomeIcon icon={faEye} />
//                       </Button>
//                       <Button
//                         onClick={() =>
//                           router.push(`/dashboard/route/create/${vehicle.id}`)
//                         }
//                         variant="outline"
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </Button>
//                       <Button
//                         onClick={() => handleDelete(vehicle.id)}
//                         variant="outline"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center">
//                   No Routes found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="text-sm">
//           Showing {Math.min((pageIndex - 1) * pageSize + 1, total)}–
//           {Math.min(pageIndex * pageSize, total)} of {total} routes
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
//             disabled={pageIndex === 1}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               setPageIndex((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={pageIndex === totalPages}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {isOpen && viewMode && vehicle && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="w-96 rounded-md bg-white p-6 shadow-md">
//       <h3 className="mb-4 text-lg font-semibold">View Route</h3>
      
//       <p>
//         <strong>Origin:</strong> {vehicle.origin}
//       </p>
//       <p>
//         <strong>Destination:</strong> {vehicle.destination}
//       </p>
//       <p>
//         <strong>Departure Time:</strong> {vehicle.departureTime}
//       </p>
//       <p>
//         <strong>Arrival Time:</strong> {vehicle.arrivalTime}
//       </p>
//       <div className="mt-6 text-right">
//         <button
//           className="rounded-md bg-gray-500 px-4 py-2 text-white"
//           onClick={handleCloseDialog}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { faEdit, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type Route = {
  id: string;
  origin: { id: string; name: string };
  destination: { id: string; name: string };
  vehicle: { id: string; name: string };
  departureTime: string; // ISO Date string
  arrivalTime: string;   // ISO Date string
  createdBy: { id: string; name: string };
};



// async function fetchRoutes(pageIndex: number, pageSize: number) {
//   const response = await fetch(`/api/routes?page=${pageIndex}&limit=${pageSize}`);
//   if (!response.ok) {
//     toast.error("Failed to fetch routes");
//     return { data: [], total: 0 };
//   }
//   return response.json();
// }

async function fetchRoutes(pageIndex: number, pageSize: number) {
  const response = await fetch(`/api/routes?page=${pageIndex}&limit=${pageSize}`);
  if (!response.ok) {
    toast.error("Failed to fetch routes");
    return { data: [], total: 0 };
  }
  return response.json();
}

async function deleteRoute(routeId: string) {
  const response = await fetch(`/api/routes/${routeId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete route");
}

export default function RouteList() {
  const [data, setData] = useState<Route[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchRoutes(pageIndex, pageSize);
        setData(result.data);
        setTotal(result.total);
      } catch (err) {
        console.error("Error fetching routes:", err);
        toast.error("Error loading routes");
      }
    };
    fetchData();
  }, [pageIndex, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  const handleDelete = async (routeId: string) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      try {
        await deleteRoute(routeId);
        setData((prevData) => prevData.filter((route) => route.id !== routeId));
        toast.success("Route deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete route.");
      }
    }
  };

  const handleView = (route: Route) => {
    setRoute(route);
    setViewMode(true);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setViewMode(false);
    setRoute(null);
  };

  const columns: ColumnDef<Route>[] = [
    { accessorKey: "origin.name", header: "Origin" },
    { accessorKey: "destination.name", header: "Destination" },
    { accessorKey: "vehicle.name", header: "Vehicle" },
    { accessorKey: "departureTime", header: "Departure Time" },
    { accessorKey: "arrivalTime", header: "Arrival Time" },
    { accessorKey: "createdBy.name", header: "Created By" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleView(row.original)} variant="outline">
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/route/edit/${row.original.id}`)}
            variant="outline"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button onClick={() => handleDelete(row.original.id)} variant="outline">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize } },
  });

  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold">Routes List</h2>

      <div className="mb-4 flex justify-end">
        <button
          onClick={() => router.push("/dashboard/route/create")}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Route
        </button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No Routes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          Showing {Math.min((pageIndex - 1) * pageSize + 1, total)}–
          {Math.min(pageIndex * pageSize, total)} of {total} routes
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
            disabled={pageIndex === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages))}
            disabled={pageIndex === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {isOpen && viewMode && route && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-md bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">View Route</h3>
            <p>
              <strong>Origin:</strong> {route.origin.name}
            </p>
            <p>
              <strong>Destination:</strong> {route.destination.name}
            </p>
            <p>
              <strong>Vehicle:</strong> {route.vehicle.name}
            </p>
            <p>
              <strong>Departure Time:</strong> {route.departureTime}
            </p>
            <p>
              <strong>Arrival Time:</strong> {route.arrivalTime}
            </p>
            <p>
              <strong>Created By:</strong> {route.createdBy.name}
            </p>
            <div className="mt-6 text-right">
              <button
                className="rounded-md bg-gray-500 px-4 py-2 text-white"
                onClick={handleCloseDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

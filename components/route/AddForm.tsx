// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function RouteForm({ user }) {
//   const [originId, setOriginId] = useState("");
//   const [destinationId, setDestinationId] = useState("");
//   const [vehicleId, setVehicleId] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [arrivalTime, setArrivalTime] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const locations = [
//   { id: "1", name: "Location 1" },
//   { id: "2", name: "Location 2" },
//   { id: "3", name: "Location 3" },
// ];

// const handleSubmit = async (event: React.FormEvent) => {
//   event.preventDefault();

//   // Combine date with time
//   const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
//   const formattedDepartureTime = new Date(`${currentDate}T${departureTime}:00`).toISOString();
//   const formattedArrivalTime = new Date(`${currentDate}T${arrivalTime}:00`).toISOString();

//   try {
//     const response = await fetch("/api/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         originId,
//         destinationId,
//         vehicleId,
//         departureTime: formattedDepartureTime,
//         arrivalTime: formattedArrivalTime,
//         createdByUserId: user,
//       }),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       setError(data.error || "An unexpected error occurred.");
//       toast.error("Failed to add route.");
//       return;
//     }

//     toast.success("Route added successfully.");
//     router.push("/dashboard/route");
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     setError("An error occurred while processing your request.");
//     toast.error("An error occurred while processing your request.");
//   }
// };



  //     if (!response.ok) {
  //       const data = await response.json();
  //       setError(data.error || "An unexpected error occurred.");
  //       toast.error("Failed to add route.");
  //       return;
  //     }

  //     toast.success("Route added successfully.");
  //     router.push("/dashboard/route");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     setError("An error occurred while processing your request.");
  //     toast.error("An error occurred while processing your request.");
  //   }
  // };

  

//   return (
//     <div className="mx-auto mt-8 w-full md:w-1/2 rounded-md bg-white p-6 shadow-md">
//       <h2 className="mb-4 text-lg font-semibold">Add New Route</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Origin Location ID */}
//         <div>
//           <label htmlFor="originId" className="block text-sm font-medium">
//             Origin Location ID
//           </label>
//           <input
//             type="text"
//             id="originId"
//             value={originId}
//             onChange={(e) => setOriginId(e.target.value)}
//             className="w-full rounded-md border border-gray-300 p-2"
//             placeholder="Enter Origin Location ID"
//             required
//           />
//         </div>

//         {/* Destination Location ID */}
//         <div>
//           <label htmlFor="destinationId" className="block text-sm font-medium">
//             Destination Location ID
//           </label>
//           <input
//             type="text"
//             id="destinationId"
//             value={destinationId}
//             onChange={(e) => setDestinationId(e.target.value)}
//             className="w-full rounded-md border border-gray-300 p-2"
//             placeholder="Enter Destination Location ID"
//             required
//           />
//         </div>

//         {/* Vehicle ID */}
//         <div>
//           <label htmlFor="vehicleId" className="block text-sm font-medium">
//             Vehicle ID
//           </label>
//           <input
//             type="text"
//             id="vehicleId"
//             value={vehicleId}
//             onChange={(e) => setVehicleId(e.target.value)}
//             className="w-full rounded-md border border-gray-300 p-2"
//             placeholder="Enter Vehicle ID"
//             required
//           />
//         </div>

//         {/* Departure Time */}
//         <div>
//           <label htmlFor="departureTime" className="block text-sm font-medium">
//             Departure Time
//           </label>
//           <input
//             type="time"
//             id="departureTime"
//             value={departureTime}
//             onChange={(e) => setDepartureTime(e.target.value)}
//             className="w-full rounded-md border border-gray-300 p-2"
//             required
//           />
//         </div>

//         {/* Arrival Time */}
//         <div>
//           <label htmlFor="arrivalTime" className="block text-sm font-medium">
//             Arrival Time
//           </label>
//           <input
//             type="time"
//             id="arrivalTime"
//             value={arrivalTime}
//             onChange={(e) => setArrivalTime(e.target.value)}
//             className="w-full rounded-md border border-gray-300 p-2"
//             required
//           />
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex justify-between">
//           <button
//             type="button"
//             className="rounded-md bg-gray-500 px-4 py-2 text-white"
//             onClick={() => router.push("/dashboard/route")}
//           >
//             Cancel
//           </button>
//           <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white">
//             Add Route
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// return (
//   <div className="mx-auto mt-8 w-full md:w-1/2 rounded-md bg-white p-6 shadow-md">
//     <h2 className="mb-4 text-lg font-semibold">Add New Route</h2>
//     {error && <p className="text-red-500">{error}</p>}
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Origin Location ID - Dropdown */}
//       <div>
//         <label htmlFor="originId" className="block text-sm font-medium">
//           Origin Location
//         </label>
//         <select
//           id="originId"
//           value={originId}
//           onChange={(e) => setOriginId(e.target.value)}
//           className="w-full rounded-md border border-gray-300 p-2"
//           required
//         >
//           <option value="">Select Origin Location</option>
//           {locations.map((location) => (
//             <option key={location.id} value={location.id}>
//               {location.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Destination Location ID - Dropdown */}
//       <div>
//         <label htmlFor="destinationId" className="block text-sm font-medium">
//           Destination Location
//         </label>
//         <select
//           id="destinationId"
//           value={destinationId}
//           onChange={(e) => setDestinationId(e.target.value)}
//           className="w-full rounded-md border border-gray-300 p-2"
//           required
//         >
//           <option value="">Select Destination Location</option>
//           {locations.map((location) => (
//             <option key={location.id} value={location.id}>
//               {location.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Vehicle ID */}
//       <div>
//         <label htmlFor="vehicleId" className="block text-sm font-medium">
//           Vehicle ID
//         </label>
//         <input
//           type="text"
//           id="vehicleId"
//           value={vehicleId}
//           onChange={(e) => setVehicleId(e.target.value)}
//           className="w-full rounded-md border border-gray-300 p-2"
//           placeholder="Enter Vehicle ID"
//           required
//         />
//       </div>

//       {/* Departure Time */}
//       <div>
//         <label htmlFor="departureDateTime" className="block text-sm font-medium">
//           Departure Time
//         </label>
//         <input
//           type="time"
//           id="departureDateTime"
//           value={departureTime}
//           onChange={(e) => setDepartureTime(e.target.value)}
//           className="w-full rounded-md border border-gray-300 p-2"
//           required
//         />
//       </div>

//       {/* Arrival Time */}
//       <div>
//         <label htmlFor="arrivalTime" className="block text-sm font-medium">
//           Arrival Time
//         </label>
//         <input
//           type="time"
//           id="arrivalTime"
//           value={arrivalTime}
//           onChange={(e) => setArrivalTime(e.target.value)}
//           className="w-full rounded-md border border-gray-300 p-2"
//           required
//         />
//       </div>

//       {/* Buttons */}
//       <div className="mt-6 flex justify-between">
//         <button
//           type="button"
//           className="rounded-md bg-gray-500 px-4 py-2 text-white"
//           onClick={() => router.push("/dashboard/route")}
//         >
//           Cancel
//         </button>
//         <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white">
//           Add Route
//         </button>
//       </div>
//     </form>
//   </div>
// );
// }



"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RouteForm({ user }) {
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const locations = [
    { id: "1", name: "Location 1" },
    { id: "2", name: "Location 2" },
    { id: "3", name: "Location 3" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const currentDate = new Date().toISOString().split("T")[0]; 
    const formattedDepartureTime = new Date(`${currentDate}T${departureTime}:00`).toISOString();
    const formattedArrivalTime = new Date(`${currentDate}T${arrivalTime}:00`).toISOString();
  
    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originId,
          destinationId,
          vehicleId,
          departureTime: formattedDepartureTime, 
          arrivalTime: formattedArrivalTime,     
          createdByUserId: user,
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "An unexpected error occurred.");
        toast.error("Failed to add route.");
        return;
      }
  
      toast.success("Route added successfully.");
      router.push("/dashboard/route");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while processing your request.");
      toast.error("An error occurred while processing your request.");
    }
  };
  

  return (
    <div className="mx-auto mt-8 w-full md:w-1/2 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Add New Route</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origin Location ID - Dropdown */}
        <div>
          <label htmlFor="originId" className="block text-sm font-medium">
            Origin Location
          </label>
          <select
            id="originId"
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select Origin Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Location ID - Dropdown */}
        <div>
          <label htmlFor="destinationId" className="block text-sm font-medium">
            Destination Location
          </label>
          <select
            id="destinationId"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select Destination Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle ID */}
        <div>
          <label htmlFor="vehicleId" className="block text-sm font-medium">
            Vehicle ID
          </label>
          <input
            type="text"
            id="vehicleId"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter Vehicle ID"
            required
          />
        </div>

        {/* Departure Time */}
        <div>
          <label htmlFor="departureDateTime" className="block text-sm font-medium">
            Departure Time
          </label>
          <input
            type="time"
            id="departureDateTime"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Arrival Time */}
        <div>
          <label htmlFor="arrivalTime" className="block text-sm font-medium">
            Arrival Time
          </label>
          <input
            type="time"
            id="arrivalTime"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="rounded-md bg-gray-500 px-4 py-2 text-white"
            onClick={() => router.push("/dashboard/route")}
          >
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white">
            Add Route
          </button>
        </div>
      </form>
    </div>
  );
}

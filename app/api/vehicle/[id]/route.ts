import { updateVehicle, deleteVehicle } from "@/lib/vehicle"; 

// -----------------------------------------------------------------------------
// PUT method to update a vehicle
// -----------------------------------------------------------------------------


export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const vehicleId = url.pathname.split('/').pop(); // Extract vehicleId from URL

    const body = await req.json();
    console.log("Request Body:", body); 

    const { name, number, seats, type } = body;

    if (!vehicleId || !name || !number || !seats || !type) {
      return new Response(
        JSON.stringify({ error: "Vehicle ID and all details are required" }),
        { status: 400 }
      );
    }

    const updatedVehicle = await updateVehicle(vehicleId, {
      name,
      number,
      seats,
      type,
    });

    return new Response(JSON.stringify(updatedVehicle), { status: 200 });
  } catch (error: any) {
    console.error("Error updating vehicle:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// -----------------------------------------------------------------------------
// DELETE method to delete a vehicle
// -----------------------------------------------------------------------------

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const vehicleId = url.pathname.split('/').pop(); 

    if (!vehicleId) {
      return new Response(
        JSON.stringify({ error: "Vehicle ID is required" }),
        { status: 400 }
      );
    }

    const deletionResult = await deleteVehicle(vehicleId);

    return new Response(JSON.stringify(deletionResult), { status: 200 });
  } catch (error: any) {
    console.error("Error deleting vehicle:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

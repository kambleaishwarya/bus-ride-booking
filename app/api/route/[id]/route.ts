import { updateRoute, deleteRoute } from "@/lib/route";


export async function PUT(req: Request) {
  const url = new URL(req.url);
  const routeId = url.pathname.split("/").pop();

  if (!routeId) {
    return new Response(
      JSON.stringify({ error: "Route ID is required" }),
      { status: 400 }
    );
  }

  try {
    const updateData = await req.json();
    const updatedRoute = await updateRoute(routeId, updateData);

    if ("error" in updatedRoute) {
      return new Response(JSON.stringify(updatedRoute), { status: 400 });
    }

    return new Response(JSON.stringify(updatedRoute), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}





export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const routeId = url.pathname.split("/").pop();

  if (!routeId) {
    return new Response(
      JSON.stringify({ error: "Route ID is required" }),
      { status: 400 }
    );
  }

  try {
    const deletionResult = await deleteRoute(routeId);

    if ("error" in deletionResult) {
      return new Response(JSON.stringify(deletionResult), { status: 400 });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Route deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

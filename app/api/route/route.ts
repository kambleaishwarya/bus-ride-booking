import { getAllRoutes, addRoute, getRouteById } from "@/lib/route"; // Import the route service functions



export async function GET(req: Request) {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const routeId = pathSegments[pathSegments.length - 1];

    console.log('Fetching route with ID:', routeId);  // Log the route ID

    if (routeId && routeId !== "route") {
        try {
            const route = await getRouteById(routeId);

            if (!route) {
                return new Response(
                    JSON.stringify({ error: "Route not found" }),
                    { status: 404 }
                );
            }

            return new Response(JSON.stringify(route), { status: 200 });
        } catch (error: any) {
            console.error('Error fetching route:', error);
            return new Response(
                JSON.stringify({ error: error.message || "Internal Server Error" }),
                { status: 500 }
            );
        }
    }

    // Otherwise, fetch all routes with pagination
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    try {
        const { routes, total } = await getAllRoutes(page, limit);

        return new Response(
            JSON.stringify({
                data: routes,
                total: total,
                page,
                limit,
            }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching all routes:', error);
        return new Response(
            JSON.stringify({ error: error.message || "Internal Server Error" }),
            { status: 500 }
        );
    }
}



export async function POST(req: Request) {
    try {
        // Parse request body
        const {
            originId,
            destinationId,
            vehicleId,
            departureTime,
            arrivalTime,
            createdByUserId,
        } = await req.json();
        console.log("Request Body:", req); // Log the parsed body


        // Validate required fields
        if (
            !originId ||
            !destinationId ||
            !vehicleId ||
            !departureTime ||
            !arrivalTime ||
            !createdByUserId
        ) {
            return new Response(
                JSON.stringify({ error: "All route details are required" }),
                { status: 400 }
            );
        }

        // Call service to add a new route
        const newRoute = await addRoute({
            originId,
            destinationId,
            vehicleId,
            departureTime: new Date(departureTime),
            arrivalTime: new Date(arrivalTime),
            createdByUserId,
        });

        // Check if there's an error in the response
        if ("error" in newRoute) {
            return new Response(JSON.stringify(newRoute), { status: 400 });
        }

        return new Response(JSON.stringify(newRoute), { status: 201 });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || "Internal Server Error" }),
            { status: 500 }
        );
    }
}

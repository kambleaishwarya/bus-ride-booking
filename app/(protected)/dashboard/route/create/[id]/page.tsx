import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import EditRouteForm from "@/components/route/EditForm";
import { getRouteById } from "@/lib/route"; // Fetch a route by ID

export const metadata = constructMetadata({
  title: "Route Edit – Admin Dashboard",
  description: "Edit route details for the management system.",
});

// Server-side rendering using async function
export default async function RouteEditPage({
  params,
}: {
  params: { id: string };
}) {
  // Authenticate the user
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
    return null; // Ensure nothing further is rendered after redirect
  }

  // Extract route ID from params
  const { id } = params;
  let route = null;

  try {
    // Fetch the route details
    route = await getRouteById(id);

    if (!route) {
      return (
        <div className="text-center text-red-500">
          Route not found. Please check the ID or try again later.
        </div>
      );
    }
  } catch (error) {
    console.error("Error fetching route data:", error);
    return (
      <div className="text-center text-red-500">
        Failed to load route data. Please try again later.
      </div>
    );
  }

  // Render the edit form
  return (
    <div className="flex flex-col gap-5 p-4">
      <h1 className="text-xl font-semibold">Edit Route</h1>
      <EditRouteForm route={route} />
    </div>
  );
}

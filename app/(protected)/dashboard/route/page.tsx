import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { getAllRoutes } from "@/lib/route"; // Import the route function
import RoutesList from "@/components/route/MasterList";

export const metadata = constructMetadata({
  title: "Route Management – Next Template",
  description: "Route management page for admin users.",
});

// Server-side rendering using async function
export default async function AdminRoutePage() {
  // Authenticate the user
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
    return null; // Prevent further execution
  }

  // Pagination Defaults
  const pageIndex = 1; // Default starting page
  const pageSize = 10; // Default page size

  try {
    const { routes, total } = await getAllRoutes(pageIndex, pageSize);
    console.log("Fetched routes:", routes);
    console.log("Total routes:", total);
    return (
      <div className="flex flex-col gap-5">
        <RoutesList
          routes={routes}
          total={total}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching routes data:", error);
    return (
      <div className="text-center text-red-500 mt-10">
        <h1 className="text-2xl font-bold">Failed to Load Routes</h1>
        <p>Please try refreshing the page or come back later.</p>
      </div>
    );
  }
}  

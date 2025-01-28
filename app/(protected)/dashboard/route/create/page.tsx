import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import AddForm from "@/components/route/AddForm"; // Import the AddForm component for vehicles

export const metadata = constructMetadata({
  title: "Add Vehicle – Next Template",
  description: "Page to add a new vehicle.",
});

// Server-side rendering using async function
export default async function AdminPage() {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      redirect("/login");
    }
  
    try {
      return (
        <div className="flex flex-col gap-5">
          {/* Pass the user object to the AddForm */}
          <AddForm user={user.id} />
        </div>
      );
    } catch (error) {
      console.error("Error loading add vehicle form:", error);
      return (
        <div className="text-red-500 text-center">
          Failed to load form. Please try again later.
        </div>
      );
    }
  }

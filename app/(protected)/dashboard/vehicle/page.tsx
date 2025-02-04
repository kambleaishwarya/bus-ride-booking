import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { getAllVehicles } from "@/lib/vehicle"; 
import TransactionsList from "@/components/vehicle/MasterList"; 

export const metadata = constructMetadata({
  title: "Vehicle Management – Next Template",
  description: "Vehicle management page for admin users.",
});

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const pageIndex = 1; 
  const pageSize = 10; 

  try {
    const { vehicles, total } = await getAllVehicles(pageIndex, pageSize);

    return (
      <div className="flex flex-col gap-5">
        <TransactionsList />
      </div>
    );
  } catch (error) {
    console.error("Error fetching vehicles data:", error);
    return (
      <div className="text-red-500 text-center">
        Failed to load data. Please try again later.
      </div>
    );
  }
}

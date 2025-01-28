import { DashboardHeader } from "@/components/dashboard/header";
import { SkeletonSection } from "@/components/shared/section-skeleton";

export default function DashboardRouteLoading() {
  return (
    <>
      <DashboardHeader
        heading="Route"
        text="Manage your routes and view their details."
      />
      <div className="divide-y divide-muted pb-10">
      </div>
    </>
  );
}

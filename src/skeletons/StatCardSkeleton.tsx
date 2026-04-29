import { Skeleton } from "@/components/ui/skeleton";

export default function StatCardSkeleton() {
  return (
    <div
      className="!bg-card text-card-foreground p-6 px-8 rounded-xl"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Label Skeleton */}
      <Skeleton className="h-6 w-[300px] text-white" />

      {/* Number Skeleton */}
      <Skeleton className="h-8 w-14 mt-13 text-white" />
    </div>
  );
}

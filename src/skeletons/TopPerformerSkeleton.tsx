import { Skeleton } from "@/components/ui/skeleton";

const TopPerformerSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="text-center mx-auto w-fit">
        <Skeleton className="h-20 w-20 rounded-full mx-auto" />
        <Skeleton className="h-3 w-24 mt-6" />
        <Skeleton className="h-3 w-24 mt-2" />
        <Skeleton className="h-3 w-24 mt-2" />
      </div>
      <div className="flex items-center gap-5 justify-between mt-14 mx-16">
        <div className="text-center mx-auto w-fit">
          <Skeleton className="h-20 w-20 rounded-full mx-auto" />
          <Skeleton className="h-3 w-24 mt-6" />
          <Skeleton className="h-3 w-24 mt-2" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
        <div className="text-center mx-auto w-fit">
          <Skeleton className="h-20 w-20 rounded-full mx-auto" />
          <Skeleton className="h-3 w-24 mt-6" />
          <Skeleton className="h-3 w-24 mt-2" />
          <Skeleton className="h-3 w-24 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default TopPerformerSkeleton;

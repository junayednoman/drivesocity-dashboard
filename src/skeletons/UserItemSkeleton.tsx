import { Skeleton } from "@/components/ui/skeleton";

const UserTableSkeleton = ({
  limit = 10,
}: {
  pagination?: boolean;
  limit?: number;
}) => {
  // Create an array to simulate rows based on the limit
  const skeletonRows = Array.from({ length: limit }, (_, index) => index);

  return (
    <div className="space-y-6">
      <div className="rounded-lg overflow-hidden">
        {/* Data Rows Skeleton */}
        <div className="divide-y divide-border">
          {skeletonRows.map((_, index) => (
            <div key={index} className="px-4 py-[14px]">
              <div className="grid grid-cols-12 gap-2 items-center">
                {/* User ID Column */}
                <div className="col-span-2">
                  <Skeleton className="h-4 w-[60px]" />
                </div>

                {/* Name Column */}
                <div className="col-span-3 flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>

                {/* Email Column */}
                <div className="col-span-3">
                  <Skeleton className="h-4 w-[150px]" />
                </div>

                {/* Date Column */}
                <div className="col-span-2">
                  <Skeleton className="h-4 w-[100px]" />
                </div>

                {/* Action Column */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTableSkeleton;

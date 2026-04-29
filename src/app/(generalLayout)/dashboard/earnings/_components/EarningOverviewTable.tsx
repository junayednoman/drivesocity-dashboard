"use client";

import { Eye, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EarningDetailsModal } from "@/components/modal/EarningDetailsModal";
import { useGetEarningsQuery } from "@/redux/api/earningApi";
import {
  EarningOverviewTableProps,
  EarningTableData,
} from "@/interface/earning.interface";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";

const EarningOverviewTable = ({
  pagination = false,
  limit = 10,
}: EarningOverviewTableProps) => {
  const [detailedData, setDetailedData] = useState<EarningTableData | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch earnings data
  const {
    data: earningsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetEarningsQuery({
    page: currentPage,
    limit,
    search: debouncedSearchText || undefined,
  });
  const earnings = earningsResponse?.data?.earningList || [];
  const totalItems = earningsResponse?.meta?.total || 0;

  // Map API data to table structure
  const earningData: EarningTableData[] = earnings.map(
    (item: any, index: number) => ({
      id: item._id,
      serial: String(index + 1).padStart(2, "0"),
      user: item?.user || { name: "Unknown", email: "N/A", photoUrl: "" },
      amount: item.amount,
      subscriptionType: "Pro Plan", // Static; adjust if API provides type
      purchaseDate: item.createdAt,
      transaction_id: item.tranId,
    })
  );

  // Paginate earnings (no client-side filtering, as search is server-side)
  const startIndex = (currentPage - 1) * limit;
  const paginatedEarnings = earningData.slice(startIndex, startIndex + limit);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log("Debounced search text:", debouncedSearchText);
  }, [debouncedSearchText]);

  const handleSetDetailedData = (data: EarningTableData) => {
    setDetailedData(data);
  };

  const closeModal = () => {
    setDetailedData(null);
  };

  return (
    <div className="space-y-6 bg-card p-6 px-8 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Subscription Earning
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 border-border"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="bg-primary px-4 py-4">
          <div className="grid grid-cols-5 gap-4 items-center text-card">
            <div className="font-semibold">Serial</div>
            <div className="font-semibold">User</div>
            <div className="font-semibold">Amount</div>
            <div className="font-semibold">Purchase Date</div>
            <div className="font-semibold">Action</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="px-4 py-44 text-center text-muted-foreground">
              <ASpinner />
            </div>
          ) : isError ? (
            <div className="px-4 py-44 text-center text-muted-foreground">
              <AErrorMessage error={error} onRetry={refetch} />
            </div>
          ) : paginatedEarnings.length > 0 ? (
            paginatedEarnings.map((earning) => (
              <div
                key={earning.id}
                className="px-4 py-4 hover:bg-accent transition-colors rounded"
              >
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div>
                    <span className="text-primary-foreground">
                      {earning.serial}
                    </span>
                  </div>
                  <div>
                    <span className="text-primary-foreground truncate font-semibold">
                      {(earning.user as any).name || "Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="text-primary-foreground">
                      ${earning.amount || "0.00"}
                    </span>
                  </div>
                  <div>
                    <span className="text-primary-foreground">
                      {earning.purchaseDate
                        ? new Date(earning.purchaseDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleSetDetailedData(earning)}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-border hover:bg-card"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-44 text-center text-muted-foreground">
              No earnings found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && totalItems > limit && (
          <div className="p-4 flex">
            <APagination
              totalItems={totalItems}
              itemsPerPage={limit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxVisiblePages={5}
            />
          </div>
        )}
      </div>
      <EarningDetailsModal
        isOpen={!!detailedData}
        data={detailedData}
        onClose={closeModal}
      />
    </div>
  );
};

export default EarningOverviewTable;

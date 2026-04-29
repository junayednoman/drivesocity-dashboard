"use client";
import AContainer from "@/components/AContainer";
import TopStats from "./_components/TopStats";
import { EarningOverview } from "./_components/EarningOverview";
import UserTable from "@/components/tables/UserTable";
import { useGetMetaQuery } from "@/redux/api/dashboardApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useState } from "react";

const DashboardContainer = () => {
  const currentYear = new Date().getFullYear();
  const [earningYear, setEarningYear] = useState(currentYear.toString());
  console.log("earningYear", earningYear);
  const params = {
    earning_year: Number(earningYear),
  };
  const { data, isLoading, isError, error, refetch } = useGetMetaQuery(params);
  const meta = data?.data;

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage className="py-64" error={error} onRetry={refetch} />;
  return (
    <AContainer>
      <TopStats
        data={{
          totalUserCount: meta?.totalUserCount,
          totalRevenue: meta?.totalRevenue,
          newRegisterCount: meta?.newRegisterCount,
        }}
      />
      <div className="mt-6">
        <EarningOverview
          year={earningYear}
          setYear={setEarningYear}
          currentYear={currentYear}
          earningOverview={meta?.earningOverview}
        />
      </div>
      <div className="mt-6">
        <UserTable title="Recent Users" limit={6} />
      </div>
    </AContainer>
  );
};

export default DashboardContainer;

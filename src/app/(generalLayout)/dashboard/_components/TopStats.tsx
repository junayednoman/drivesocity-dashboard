"use client";
import UsersIcon from "@/assets/users.svg";
import EarningIcon from "@/assets/earning.svg";
import SubsIcon from "@/assets/subs.svg";
import StatCard from "@/components/others/StatCard";

const TopStats = ({
  data,
}: {
  data: {
    totalUserCount: number;
    totalRevenue: number;
    newRegisterCount: number;
  };
}) => {
  return (
    <section>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          icon={UsersIcon}
          value={data.totalUserCount || 0}
        />
        <StatCard
          title="Total Earnings"
          icon={EarningIcon}
          value={data.totalRevenue || 0}
        />
        <StatCard
          title="New Registers"
          icon={SubsIcon}
          value={data.newRegisterCount || 0}
        />
      </div>
    </section>
  );
};

export default TopStats;

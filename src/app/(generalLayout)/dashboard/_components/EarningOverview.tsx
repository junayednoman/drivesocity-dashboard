"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { yearOptions } from "@/data/global.data";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import { TEarningCharts } from "@/interface/earning.interface";

const chartConfig = {
  value: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningOverview({
  earningOverview,
  year,
  setYear,
  currentYear,
}: {
  earningOverview: TEarningCharts;
  year: string;
  setYear: (year: string) => void;
  currentYear: number;
}) {
  const minValue = Math.min(...earningOverview?.map((item) => item.amount));
  const maxValue = Math.max(...earningOverview?.map((item) => item.amount));
  const yAxisDomain = [Math.floor(minValue), Math.ceil(maxValue)];

  return (
    <div className="bg-card rounded-xl p-6 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Earning Overview
        </h1>
        <AFilterSelect
          onChange={setYear}
          placeholder={currentYear.toString()}
          value={year}
          options={yearOptions}
          className="!w-[100px]"
        />
      </div>

      <ChartContainer config={chartConfig} className="h-[320px] w-full mt-12">
        <BarChart
          data={earningOverview}
          margin={{ top: 20, left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            domain={yAxisDomain}
            stroke="#636566"
            tickLine={false}
            axisLine={false}
            tickMargin={20}
          />
          <ChartTooltip
            cursor={{ fill: "#f5f5f5" }}
            content={
              <ChartTooltipContent
                formatter={(amount) => (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-muted-foreground font-medium">
                      Earnings:
                    </p>
                    <p>${amount}</p>
                  </div>
                )}
              />
            }
          />
          <Bar
            barSize={35}
            dataKey="amount"
            fill="var(--color-value)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

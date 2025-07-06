"use client";
import { getSpecificEarningsOverview } from "@/features/earning";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import { DatePicker } from "antd";
import { Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", earning: 1200 },
  { month: "Feb", earning: 1402 },
  { month: "Mar", earning: 1525 },
  { month: "Apr", earning: 1222 },
  { month: "May", earning: 1553 },
  { month: "Jun", earning: 1634 },
  { month: "Jul", earning: 1923 },
  { month: "Aug", earning: 1324 },
  { month: "Sep", earning: 1834 },
  { month: "Oct", earning: 1256 },
  { month: "Nov", earning: 1634 },
  { month: "Dec", earning: 2105 },
];

const EarningChart = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selectedEarningGrowth, setSelectedEarningGrowth] = useState([]);

  const handleEarningChange = async (year) => {
    const earningGrowth = await getSpecificEarningsOverview({
      year: Number(year),
    });
    console.log("API response:", earningGrowth);

    if (!earningGrowth.success) {
      alert("No data has been found yet");
      return;
    }

    const formatted = earningGrowth.data.earnings.map((item) => ({
      month: item.month,
      total: item.total || 0,
    }));

    setSelectedEarningGrowth({
      growthPercentage: earningGrowth.data.growthPercentage,
      trend: earningGrowth.data.trend,
      earnings: formatted,
    });
  };

  useEffect(() => {
    handleEarningChange(selectedYear);
  }, [selectedYear]);

  return (
    <div className="w-full rounded-xl bg-white p-6 xl:w-1/2">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Earnings Overview</h1>

        <div className="flex-center-start gap-x-4">
          <Flex
            align="center"
            justify="start"
            className="rounded-lg border border-gray-400 px-3 py-1.5"
          >
            <h1 className="font-medium">Monthly Growth:</h1>

            <Flex
              align="center"
              justify="start"
              gap={2}
              className="ml-2 font-bold text-green-500"
            >
              {selectedEarningGrowth.growthPercentage || 0}%
              <Icon
                icon={
                  selectedEarningGrowth.trend === "up"
                    ? "iconamoon:trend-up-light"
                    : "iconamoon:trend-down-light"
                }
                height={16}
                width={16}
              />
            </Flex>
          </Flex>

          <DatePicker
            onChange={(_, dateString) => setSelectedYear(dateString)}
            picker="year"
            defaultValue={dayjs()}
            className="!border-none !py-1.5 !text-white"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={selectedEarningGrowth.earnings}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="var(--primary)" stopOpacity={1} />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            dataKey="month"
          />

          <YAxis tickMargin={20} axisLine={false} tickLine={false} />

          <CartesianGrid
            opacity={0.19}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Tooltip
            formatter={(value) => [`Monthly Earning: $${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "var(--primary)" }}
          />

          <Area
            activeDot={{ fill: "var(--primary)" }}
            type="monotone"
            dataKey="total"
            strokeWidth={0}
            stroke="var(--primary)"
            fill="url(#color)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;

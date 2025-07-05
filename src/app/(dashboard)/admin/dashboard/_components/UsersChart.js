"use client";

import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getSpecificUserOverview } from "@/features/dashboard";

const UsersChart = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selectedUserGrowth, setSelectedUserGrowth] = useState([]);

  const handleChange = (value) => {
    setSelectedYear(value);
  };
  const handleUserChange = async (year) => {
    const userGrowth = await getSpecificUserOverview({ year });
    if (!userGrowth.success) {
      alert("No data have found yet");
      return;
    }
    console.log("userGrowth:", userGrowth.data);
    const formatted = userGrowth.data.users.map((item) => ({
      month: item.month,
      total: item.total || 0,
    }));

    setSelectedUserGrowth(formatted);
  };

  useEffect(() => {
    handleUserChange(selectedYear);
  }, [selectedYear]);

  return (
    <div className="w-full rounded-xl bg-white p-6 xl:w-1/2">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-bold">Users Overview</h1>

        <DatePicker
          onChange={(_, dateString) => setSelectedYear(dateString)}
          picker="year"
          defaultValue={dayjs()}
          className="!border-none !py-1.5 !text-white"
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={selectedUserGrowth}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            formatter={(value) => [`Monthly Users Joined: ${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={22}
            radius={0}
            background={false}
            dataKey="total"
            fill="var(--primary)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersChart;

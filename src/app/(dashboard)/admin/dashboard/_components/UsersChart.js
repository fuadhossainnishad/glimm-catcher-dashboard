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
import { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const data = [
  { month: "Jan", user: 120 },
  { month: "Feb", user: 140 },
  { month: "Mar", user: 152 },
  { month: "Apr", user: 122 },
  { month: "May", user: 153 },
  { month: "Jun", user: 164 },
  { month: "Jul", user: 193 },
  { month: "Aug", user: 134 },
  { month: "Sep", user: 184 },
  { month: "Oct", user: 126 },
  { month: "Nov", user: 164 },
  { month: "Dec", user: 215 },
];

const UsersChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedUserType, setSelectedUserType] = useState("user");

  const handleChange = (value) => {
    setSelectedYear(value);
  };
  const handleUserChange = (value) => {
    setSelectedUserType(value);
  };

  return (
    <div className="rounded-xl p-6 w-full xl:w-1/2 bg-white">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl font-bold">Users Overview</h1>

          <DatePicker
            // onChange={(_, dateString) =>
            //   setJoinYear(moment(dateString).format("YYYY"))
            // }
            picker="year"
            defaultValue={dayjs()}
            className="!text-white !border-none !py-1.5"
          />
 
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
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
            dataKey="user"
            fill="var(--primary)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersChart;

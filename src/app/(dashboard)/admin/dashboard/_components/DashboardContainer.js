"use client";

import { useEffect, useState } from "react";
import EarningChart from "./EarningChart";
import RecentUserTable from "./RecentUserTable";
import UsersChart from "./UsersChart";
import { Icon } from "@iconify/react";
import { Tag } from "antd";
import { Flex } from "antd";
import { getTotalEarnings } from "@/features/earning";
import AccDetailsTable from "../../account-details/_components/AccDetailsTable";
import toast from "react-hot-toast";

// Dummy data
const userStats = (dashBoard) => {
  return [
    {
      key: "users",
      label: "Total Users",
      value: typeof dashBoard.totalUser === "number" ? dashBoard.totalUser : 0,
      growth: { type: "up", value: "4.5%" },
      icon: "clarity:users-line",
    },
    {
      key: "earnings",
      label: "Total Earnings",
      value:
        typeof dashBoard.totalEarnings === "number"
          ? dashBoard.totalEarnings
          : 0,
      growth: { type: "down", value: "2.5%" },
      icon: "streamline:dollar-coin-1",
    },
  ];
};

export default function DashboardContainer() {
  const [dashboard, setDashboad] = useState({});
  const handleDashboard = async (data) => {
    const totalUser = await getTotalUser();
    const totalEarnings = await getTotalEarnings();
    if (!totalUser.success) {
      toast.error("No user exist yet");
      return;
    }
    if (!totalEarnings.success) {
      toast.error("No earning occured yet");
      return;
    }
    console.log("totalUser:", totalUser.data);
    toast.success("Dashboard data fetched successfully");

    setDashboad({
      totalUser: totalUser.data,
      totalEarnings: totalEarnings.data,
    });
  };
  useEffect(() => {
    handleDashboard();
  }, []);
  return (
    <div className="space-y-10">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-10">
        {userStats(dashboard)?.map((stat) => (
          <Flex
            key={stat.key}
            align="center"
            justify="start"
            gap={16}
            className="rounded-xl bg-white p-5"
          >
            <div
              className="flex-center aspect-square size-20 rounded-full text-white"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              <Icon icon={stat.icon} height={42} width={42} />
            </div>

            <div className="space-y-2">
              <p className="text-base font-medium text-[#33363F]">
                {stat.label}
              </p>

              <h2 className="!mt-1 text-3xl font-bold">
                {stat.key === "earnings" ? `$${stat.value}` : stat.value}
              </h2>

              <div>
                <Tag
                  color={stat.growth.type === "up" ? "green" : "red"}
                  className="font-bold"
                >
                  <Flex gap={4}>
                    <Icon
                      icon={
                        stat.growth.type === "up"
                          ? "iconamoon:trend-up-light"
                          : "iconamoon:trend-down-light"
                      }
                      height={16}
                      width={16}
                    />
                    <span>{stat.growth.value}</span>
                  </Flex>
                </Tag>

                <span>From the last month</span>
              </div>
            </div>
          </Flex>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between flex-col gap-10 xl:flex-row">
        <UsersChart />

        <EarningChart />
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentUserTable />
      </section>
    </div>
  );
}

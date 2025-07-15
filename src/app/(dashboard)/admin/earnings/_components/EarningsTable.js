"use client";

import { Button, Col, Flex, Row } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Filter } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
const { Search } = Input;
import userImg from "@/assets/images/user-avatar.png";
import { Image } from "antd";
import { formatString } from "@/utils/formatString";
import { useEffect, useState } from "react";
import getTagColor from "@/utils/getTagColor";
import { handleSearch } from "@/lib/handleSearch";
import {
  getAllPayment,
  getMonthlyEarningsStats,
  getTodaysEarnings,
  getTotalEarnings,
} from "@/features/earning";
import EarningModal from "./EarningModal";

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [earnings, setEarnings] = useState([]);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectEarnings, setSelectEarnings] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [earningStats, setEarningStats] = useState({});
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
  });

  const handlEarningData = async (pagination) => {
    const allPayment = await getAllPayment({
      page: pagination.current,
      limit: pagination.pageSize,
    });
    const totalEarning = await getTotalEarnings();
    const todayEarning = await getTodaysEarnings();

    if (!allPayment.success || !totalEarning.success || !todayEarning.success) {
      message.error("Failed to fetch earnings");
    }
    console.log("earning:", {
      todayEarning: todayEarning.data,
      totalEarning: totalEarning.data,
      allPayment: allPayment.data,
    });
    const testFallbackPayments = [
      {
        _id: "INV0001",
        fullName: "Fuad Hossain",
        image: { url: userImg },
        amount: 250.5,
        status: "Paid",
        transactionId: "TX123456789",
        paymentDate: "2024-07-10",
      },
    ];

    const fallback =
      allPayment.data?.length === 0 ? testFallbackPayments : allPayment.data;

    setEarningStats({
      todayEarning: todayEarning.data,
      totalEarning: totalEarning.data,
    });
    setEarnings(fallback);
  };

  useEffect(() => {
    handlEarningData(pagination);
  }, [pagination]);

  // =============== Table Data =================
  const data = earnings.map((earning, inx) => ({
    key: earning._id || inx + 1,
    id: earning._id || "INV0938",
    paidBy: {
      name: earning.fullName || "Sarah Johnson",
      img: earning.image?.url || userImg,
    },
    amount: earning.amount || "499",
    status: earning.status || "Paid",
    tnxId: earning.transactionId || "454842343454",
    date: earning.paymentDate || "Aug, 15 2023 02:29 PM",
  }));
  console.log("Earning data:", data);

  const handleSearchTransaction = Array.isArray(data)
    ? handleSearch(data, searchText, ["paidBy.name", "status", "amount"])
    : [];

  // =============== Table columns ===============
  const columns = [
    {
      title: "Invoice Id",
      dataIndex: "id",
      render: (value) => `#${value}`,
    },
    {
      title: "Paid By",
      dataIndex: "paidBy",
      render: (value, record) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <Image
              src={value.img}
              alt={value.name}
              height={30}
              width={30}
              className="aspect-square rounded-full object-cover"
            />
            <p>{value.name}</p>
          </Flex>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => {
        return "$" + value;
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      filters: [
        {
          text: "Paid",
          value: "Paid",
        },
        {
          text: "Unpaid",
          value: "Unpaid",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (value) => (
        <Tag color="green" className="!text-sm">
          {value}
        </Tag>
      ),
    },

    {
      title: "Tnx Id",
      dataIndex: "tnxId",
      render: (value) => (
        <Tag
          color="blue"
          className="!text-sm"
          onClick={() => setShowFormattedTnxId(!showFormattedTnxId)}
          role="button"
        >
          {showFormattedTnxId ? formatString.formatTransactionId(value) : value}
        </Tag>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Action",
      render: (_, record) => {
        return (
          <Button
            style={{ backgroundColor: "var(--primary-yellow)" }}
            onClick={() => {
              setDetailsModalOpen(true);
              setSelectEarnings(record);
            }}
          >
            View Details
          </Button>
        );
      },
    },
  ];
  return (
    <div className="space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>

        <Search
          placeholder="Search Earnings..."
          onSearch={(e) => setSearchText(e)}
          onChange={(e) => setSearchText(e.target.value)}
          size="large"
          style={{
            width: 300,
          }}
          allowClear
        />
      </Flex>

      <Row gutter={16}>
        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="w-full rounded-lg px-4 py-3.5 text-white"
            style={{ backgroundImage: "var(--primary-gradient)" }}
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Today&apos;s Earnings</h4>
              <h4 className="text-lg font-bold">
                $ {earnings.todayEarning?.amount || "1,000"}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="w-full rounded-lg bg-secondary px-4 py-3.5 text-white"
            // style={{backgroundImage: "var(--primary-gradient)"}}
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Total Earnings</h4>
              <h4 className="text-lg font-bold">
                $ {earningStats.totalEarning?.amount || "10,000"}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex justify="end" gap={14} align="center" className="h-full w-full">
            <DatePicker
              picker="month"
              placeholder="Filter Month"
              style={{ height: "65%" }}
            />
          </Flex>
        </Col>
      </Row>

      <div className="">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={handleSearchTransaction}
          scroll={{ x: "100%" }}
          className="notranslate"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            onChange: (page, pageSize) => {
              setPagination((prev) => {
                const totalPages = Math.ceil((prev.total || 0) / pageSize);
                const nextPage = page > totalPages ? 1 : page;

                if (prev.current === nextPage && prev.pageSize === pageSize)
                  return prev;

                return {
                  ...prev,
                  current: page,
                  pageSize: pageSize,
                };
              });
            },
          }}
        ></Table>
        <EarningModal
          open={detailsModalOpen}
          setOpen={setDetailsModalOpen}
          earningData={selectEarnings}
        />
      </div>
    </div>
  );
}

"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import { Icon } from "@iconify/react";
import { handleSearch } from "@/lib/handleSearch";
import { blockUser, getAllUser, unblockUser } from "@/features/user";
import { formateDate } from "@/utils/formateDate";

const data = async (userData) => {
  return userData.map((user, inx) => ({
    key: inx + 1,
    id: user._id,
    name: user.fullName,
    userImg: user.userImage || userImage,
    email: user.email,
    contact: `${user.countryCode} ${user.phoneNumber}`,
    date: formateDate(user.createdAt),
    gender: user.gender,
    location: user.location,
    isActive: user.isActive,
  }));
};

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
  });

  const handleBlockUser = async (data) => {
    const res = await blockUser(data);
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    console.log("data:", res.data);
    message.success("User blocked successfully");
    await handleUserProfile(pagination);
  };
  const handleUnblockUser = async (data) => {
    const res = await unblockUser(data);
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    console.log("data:", res.data);
    message.success("User unblocked successfully");
    await handleUserProfile(pagination);
  };

  const handleSearchUser = handleSearch(userData, searchText, [
    "name",
    "email",
    "gender",
  ]);

  const handleUserProfile = async (pagination) => {
    const res = await getAllUser({
      page: pagination.current,
      limit: pagination.pageSize,
    });

    if (!res.success) {
      message.error("Failed to fetch users");
      return;
    }

    const transform = await data(res.data);
    setUserData(transform);

    setPagination((prev) => {
      if (prev.total === res.meta.total) return prev;
      return {
        ...prev,
        total: res.meta.total,
      };
    });
  };

  useEffect(() => {
    handleUserProfile(pagination);
  }, [pagination, userData]);

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
            width={1200}
            height={1200}
            className="aspect-square h-auto w-10 rounded-full"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Registered At",
      dataIndex: "date",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setProfileModalOpen(true);
                setSelectedUser(record);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            {record.isActive === true ? (
              <CustomConfirm
                title="Block User"
                description="Are you sure to block this user?"
                onConfirm={() => handleBlockUser(record.id)}
              >
                <button>
                  <UserX color="#F16365" size={22} />
                </button>
              </CustomConfirm>
            ) : (
              <CustomConfirm
                title="Unblock User"
                description="Are you sure to unblock this user?"
                onConfirm={() => handleUnblockUser(record.id)}
              >
                <button>
                  <UserX color="#F16365" size={22} />
                </button>
              </CustomConfirm>
            )}
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="mb-3 ml-auto w-1/3 gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: "auto" }}
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
            handleUserProfile(pagination);
          },
        }}
        columns={columns}
        dataSource={handleSearchUser}
        scroll={{ x: "100%" }}
      ></Table>

      <ProfileModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        user={selectedUser}
      />
    </ConfigProvider>
  );
}

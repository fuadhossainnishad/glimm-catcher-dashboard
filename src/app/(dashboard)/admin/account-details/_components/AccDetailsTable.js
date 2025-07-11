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
import { deleteUser, getAllUser } from "@/features/user";
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
  }));
};

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Block user handler
  const handleBlockUser = async (data) => {
    const res = await deleteUser(data);
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    console.log("data:", res.data);
    message.success("User blocked successfully");
    handleUserProfile();
  };

  const handleSearchUser = handleSearch(userData, searchText, [
    "name",
    "email",
    "gender",
  ]);

  const handleUserProfile = async () => {
    const res = await getAllUser();
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    const transform = await data(res.data);
    setUserData(transform);
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

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
            <CustomConfirm
              title="Block User"
              description="Are you sure to block this user?"
              onConfirm={() => handleBlockUser(record.id)}
            >
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </CustomConfirm>
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

import axiosInstance from "@/lib/axios";

export const getAllUser = async ({ page, limit }) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get(`/users?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const blockUser = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);
  console.log("data:", data);
  const res = await axiosInstance.patch(`/users/block/${data}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const unblockUser = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);
  console.log("data:", data);
  const res = await axiosInstance.patch(`/users/unblock/${data}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

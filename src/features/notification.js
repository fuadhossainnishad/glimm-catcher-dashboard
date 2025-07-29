import axiosInstance from "@/lib/axios";

export const getNotification = async ({ page, limit }) => {
  const token = sessionStorage.getItem("token");

  const res = await axiosInstance.get(
    `/notifications?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

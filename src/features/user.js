import axiosInstance from "@/lib/axios";

export const getAllUser = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

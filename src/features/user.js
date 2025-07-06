import axiosInstance from "@/lib/axios";

export const getAllUser = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUser = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);
  console.log("data:", data);
  const res = await axiosInstance.delete(`/users/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

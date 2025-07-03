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

  const res = await axiosInstance.delete("/users/delete", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

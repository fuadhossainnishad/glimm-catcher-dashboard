import axiosInstance from "@/lib/axios";

export const getTotalUser = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/users/total-count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const getSpecificUserOverview = async (query) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/users/user-growth-overview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: query,
  });
  return res.data;
};

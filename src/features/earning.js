import axiosInstance from "@/lib/axios";

export const getTotalEarnings = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/payment/total-earnings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTodaysEarnings = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/payment/todays-earnings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMonthlyEarningsStats = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/payment/todays-earnings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getEarningsOverview = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/payment/earnings-overview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getSpecificEarningsOverview = async (query) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/payment/earnings-overview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: query,
  });
  return res.data;
};

export const getAllPayment = async ({ page, limit }) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get(
    `/payment/all?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

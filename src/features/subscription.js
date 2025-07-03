import axiosInstance from "@/lib/axios";

export const createSubscribe = async (data) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.post(
    "/subscription/create-subscription",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const getSubscribe = async (data) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/subscription", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getAllSubscribe = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/subscription", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("loginRes:", res.data);

  return res.data;
};

export const updateSubscribe = async (data) => {
  console.log("updateSubscribe:", data);

  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.patch(`/subscription/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const deleteSubscribe = async (data) => {
  console.log("deleteSubscribe:", data);

  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.delete(`/subscription/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

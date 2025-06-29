import axiosInstance from "@/lib/axios";

export const createSubscribe = async (data) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getSubscribe = async (data) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getAllSubscribe = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateSubscribe = async (data) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.patch("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const deleteSubscribe = async (data) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.delete("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

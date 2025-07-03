import axiosInstance from "@/lib/axios";

export const getSettings = async ({ url }) => {
  // const cookieStore = cookies();
  // const token = cookieStore.get("token")?.value;
  const token = sessionStorage.getItem("token");

  if (!token) throw new Error("No auth token found");

  const res = await axiosInstance.get("/rules/privacy-policy", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getRules = async ({ url }) => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateSettings = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch("/rules/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateTermAndCondition = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("Admin about us:", data);

  console.log("token:", token);

  const res = await axiosInstance.patch("/rules/term-and-condition", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateAboutUs = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch("/rules/about-us", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

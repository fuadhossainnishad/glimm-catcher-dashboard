import { cookies } from "next/headers";

export const getSettings = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No auth token found");

  const res = await axiosInstance.get("/settings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updatePrivacyPolicy = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch("/settings/privacy-policy", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateTermAndCondition = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch("/settings/term-and-condition", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateAboutUs = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch("/settings/about-us", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

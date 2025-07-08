import axiosInstance from "@/lib/axios";

export const getAdminProfile = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/admin/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);

  return res.data;
};

export const updateAdminProfile = async (data) => {
  const token = sessionStorage.getItem("token");

  let headers = {
    Authorization: `Bearer ${token}`,
  };

  let payload = data;
  if (data instanceof FormData) {
  } else {
    headers["Content-Type"] = "application/json";
  }

  const res = await axiosInstance.patch("/admin/update-profile", payload, {
    headers,
  });
  return res.data;
};
export const changeAdminPassword = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch("/admin/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const resetAdminPassword = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch(
    "/admin/reset-password",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

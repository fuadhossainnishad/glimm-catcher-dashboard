export const getAdminProfile = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/adminProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateAdminProfile = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch(
    "/admin/update-profile",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const changeAdminPassword = async (data) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.patch(
    "/admin/change-password",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
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
  return res;
};

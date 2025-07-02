import axiosInstance from "@/lib/axios";

export const getAllUser = async () => {
  const token = sessionStorage.getItem("token");
  const res = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const deleteUser = async ({ id }) => {
  const token = sessionStorage.getItem("token");
  console.log("token:", token);

  const res = await axiosInstance.delete(
    "/users/delete",
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

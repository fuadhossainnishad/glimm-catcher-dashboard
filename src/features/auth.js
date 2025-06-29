import axiosInstance from "@/lib/axios";

// export const signup = async (
//   fullName,
//   email,
//   password,
//   confirmPassword,
//   phoneNumber,
//   countryCode,
//   role,
// ) => {
//   const res = await axiosInstance.post("/auth/signup", {
//     fullName,
//     email,
//     password,
//     confirmPassword,
//     phoneNumber,
//     countryCode,
//     role,
//   });
//   return res.data;
// };

export const login = async ({ email, password }) => {
  console.log({ email, password });

  const res = await axiosInstance.post(
    "/admin/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
};

export const forgotPassword = async ({ email }) => {
  console.log({ email });

  const res = await axiosInstance.post(
    "/otp/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};

export const otpVerify = async ({ otp }) => {
  console.log({ otp });
  const token = sessionStorage.getItem("token");
  console.log({ token });
  const res = await axiosInstance.post(
    "/otp/forgot-password/verify",
    { otp },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const changePassword = async (data) => {
  console.log({ otp });
  const token = sessionStorage.getItem("token");
  console.log({ token });
  const res = await axiosInstance.post("/auth/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

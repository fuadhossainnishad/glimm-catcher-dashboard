"use server";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

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
  (await cookies()).set("token", res.data.token, {
    httpOnly: true,
    secure: true,
    sameSize: "strict",
    path: "/",
  });
  return res.data;
};

export const forgotPassword = async (data) => {
  console.log(data.email);
  const res = await axiosInstance.post("/admin/forgot-password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const otpVerify = async (data) => {
  console.log("otpVerify:", data);
  const res = await axiosInstance.post("/admin/verify-otp", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const changePassword = async (passwordReset) => {
  const { token, data } = passwordReset;
  console.log(data);
  console.log(token);
  const res = await axiosInstance.post("/admin/reset-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

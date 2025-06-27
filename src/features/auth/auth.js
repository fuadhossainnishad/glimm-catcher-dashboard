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
    "/auth/login",
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

  const res = await axiosInstance.post("/otp/forgot-password", { email });
  return res.data;
};

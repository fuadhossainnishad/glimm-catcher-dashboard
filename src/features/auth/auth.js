import axiosInstance from "@/lib/axios";

export const signup = async (
  fullName,
  email,
  password,
  confirmPassword,
  phoneNumber,
  countryCode,
  role,
) => {
  const res = await axios.post(
    "https://glimmcatcher-backed.onrender.com/spi/v1/auth/signup",
    {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      countryCode,
      role,
    },
  );
  return res.data;
};

export const login = async (email, password) => {
  const res = await axiosInstance.post(
    "https://glimmcatcher-backed.onrender.com/spi/v1/auth/login",
    { email, password },
  );
  return res.data;
};
export const forgotPassword = async (email) => {
  const res = await axios.post("/auth/login", { email });
  return res.data;
};

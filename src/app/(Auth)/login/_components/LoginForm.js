"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import logo from "@/assets/logos/logo.svg";
import Image from "next/image";
import { login } from "@/features/auth/auth";

export default function LoginForm() {
  const router = useRouter();

  const onLoginSubmit = async (data) => {
    console.log(data);
    const loginRes = await login(data);
    console.log("loginRes:",loginRes);

    if (!loginRes.data.success) {
      alert("Login failed");
    }
    router.push("/admin/dashboard");
  };

  return (
    <div className="w-full">
      <section className="mb-4">
        <Image
          src={logo}
          alt="Logo of DAYF Booking"
          height={120}
          width={120}
          className="object-cover object-center"
        />

        <h4 className="mb-1 mt-4 text-2xl font-bold">
          Welcome back to Glimm Catcher
        </h4>
        <p className="text-dark-gray">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="text-primary-blue hover:text-primary-blue/85 mt-2 block text-center font-medium"
        >
          Forgot Password?
        </Link>
      </FormWrapper>
    </div>
  );
}

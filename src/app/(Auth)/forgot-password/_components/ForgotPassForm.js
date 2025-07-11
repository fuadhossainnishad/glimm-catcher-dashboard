"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { forgotPassword } from "@/features/auth";
import { useRouter } from "next/navigation";

export default function ForgotPassForm() {
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("forgotPassword:", data);

    try {
      const res = await forgotPassword(data);
      console.log("res:", res);
      if (res.success) {
        sessionStorage.setItem("email", data.email);
        router.push("/otp-verification");
      }
      alert("Otp sent to email");
    } catch (error) {
      console.error(error);
      alert(
        "Otp sent failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="w-full px-6 py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start hover:text-primary-blue/85 mb-4 gap-x-2 font-medium"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Forgot Password</h4>
        <p className="text-dark-gray">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(forgotPassSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}

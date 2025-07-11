"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UOtpInput from "@/components/Form/UOtpInput";
import { otpVerify } from "@/features/auth";
import { otpSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function VerifyOtpForm() {
  const router = useRouter();
  const onSubmit = async (data) => {
    const email = sessionStorage.getItem("email");
    console.log("otpVerify:", { otp: data.otp, email: email });

    try {
      const res = await otpVerify({ otp: Number(data.otp), email: email });
      console.log("res:", res);

      if (res.success) {
        sessionStorage.setItem("token", res.data?.token);
        router.push("/set-new-password");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Otp verify failed: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="px-6 py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start hover:text-primary-blue/85 mb-4 gap-x-2 font-medium"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Verify OTP</h4>
        <p className="text-dark-gray">
          Enter the otp that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(otpSchema)}>
        <UOtpInput name="otp" />

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

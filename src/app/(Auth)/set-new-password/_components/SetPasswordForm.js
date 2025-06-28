"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { changePassword } from "@/features/auth/auth";
import { resetPassSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SetPasswordForm() {
  const onSubmit = async (data) => {
    console.log("data:", data);

    try {
      const res = await changePassword(data);
      console.log("res:", res);

      if (res.success) {
        alert("password not changed");
        return;
      }
      router.push("/admin/dashboard");
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
        <h4 className="text-3xl font-semibold">Set New Password</h4>
        <p className="text-dark-gray">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(resetPassSchema)}>
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <UInput
          name="confirmPassword"
          label="Confirm Password"
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
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}

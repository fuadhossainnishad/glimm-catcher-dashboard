"use client";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { changeAdminPassword } from "@/features/admin";
import { changePasswordSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePassForm({ profile, refetchProfile }) {
  const [password, setPassword] = useState({});
  const handleSubmit = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    setPassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });
    const res = await changeAdminPassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!res.success) {
      toast.error("Changing admin password failed");
      return;
    }

    toast.success("Password updated successfully");
    refetchProfile();
  };
  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
        defaultValues={{
          id: profile?._id,
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
          confirmPassword: password.confirmPassword,
        }}
      >
        <UInput
          name="oldPassword"
          type="password"
          label="Old Password"
          placeholder="***********"
        />
        <UInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="***********"
        />
        <UInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="***********"
        />

        <Button
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}

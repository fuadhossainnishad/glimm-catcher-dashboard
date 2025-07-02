import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { changeAdminPassword } from "@/features/admin";
import { changePasswordSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useState } from "react";

export default function ChangePassForm({ profile }) {
  const handleSubmit = async (data) => {
    console.log(data);

    const res = await changeAdminPassword({ id: profile?.id, ...data });
    if (!res.success) {
      alert("Changing admin password failed");
      return;
    }
    console.log(res);
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
        defaultValues={{
          id: profile?.id,
          oldPassword: profile?.oldPassword || "eufguysdgsfghfgh",
          newPassword: profile?.newPassword || "eufguysdgsfghfgh",
          confirmPassword: profile?.confirmPassword || "eufguysdgsfghfgh",
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

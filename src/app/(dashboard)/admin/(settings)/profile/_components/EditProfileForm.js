"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { updateAdminProfile } from "@/features/admin";
import { editProfileSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useState } from "react";

export default function EditProfileForm({ profile }) {
  const handleSubmit = async (data) => {
    const res = await updateAdminProfile({ id: profile?.id, ...data });
    if (!res.success) {
      alert("Profile updated failed");
      return;
    }
    console.log(res);
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          id: profile?.id,
          name: profile?.name || "Glimm Catcher",
          email: profile?.email || "glimm-catcher@gmail.com",
          contact: profile?.contact || "+1234567890",
        }}
      >
        <UInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
        />
        <UInput name="email" label="Email" type="email" disabled />
        <UInput
          name="contact"
          label="Contact"
          type="contact"
          placeholder="Enter your phone number"
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

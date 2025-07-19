"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { updateAdminProfile } from "@/features/admin";
import { editProfileSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import toast from "react-hot-toast";

export default function EditProfileForm({ profile, refetchProfile }) {
  const handleSubmit = async (data) => {
    const { fullName, phoneNumber } = data;
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phneNumber", phoneNumber);

    for (let [k, v] of formData.entries()) {
      console.log("FormData entry:", k, v); // confirm here
    }
    const res = await updateAdminProfile(formData);
    if (!res.success) {
      toast.error("Profile updating failed");
      return;
    }
    console.log(res.data);
    refetchProfile();
    toast.success("Profile updated successfully");
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          id: profile?._id,
          fullName: profile?.fullName || "Glimm Catcher",
          email: profile?.email || "glimm-catcher@gmail.com",
          contact: profile?.phoneNumber || "+1234567890",
        }}
      >
        <UInput
          name="fullName"
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

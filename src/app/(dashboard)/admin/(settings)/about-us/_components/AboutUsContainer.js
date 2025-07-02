"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { updateAboutUs } from "@/features/settings";
import { Button } from "antd";
import { Edit } from "lucide-react";

export default function AboutUsContainer({ aboutUs }) {
  const submitHandler = async (data) => {
    const res = await updateAboutUs(data);
    if (!res.success) {
      alert("Updating about us failed");
      return;
    }
    console.log("Admin about us profile:", res);
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">About Us</h3>

      <FormWrapper
        onSubmit={submitHandler}
        defaultValues={{
          aboutUs: aboutUs,
        }}
      >
        <UTextEditor
          name="aboutUs"
          placeholder="Note: Enter details about the website here. (e.g How and why did you come up with the idea? etc)"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full rounded-xl"
          icon={<Edit size={18} />}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}

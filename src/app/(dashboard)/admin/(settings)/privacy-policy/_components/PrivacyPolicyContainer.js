"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { updatePrivacyPolicy } from "@/features/settings";
import { Button } from "antd";
import { Edit } from "lucide-react";

export default function PrivacyPolicyContainer({ privacyPolicy }) {
  const submitHandler = async (data) => {
    const res = await updatePrivacyPolicy(data);
    if (!res.success) {
      alert("Updating privacy policy failed");
      return;
    }
    console.log("Admin privacyPolicy profile:", res);
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Privacy Policy</h3>

      <FormWrapper
        onSubmit={submitHandler}
        defaultValues={{
          privacyPolicy: privacyPolicy,
        }}
      >
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your privacy policy here."
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

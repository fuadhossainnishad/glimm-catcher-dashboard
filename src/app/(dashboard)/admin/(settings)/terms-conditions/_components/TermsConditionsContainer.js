"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { Button } from "antd";
import { Edit } from "lucide-react";

export default function TermsConditionsContainer({ termsAndCondition }) {
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
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper
        onSubmit={submitHandler}
        defaultValues={{
          termsAndCondition: termsAndCondition,
        }}
      >
        <UTextEditor
          name="termsAndCondition"
          placeholder="Note: Enter details about your terms and conditions here."
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

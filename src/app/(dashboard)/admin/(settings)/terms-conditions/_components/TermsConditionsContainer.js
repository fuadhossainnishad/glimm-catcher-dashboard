"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { getRules, updateSettings } from "@/features/settings";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

export default function TermsConditionsContainer() {
  const [termsAndCondition, setTermsAndCondition] = useState(null);

  const submitHandler = async (data) => {
    console.log("Admin about us:", data);
    const res = await updateSettings({
      url: "/rules/privacy-policy",
      update: { content: data.termsAndCondition, type: "terms" },
    });
    if (!res.success) {
      alert("Updating about us failed");
      return;
    }
    setTermsAndCondition(res.data.content);
    console.log("Admin about us profile:", res);
  };

  const fetchTermsAndCondition = async () => {
    const res = await getRules({ url: "/rules/terms-and-condition" });
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    console.log("fetchTermsAndCondition:", res.data.content);

    setTermsAndCondition(res.data.content);
  };

  useEffect(() => {
    fetchTermsAndCondition();
  }, []);

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

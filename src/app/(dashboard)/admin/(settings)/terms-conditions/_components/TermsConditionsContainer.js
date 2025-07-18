"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { getRules, updateSettings } from "@/features/settings";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TermsConditionsContainer() {
  const [termsAndCondition, setTermsAndCondition] = useState(null);

  const submitHandler = async (data) => {
    console.log("Admin about us:", data);
    const res = await updateSettings({
      content: data.termsAndCondition,
      type: "terms",
    });
    if (!res.success) {
      toast.error("Updating term and condition failed");
      return;
    }
    console.log("term and condition:", res);
    await fetchTermsAndCondition();
    toast.success("Terms and conditions updated successfully");
  };

  const fetchTermsAndCondition = async () => {
    const res = await getRules({ url: "/rules/terms-and-condition" });
    if (!res.success) {
      toast.error("Failed to fetch Terms & Conditions content");
    }
    console.log("fetchTermsAndCondition:", res.data.content);

    setTermsAndCondition(res.data?.content);
    console.log("term and condition:", res?.data?.content);
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

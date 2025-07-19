"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { getRules, updateSettings } from "@/features/settings";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PrivacyPolicyContainer() {
  const [privacyPolicy, setPrivacyPolicy] = useState(null);

  const submitHandler = async (data) => {
    const res = await updateSettings({
      content: data.privacyPolicy,
      type: "privacy",
    });
    if (!res.success) {
      toast.error("Updating privacy policy failed");
      return;
    }
    console.log("Admin privacyPolicy profile:", res);
    await fetchPrivacyPolicy();
    toast.success("Privacy policy updated successfully");
  };

  const fetchPrivacyPolicy = async () => {
    const res = await getRules({ url: "/rules/privacy-policy" });
    if (!res.success) {
      toast.error("Failed to fetch privacy policy content");
    }
    console.log("fetchTermsAndCondition:", res.data.content);

    setPrivacyPolicy(res.data.content);
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

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

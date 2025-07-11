"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { getRules, updateSettings } from "@/features/settings";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutUsContainer() {
  const [aboutUs, setAboutUs] = useState(null);

  const submitHandler = async (data) => {
    console.log("Admin about us:", data);
    const res = await updateSettings({
      content: data.aboutUs,
      type: "about",
    });
    if (!res.success) {
      alert("Updating about us failed");
      return;
    }
    console.log("Admin about us profile:", res);
    await fetchAboutus();
  };

  const fetchAboutus = async () => {
    const res = await getRules({ url: "/rules/about" });
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    console.log("fetchaboutus", res.data?.content);

    setAboutUs(res.data?.content);
  };

  useEffect(() => {
    fetchAboutus();
  }, []);
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

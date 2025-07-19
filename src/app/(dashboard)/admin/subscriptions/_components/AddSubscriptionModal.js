import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UMultiSelect from "@/components/Form/UMultiSelect";
import USelect from "@/components/Form/USelect";
import { createSubscribe } from "@/features/subscription";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "antd";
import React from "react";

export default function AddSubscriptionModal({ open, setOpen, onCreated }) {
  const onSubmit = async (data) => {
    console.log(data);
    const res = await createSubscribe(data);
    console.log("sunscription:", res.data);

    if (!res.data.success) {
      toast.error("No subscription created yet");
      return;
    }
    toast.success("New subscription plan created successfully");
    console.log("sunscription:", res.data);
    onCreated?.();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      title="Create new subscription plan"
    >
      <FormWrapper
        onSubmit={onSubmit}
        resolver={zodResolver(createSubscriptionSchema)}
      >
        <UInput
          name="title"
          label="Title"
          placeholder="Enter subscription title"
        />

        <UInput
          name="shortDescription"
          label="Short Description"
          placeholder="Enter short Description"
        />

        <UInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter subscription price"
        />

        <USelect
          name="billingCycle"
          label="Billing Cycle"
          options={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
        />

        <UMultiSelect
          name="features"
          label="Features"
          placeholder="Write features and press enter for adding more..."
          showDropdown={false}
        />
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}

"use client";

import { Button } from "antd";
import { Check } from "lucide-react";
import { useState } from "react";
import EditSubscriptionModal from "./EditSubscriptionModal";
import { Tooltip } from "antd";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { deleteSubscribe } from "@/features/subscription";

export default function SubscriptionCard({
  subscription,
  onUpdated,
  onConfirm,
}) {
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] =
    useState(false);
  const [editSubscription, setEditSubscription] = useState(subscription);

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-white p-4 transition-all hover:shadow-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-lg text-gray-600">
            {subscription.shortDescription}
          </p>
          <div className="space-y-1">
            <h3 className="text-2xl font-medium tracking-tight">
              {subscription.title}
            </h3>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">${subscription.price}</span>
              <span className="text-gray-600">.00</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {subscription.features.map((feature, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <div className="rounded-full bg-primary/10 p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Button
          type="primary"
          className="w-full"
          onClick={() => {
            setShowEditSubscriptionModal(true);
          }}
        >
          Edit
        </Button>
        <Tooltip title="Block User">
          <CustomConfirm
            title="Block User"
            description="Are you sure to delete this subscription?"
            onConfirm={() => onConfirm(subscription._id)}
          >
            <Button
              style={{ backgroundColor: "var(--danger)", color: "white" }}
            >
              Delete
            </Button>
          </CustomConfirm>
        </Tooltip>
        {/* <Button style={{ backgroundColor: "var(--danger)", color: "white" }}>
          Delete
        </Button> */}
      </div>
      <EditSubscriptionModal
        open={showEditSubscriptionModal}
        setOpen={setShowEditSubscriptionModal}
        subscriptionDeatils={editSubscription}
        onUpdated={onUpdated}
      />
    </div>
  );
}

"use client";

import { Button, Flex } from "antd";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddSubscriptionModal from "./AddSubscriptionModal";
import EditSubscriptionModal from "./EditSubscriptionModal";
import Subscriptions from "../page";
import SubscriptionCard from "./SubscriptionCard";

// Static Data
const SUBSCRIPTIONS = [
  {
    key: "monthly",
    slogan: "Unlock the most powerful AI research assistant",
    title: "Monthly",
    cost: "20",
    features: [
      "Unlock AI Generated Images",
      "Pro support from our team",
      "Early access to new features",
    ],
  },
  {
    key: "yearly",
    slogan: "Unlock the most powerful AI research assistant",
    title: "Yearly",
    cost: "40",
    features: [
      "Unlock AI Generated Images",
      "Pro support from our team",
      "Early access to new features",
    ],
  },
];

export default function SubscriptionContainer() {
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] =
    useState(false);
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] =
    useState(false);

  return (
    <div>
      <Flex align="center" justify="space-between">
        <h2 className="mb-5 text-2xl font-semibold">Subscription Plans</h2>

        <Button
          type="primary"
          variant="filled"
          shape="round"
          size="large"
          onClick={() => setShowAddSubscriptionModal(true)}
          icon={<PlusCircle size={20} />}
        >
          Create Subscription Plan
        </Button>
      </Flex>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SUBSCRIPTIONS.map((subscription) => (
          <SubscriptionCard
            key={subscription.key}
            subscription={subscription}
          />
        ))}
      </div>

      {/* Subscription Modal */}
      <AddSubscriptionModal
        open={showAddSubscriptionModal}
        setOpen={setShowAddSubscriptionModal}
      />
      {/* <EditSubscriptionModal
        open={showEditSubscriptionModal}
        setOpen={setShowEditSubscriptionModal}
      /> */}
    </div>
  );
}

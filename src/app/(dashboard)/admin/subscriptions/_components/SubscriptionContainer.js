"use client";

import { Button, Flex } from "antd";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AddSubscriptionModal from "./AddSubscriptionModal";
import SubscriptionCard from "./SubscriptionCard";
import {
  deleteSubscribe,
  getAllSubscribe,
  getSubscribe,
} from "@/features/subscription";

export default function SubscriptionContainer() {
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] =
    useState(false);
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] =
    useState(false);
  const [subscription, setSubcsription] = useState([]);

  const handleSubscription = async () => {
    try {
      const res = await getAllSubscribe();
      console.log("loginRes:", res.data);

      if (!res.success) {
        alert("No subscription created yet");
        return;
      }
      console.log("loginRes:", res.data);
      setSubcsription(res.data);
    } catch (error) {
      console.error(error);
      alert(
        "Get subscription extract failed: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleDeleteSubscription = async (data) => {
    const res = await deleteSubscribe(data);
    if (!res.success) {
      message.error("Failed to fetch users");
    }
    message.success("User blocked successfully");
    await handleSubscription();
  };

  useEffect(() => {
    handleSubscription();
  }, []);

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
        {subscription.map((subscription) => (
          <SubscriptionCard
            key={subscription._id}
            subscription={subscription}
            onUpdated={handleSubscription}
            onConfirm={() => handleDeleteSubscription(subscription)}
          />
        ))}
      </div>

      {/* Subscription Modal */}
      <AddSubscriptionModal
        open={showAddSubscriptionModal}
        setOpen={setShowAddSubscriptionModal}
        onCreated={handleSubscription}
      />
      {/* <EditSubscriptionModal
        open={showEditSubscriptionModal}
        setOpen={setShowEditSubscriptionModal}
      /> */}
    </div>
  );
}

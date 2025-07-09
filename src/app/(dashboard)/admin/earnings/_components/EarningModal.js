"use client";

import { Modal } from "antd";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tag } from "antd";
import { formateDate } from "@/utils/formateDate";

export default function EarningModal({ open, setOpen, earningData }) {
  if (!earningData || !earningData.paidBy) return null;

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Transaction Details"
    >
      <div className="flex-center-between gap-4 rounded-xl bg-demin-primary-50 p-3 px-5">
        <div className="flex-center-start gap-x-2">
          <Image
            src={userImage}
            alt="user image"
            height={2400}
            width={2400}
            className="aspect-square h-auto w-14 rounded-full"
          />

          <h4 className="text-lg font-semibold">
            `${earningData.paidBy.name || "Soumaya"}`
          </h4>
        </div>

        <p className="text-xl font-semibold">
          `${earningData.amount || "86.03"}`
        </p>
      </div>

      <section className="my-4 space-y-5 px-4 text-lg font-medium">
        <div className="flex-center-between">
          <span>Status :</span>
          <Tag color="green" className="!m-0 !text-sm">
            `${earningData.status || "Successful"}`
          </Tag>
        </div>

        <div className="flex-center-between">
          <span>Plan :</span>
          <Tag className="!m-0 !text-sm" color="blue">
            `${earningData.plan || "Monthly"}`
          </Tag>
        </div>

        <div className="flex-center-between">
          <span>Transaction ID :</span>
          <span>`${earningData.transactionId || "#0000008f"}`</span>
        </div>
        <div className="flex-center-between">
          <span>Transaction type :</span>
          <span>`${earningData.transactionType || "Credit Card"}`</span>
        </div>
        <div className="flex-center-between">
          <span>A/C number :</span>
          <span>`${earningData.cardDetails || "*** **** **** *545"}`</span>
        </div>
        <div className="flex-center-between">
          <span>Date :</span>
          <span>`${formateDate(earningData.paymentDate)}`</span>
        </div>
      </section>
    </Modal>
  );
}

"use client";

import { Modal } from "antd";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import { Divider } from "antd";

export default function ProfileModal({ open, setOpen, user }) {
  if (!user) return null;
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-primary py-4">
        <Image
          src={userImage}
          alt="user image"
          height={2400}
          width={2400}
          className="aspect-square h-auto w-[30%] rounded-full object-cover object-center"
        />

        <h4 className="text-3xl font-bold text-white">{user.name}</h4>
      </div>

      <div className="px-12 py-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <div className="text-black">
            <h5 className="font-bold">Name</h5>
            <p className="text-base">{user.name}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Email</h5>
            <p className="text-base">{user.email}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Contact</h5>
            <p className="text-base">{user.contact}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Gender</h5>
            <p className="">{user.gender}</p>
          </div>

          <div className="text-black">
            <h5 className="font-bold">Location</h5>
            <p className="text-base">{user.location}|| location</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

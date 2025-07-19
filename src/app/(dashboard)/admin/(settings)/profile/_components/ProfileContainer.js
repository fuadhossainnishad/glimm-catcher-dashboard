"use client";
import Image from "next/image";
import adminImg from "@/assets/images/user-avatar-md.png";
import { ImagePlus } from "lucide-react";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";
import { Tabs } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAdminProfile, updateAdminProfile } from "@/features/admin";
import { useAdminProfile } from "@/context/adminProfileContext";
import { message } from "antd";
import toast from "react-hot-toast";

export default function ProfileContainer() {
  const [profile, setProfile] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { setAdminProfile } = useAdminProfile();

  const profileHandler = useCallback(async () => {
    const res = await getAdminProfile();
    if (!res.success) {
      toast.error("Fetching admin prfile failed");
      return;
    }
    console.log("Admin profile:", res.data);
    console.log("Admin profile:", res.data.image);

    setProfile(res.data);
    setAdminProfile(res.data);
    setPreviewImage(null);
    message.success("Profile fetched successfully");
  }, [setAdminProfile]);

  useEffect(() => {
    profileHandler();
  }, [profileHandler]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    // formData.append("id", profile._id);
    formData.append("file", file);
    console.log("image:", formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const res = await updateAdminProfile(formData);
    if (!res.success) {
      toast.error("Profile image updating failed");
      return;
    }
    toast.success("Profile image updated");
    profileHandler();
  };

  const tabItems = [
    {
      key: "editProfile",
      label: "Edit Profile",
      children: (
        <EditProfileForm profile={profile} refetchProfile={profileHandler} />
      ),
    },
    {
      key: "changePassword",
      label: "Change Password",
      children: (
        <ChangePassForm profile={profile} refetchProfile={profileHandler} />
      ),
    },
  ];

  return (
    <ConfigProvider>
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={previewImage || profile.image?.url || adminImg}
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="aspect-square h-auto w-[160px] rounded-full border-2 border-primary p-1"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            {/* Edit button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-center absolute bottom-2 right-2 aspect-square rounded-full bg-primary p-2 text-white/95"
            >
              <ImagePlus size={18} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">
              {profile.fullName || "Glimm Catcher"}
            </h3>
            <p className="text-primary-blue mt-1 text-lg font-medium">
              {profile.role || "Administrator"}
            </p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered items={tabItems} />
        </section>
      </div>
    </ConfigProvider>
  );
}

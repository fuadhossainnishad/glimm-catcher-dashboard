"use client";

import { config } from "@/config";
import { getNotification } from "@/features/notification";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

/**
 * Hook to handle admin-only socket connection & notifications
 * @param {boolean} isAdmin - true if the current user is admin
 * @returns {[notification, setNotification]} - state and updater
 */

const useAdminSocket = (admin = false) => {
  const [notification, setNotification] = useState([]);
  const handleFetchNotification = async () => {
    const res = await getNotification({ page: 1, limit: 10 });
    console.log("notification:", res);
    if (!res.success || !Array.isArray(res.data)) {
      toast.error("Failed to fetch notification");
    }
    setNotification(res.data);
    toast.success("Fetched notification");
  };
  useEffect(() => {
    if (!admin) {
      return;
    }
    handleFetchNotification();
    const socket = io(config.server_url, {
      auth: {
        isAdmin: true,
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
    socket.on("notification", (notification) => {
      console.log("Notification received:", notification);
      setNotification((prev) => [notification, ...prev]);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    return () => socket.disconnect();
  }, [admin]);
  return [notification, setNotification];
};

export default useAdminSocket;

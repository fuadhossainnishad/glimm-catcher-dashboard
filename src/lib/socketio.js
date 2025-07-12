"use client";

import { config } from "@/config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

/**
 * Hook to handle admin-only socket connection & notifications
 * @param {boolean} isAdmin - true if the current user is admin
 * @returns {[notification, setNotification]} - state and updater
 */

const useAdminSocket = (admin = false) => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    if (!admin) {
      return;
    }
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
      setNotification((prev) => [...prev, notification]);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    return () => socket.disconnect();
  });
  return [notification];
};

export default useAdminSocket;

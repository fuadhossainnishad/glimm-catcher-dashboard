"use client";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import SidebarContainer from "@/components/shared/SidebarContainer/SidebarContainer";
import { getAdminProfile } from "@/features/admin";
import { Layout } from "antd";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  // const [adminProfile, setAdminProfile] = useState(null);

  return (
    <Layout hasSider>
      <SidebarContainer></SidebarContainer>

      <Layout>
        <HeaderContainer></HeaderContainer>

        <main
          style={{
            maxHeight: "90dvh",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            paddingInline: "50px",
            paddingBlock: "20px",
          }}
        >
          {children}
        </main>
      </Layout>
    </Layout>
  );
}

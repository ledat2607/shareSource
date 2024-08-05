"use client";
import React from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import Heading from "@/app/utils/Heading";
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHeader from "@/app/components/admin/DashboardHeader";
import CourseAnalytics from "../../components/admin/Analytics/CourseAnalytics";
type Props = {};

const page: React.FC<Props> = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Course Analytics - Admin panel`}
          description="Elearning is a platform for student to learn and get help from teacher"
          keywords="Elearning, Redux, Web Application"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] mt-20 min-h-screen p-1">
            <DashboardHeader />
            <CourseAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;

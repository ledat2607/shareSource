"use client"
import React from 'react'
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import Heading from '@/app/utils/Heading';
import AdminProtected from '@/app/hooks/adminProtected';
import DashboardHeader from '@/app/components/admin/DashboardHeader';
import EditFAQ from "../../components/admin/EditFAQ";


type Props = {}

const page: React.FC<Props> = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Hero - Admin panel`}
          description="Elearning is a platform for student to learn and get help from teacher"
          keywords="Elearning, Redux, Web Application"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] min-h-screen mt-20 p-1">
            <DashboardHeader />
            <EditFAQ />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
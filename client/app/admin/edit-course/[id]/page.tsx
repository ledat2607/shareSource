"use client"
import React from 'react'
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import Heading from '@/app/utils/Heading';
import EditCourse from "../../../components/admin/Course/EditCourse";
import AdminProtected from '@/app/hooks/adminProtected';
import DashboardHeader from '@/app/components/admin/DashboardHeader';

type Props = {
  open: boolean;
  setOpen?: any;
};

const page: React.FC<Props> = ({ params}: any,{open, setOpen}) => {
  const id = params.id;
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Edit Course - Admin panel`}
          description="Elearning is a platform for student to learn and get help from teacher"
          keywords="Elearning, Redux, Web Application"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] min-h-screen p-1">
            <DashboardHeader open={open} setOpen={setOpen} />
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
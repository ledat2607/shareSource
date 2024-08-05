"use client"
import React from 'react'
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import Heading from '@/app/utils/Heading';
import CreateCourse from "../../components/admin/Course/CreateCourse";
import AdminProtected from '@/app/hooks/adminProtected';
import DashboardHeader from '@/app/components/admin/DashboardHeader';
type Props = {
  open: boolean;
  setOpen?: any;
}

const page: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Create course - Admin panel`}
          description="Elearning is a platform for student to learn and get help from teacher"
          keywords="Elearning, Redux, Web Application"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] min-h-screen p-1">
          <DashboardHeader open={open} setOpen={setOpen} />
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
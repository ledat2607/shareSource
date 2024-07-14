"use client";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardHero from "../components/admin/DashboardHero";


type Props = {};

const page: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`${user.name} - Admin panel`}
          description="Elearning is a platform for student to learn and get help from teacher"
          keywords="Elearning, Redux, Web Application"
        />
        <div className="flex h-[100vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] p-2">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;

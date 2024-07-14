"use client"
import React, { useEffect, useState } from 'react'
import SidebarProfile from "./SidebarProfile";
import { useLogoutUserQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { motion } from "framer-motion";
import { fadeIn } from "../variant";
import toast from 'react-hot-toast';
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
  user: any;
};

const Profile: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);

  const {} = useLogoutUserQuery(undefined, { skip: !logout ? true : false });

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  const logoutHandle:any = async () => {
    setLogout(true);
    await signOut();
    toast.success("Logout successfull !");
  };

  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="w-[85%] flex m-auto"
    >
            <div className="absolute -left-[100px] -top-[300px] blur-2xl 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[24vh] w-[50vw] hero-animation rounded-full"></div>

      <div
        className={`w-[60px] 800px:w-[20%] h-[450px] dark:bg-slate-900 bg-gray-100 bg-opacity-90 border-[#000000ac] rounded-xl shadow-2xl mt-[80px] mb-[10px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActice={setActive}
          logoutHandle={logoutHandle}
        />
      </div>
      {active === 1 && (
        <div className="800px:w-[75%] pl-4 800px:pl-0 w-[85%]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
      {active === 2 && (
        <div className="800px:w-[75%] 800px:pl-0 pl-4 w-[85%]">
          <ChangePassword user={user} />
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
"use client"
import React, { useEffect, useState } from 'react'
import SidebarProfile from "./SidebarProfile";
type Props = {
  user: any;
};

const Profile: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  const logoutHandle = async () => {
    console.log(`first`);
  };

  return (
    <div className="w-[85%] flex m-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-gray-300 bg-opacity-90 border border-[#000000ac] rounded-xl shadow mt-[80px] mb-[10px] sticky ${
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
    </div>
  );
};

export default Profile;
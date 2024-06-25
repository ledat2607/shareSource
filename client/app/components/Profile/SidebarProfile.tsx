"use client";
import React from "react";
import avatarDefault from "../../../public/assets/avatar.jpg";
type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActice: (active: number) => void;
  logoutHandle: any;
};

const SidebarProfile: React.FC<Props> = ({
  user,
  setActice,
  active,
  avatar,
  logoutHandle,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-t-xl ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActice(1)}
      >
        <img
          src={
            user.avatar || avatar
              ? user.avatar.public_id || avatar
              : avatarDefault
          }
          alt=""
          className="w-[50px] h-[50px] rounded-full cursor-pointer"
        />
        <h5 className="pl-8 800px:block hidden text-[17px] font-Popins dark:text-white text-black">My account</h5>
      </div>
    </div>
  );
};

export default SidebarProfile;

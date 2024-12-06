"use client";
import React from "react";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMessage, AiOutlinePayCircle, AiTwotoneSchedule } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import Link from "next/link";

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
    <div className="w-full h-full flex flex-col justify-between">
      <div
        className={`w-full flex items-center justify-center 800px:justify-start mt-2 overflow-hidden hover:dark:bg-slate-500 hover:bg-blue-400 hover:rounded-3xl hover:scale-105 duration-300  px-3 py-4 cursor-pointer rounded-xl ${
          active === 1
            ? "dark:bg-slate-800 bg-slate-400 shadow-2xl font-[700] "
            : "bg-transparent "
        } `}
        onClick={() => setActice(1)}
      >
        <img
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          className="800px:w-[50px] 800px:h-[50px] rounded-full cursor-pointer object-contain"
        />
        <h5
          className={`pl-8 800px:block hidden text-[17px] font-Popins ${
            active === 1
              ? "text-white dark:text-gray-100 font-[700]"
              : "text-black dark:text-gray-400"
          }`}
        >
          Tài khoản của tôi
        </h5>
      </div>
      <div
        className={`w-full flex items-center justify-center 800px:justify-start mt-2 overflow-hidden hover:dark:bg-slate-500 hover:bg-blue-400 hover:rounded-3xl hover:scale-105 duration-300  px-3 py-4 cursor-pointer rounded-xl ${
          active === 2
            ? "dark:bg-slate-800 bg-slate-400 shadow-2xl"
            : "bg-transparent "
        } `}
        onClick={() => setActice(2)}
      >
        <RiLockPasswordLine size={20} className="text-black dark:text-white" />
        <h5
          className={`pl-8 800px:block hidden text-[17px] font-Popins  ${
            active === 2
              ? "text-white dark:text-gray-100 font-[700]"
              : "text-black dark:text-gray-400"
          }`}
        >
          {" "}
          Đổi mật khẩu
        </h5>
      </div>
      <div
        className={`w-full mt-2 overflow-hidden hover:dark:bg-slate-500 hover:bg-blue-400 hover:rounded-3xl hover:scale-105 duration-300 flex items-center justify-center 800px:justify-start px-3 py-4 cursor-pointer rounded-xl ${
          active === 3
            ? "dark:bg-slate-800 bg-slate-400 shadow-2xl"
            : "bg-transparent "
        } `}
        onClick={() => setActice(3)}
      >
        <AiTwotoneSchedule size={20} className="text-black dark:text-white" />
        <h5
          className={`pl-8 800px:block hidden text-[17px] font-Popins  ${
            active === 3
              ? "text-white dark:text-gray-100 font-[700]"
              : "text-black dark:text-gray-400"
          }`}
        >
          {" "}
          Các khóa học đã tham gia
        </h5>
      </div>

      {user?.role === "admin" ? (
        <Link href={"/admin"}>
          <div
            className={`w-full mt-2 overflow-hidden hover:dark:bg-slate-500 hover:bg-blue-400 hover:rounded-3xl hover:scale-105 duration-300 flex items-center justify-center 800px:justify-start px-3 py-4 cursor-pointer rounded-xl ${
              active === 6
                ? "dark:bg-slate-800 bg-slate-400 shadow-2xl"
                : "bg-transparent "
            } `}
            onClick={() => setActice(6)}
          >
            <GrUserAdmin size={20} className="text-black dark:text-white" />
            <h5
              className={`pl-8 800px:block hidden text-[17px] font-Popins  ${
                active === 6
                  ? "text-white dark:text-gray-100 font-[700]"
                  : "text-black dark:text-gray-400"
              }`}
            >
              {" "}
              Giao diện quản lý
            </h5>
          </div>
        </Link>
      ) : (
        ""
      )}

      <div
        className={`w-full mt-2 overflow-hidden bg-opacity-20 hover:opacity-100 bg-gray-200 dark:bg-slate-800 hover:dark:bg-slate-500 hover:bg-blue-400 hover:rounded-3xl hover:scale-105 duration-300 flex items-center justify-center 800px:justify-start px-3 py-4 cursor-pointer rounded-xl`}
        onClick={() => logoutHandle()}
      >
        <BiLogOutCircle size={20} className="text-black dark:text-white" />
        <h5 className="pl-8 800px:block hidden text-[17px] font-Popins dark:text-white text-black">
          Đăng xuất
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;

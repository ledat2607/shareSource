import { ThemSwitcher } from '@/app/utils/ThemSwitcher';
import React, { useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 flex items-center p-3 justify-end fixed top-0 800px:right-6 right-0">
      <ThemSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div className="800px:w-[450px] w-[75%] h-[90vh] dark:bg-[#111c43] p-3 bg-gray-300 shadow-xl absolute top-16 800px:z-[100] rounded-xl">
          <h5 className="text-center text-[20px] font-Popins text-black dark:text-white p-3 font-[700] z-[100]">
            Thông báo
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-teal-300 rounded-2xl p-3 font-Popins border dark:border-[#000000c1] border-b-[#0000002c]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black font-[700] 800px:text-[18px] text-[14px] dark:text-white">
                Thông báo mới
              </p>
              <p className="text-black 800px:text-[12px] text-[10px] dark:text-white cursor-pointer">
                Đánh dấu là đã đọc
              </p>
            </div>
            <p className="px-2 800px:text-[15px] text-[12px] text-black dark:text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              quasi harum nesciunt facilis ea sed, tempore similique, delectus ?
            </p>
            <p className="px-2 800px:text-[15px] text-[12px] text-black dark:text-white">
              1 ngày trước
            </p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-teal-300 rounded-2xl mt-3 p-3 font-Popins border dark:border-[#000000c1] border-b-[#0000002c]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black font-[700] 800px:text-[18px] text-[14px] dark:text-white">
                Thông báo mới
              </p>
              <p className="text-black 800px:text-[12px] text-[10px] dark:text-white cursor-pointer">
                Đánh dấu là đã đọc
              </p>
            </div>
            <p className="px-2 800px:text-[15px] text-[12px] text-black dark:text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              quasi harum nesciunt facilis ea sed, tempore similique, delectus ?
            </p>
            <p className="px-2 800px:text-[15px] text-[12px] text-black dark:text-white">
              5 ngày trước
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;

"use client";
import React from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import AllInvoices from "../Order/AllInvoices";


type Props = {
  open?: boolean;
  value?: number;
};

const CircularWithValueLabel: React.FC<Props> = ({ open, value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: React.FC<Props> = ({ open, value }) => {
  return (
    <div className="min-h-screen w-full">
      {/*User analytics*/}
      <h1 className="text-black dark:text-[#43cba0] font-[700] text-[50px] pl-8">
        User Analytics
      </h1>
      <div className="grid grid-cols-[50%,50%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[50px] pr-8 flex flex-col items-center">
          <div className="w-[80%] dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45cba0] text-black text-[30px]" />
                <h5 className="pt-2 font-Popins dark:text-white text-black text-[20px]">
                  120
                </h5>
                <h5 className="py-2 font-Popins dark:text-[#45cba0] text-black text-[20px]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularWithValueLabel value={100} open={open} />
                <h5 className="text-center dark:text-white text-black pt-4">
                  +150%
                </h5>
              </div>
            </div>
          </div>
          <div className="w-[80%] dark:bg-[#111c43] rounded-sm shadow my-8">
            <div className="flex items-center justify-between p-5">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45cba0] text-black text-[30px]" />
                <h1 className="pt-2 font-Popins dark:text-white text-black text-[20px]">
                  450
                </h1>
                <h5 className="py-2 font-Popins dark:text-[#45cba0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularWithValueLabel value={100} open={open} />
                <h5 className="text-center dark:text-white text-black pt-4">
                  +150%
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Order analytics*/}
      <h1 className="text-black dark:text-[#43cba0] font-[700] text-[50px] pl-8">
        Order Analytics
      </h1>
      <div className="grid grid-cols-[50%,50%]">
        <div className="p-8">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-white text-black tet-[20px] font-[400] font-Popins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;

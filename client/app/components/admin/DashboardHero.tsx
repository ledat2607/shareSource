"use client"
import React, { FC, useState } from 'react'
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "../../components/admin/Widgets/DashboardWidgets";
type Props = {
  isDashboard?: boolean;

};

const DashboardHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex items-center">
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open}/>}
    </div>
  );
};

export default DashboardHero;
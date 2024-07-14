"use client"
import React, { FC, useState } from 'react'
import DashboardHeader from "./DashboardHeader";

type Props = {}

const DashboardHero: FC<Props> = () => {

  return (
    <div className="w-full flex items-center justify-end 800px:p-6 p-2 fixed top-5 800px:right-6 right-0">
      <DashboardHeader />
    </div>
  );
};

export default DashboardHero;
import React, { FC, useEffect, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import avatarDefault from "../../../public/assets/avatar.jpg";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { zoomIn } from '../variant';
import 'react-pro-sidebar/dist/css/styles.css';

//icon
import {
  HomeOutlinedIcon,
  ArrowBackIosOutlinedIcon,
  ArrowForwardIosOutlinedIcon,
  PeopleOutlineOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  OndemandVideoOutlinedIcon,
  GroupsOutlinedIcon,
  WebOutlinedIcon,
  VideoCallOutlinedIcon,
  QuizOutlinedIcon,
  ManageHistoryRoundedIcon,
  WysiwygOutlinedIcon,
  SettingsOutlinedIcon,
  ExitToAppOutlinedIcon,
} from "./Icon";

interface ItemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
}

const Item: FC<ItemsProps> = ({ title, to, icon, selected, setSelected }) => {
  const { theme } = useTheme();
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className="mt-3"
    >
      <Typography className="!text-[16px] !font-Popins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};
const AdminSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>(undefined);
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 800);
  const [selected, setSelected] = useState('Dashboard');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleMenuItemClick = (title: string) => {
    setSelected(title);
    localStorage.setItem('selectedMenuItem', title);
  };

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);

    const savedSelected = localStorage.getItem('selectedMenuItem');
    if (savedSelected) {
      setSelected(savedSelected);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogout = () => {
    setLogout(true);
  };

  const handleImageClick = () => {
    const imgSrc = user?.avatar?.url;
    setModalImage(imgSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(undefined);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme === "dark" ? "#111c43 " : "#fff "}`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: theme === "dark" ? "#00EE00 !important" : "#FF0000 !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111c43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu>
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 11000,
              padding: isCollapsed ? "0" : "10px",
              borderRadius: "20px",
              boxShadow: "2px 2px rgba(27,26,48,0.2)",
            }}
            className={`${theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
          >
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={
                isCollapsed ? (
                  <IconButton>
                    <ArrowForwardIosOutlinedIcon />
                  </IconButton>
                ) : undefined
              }
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Link href={"/"}>
                    <h3 className="text-[25px] font-Popins dark:text-white text-black">
                      Elearning
                    </h3>
                  </Link>
                  <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="inline-block"
                  >
                    <ArrowBackIosOutlinedIcon className="text-black dark:text-white" />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    onClick={handleImageClick}
                    alt="profile"
                    src={user?.avatar ? user.avatar?.url : avatarDefault}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      border: "3px solid #5b6fe6",
                      width: "100px",
                      height: "100px",
                      zIndex: 11000,
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    className="!text-[20px] text-black dark:text-[#ffffffc1]"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="!text-[20px] text-black dark:text-[#ffffffc1]"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    - {user.role}
                  </Typography>
                </Box>
              </Box>
            )}
          </div>
          <Box paddingLeft={isCollapsed ? undefined : "4%"}>
            <Item
              title="Quản lý"
              to="/admin/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 0 0" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[500]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Học viên"
              to="/admin/users"
              icon={<PeopleOutlineOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Item
              title="Lượt đăng ký"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 0 0" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[500]"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Thêm mới khóa học"
              to="/admin/create-course"
              icon={<VideoCallOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Item
              title="Tất cả khóa học"
              to="/admin/all-courses"
              icon={<OndemandVideoOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 0 0" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[500]"
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Item
              title="Danh mục"
              to="/admin/categories"
              icon={<WysiwygOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 0 0" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[500]"
            >
              {!isCollapsed && "Manage Team"}
            </Typography>
            <Item
              title="Quản lý Team"
              to="/admin/manage-team"
              icon={<GroupsOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 0 0" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[500]"
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Thống kê khóa học"
              to="/admin/course-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Item
              title="Thống kê đăng ký khóa học"
              to="/admin/order-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Item
              title="Thống kê người dùng"
              to="/admin/user-analytics"
              icon={<ManageHistoryRoundedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 0 0" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[500]"
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Cài đặt"
              to="/admin/setttings"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={handleMenuItemClick}
            />
            <div onClick={handleLogout}>
              <Item
                title="Đăng xuất"
                to="/admin/logout"
                icon={<ExitToAppOutlinedIcon />}
                selected={selected}
                setSelected={handleMenuItemClick}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
      {showModal && modalImage && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[500000]"
          variants={zoomIn(0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg">
            <img
              alt=""
              src={modalImage}
              className="w-[200px] h-[200px] object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-1"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </Box>
  );
};

export default AdminSidebar;

'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemSwitcher } from "../utils/ThemSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verifycation from "../components/Auth/Verifycation";
import { useSelector } from "react-redux";
import avatarHeader from "../../public/assets/avatar.jpg";
import { useSession } from "next-auth/react";
import { useLogoutUserQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: (route: string) => void;
  route: string;
};


const Header: React.FC<Props> = ({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const {data}= useSession()
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  const {} = useLogoutUserQuery(undefined, { skip: !logout ? true : false });



  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          name: data.user?.name,
          email: data.user?.email,
          avatar: data.user?.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Đăng nhập thành công !!!");
    }
    if (data === null && !user) {
      setLogout(true);
    }
    if(user){
      setLogout(false);
    }
  }, [data, user]);
  

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideBar(false);
    }
  };
  return (
    <div className="w-full">
      <div
        className={`${
          active
            ? "dark:bg-opacity-90 dark:bg-black bg-gray-200 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[85%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between 800px:p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Popins font-[500] dark:text-white text-red-500 cursor-pointer`}
              >
                TP - Elearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemSwitcher />
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSideBar(true)}
                />
              </div>
              {user ? (
                <>
                  <Link href={"/profile"}>
                    <img
                      src={user.avatar ? user.avatar.url : avatarHeader}
                      alt=""
                      className="w-[40px] h-[40px] ml-4 rounded-full cursor-pointer"
                      style={{
                        border: activeItem === 5 ? "2px solid #ffc107" : "",
                      }}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <HiOutlineUserCircle
                    size={30}
                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/*mobile sidebar*/}
        {openSidebar && (
          <div
            onClick={handleClose}
            className="fixed w-full h-screen top-0 left-0 z-[999] dark:bg-[unset] bg-[#00000024]"
            id="screen"
          >
            <div
              className="w-[70%] items-center flex flex-col fixed z-[99999] h-screen rounded-tl-3xl dark:bg-black  top-0 right-0"
              style={{
                overflow: "hidden",
              }}
            >
              <h1 className="flex items-center mt-5 text-[30px] dark:text-red-500 text-black">
                TP
                <p className="ml-2 text-[25px] dark:!text-white text-green-500">
                  Elearning.
                </p>
              </h1>
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <>
                  <Link href={"/profile"}>
                    <img
                      src={user?.avatar ? user.avatar.url : avatarHeader}
                      alt=""
                      className="w-[80px] h-[80px] 800px:ml-4 rounded-full cursor-pointer"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <HiOutlineUserCircle
                    size={25}
                    className="text-[18px] text-black dark:text-white"
                    onClick={() => setOpen(true)}
                  />
                </>
              )}
              <br />
              <br />
              <br />
              <p className="text-[16px] font-[700] px-2 pl-5 text-black dark:text-black">
                &copy; Copyright 2024 Elearning
              </p>
              <style jsx>{`
                @keyframes gradientBorder {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
                div::before {
                  content: "";
                  position: absolute;
                  top: -2px;
                  left: -2px;
                  right: -2px;
                  bottom: -2px;
                  z-index: -1;
                  background: linear-gradient(
                    270deg,
                    #ff7e5f,
                    #feb47b,
                    #86a8e7,
                    #91eae4
                  );
                  background-size: 600% 600%;
                  animation: gradientBorder 8s ease infinite;
                  border-radius: inherit;
                }
                div::after {
                  content: "";
                  position: absolute;
                  top: 2px;
                  left: 2px;
                  right: 2px;
                  bottom: 2px;
                  z-index: -1;
                  border-radius: inherit;
                }
                .dark div::after {
                  background: #1f2937; /* dark mode background color */
                }
              `}</style>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verifycation}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
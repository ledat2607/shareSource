"use client";
import React, { FC, useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Protected from "../hooks/userProtected";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // Giả sử thời gian tải dữ liệu là 2 giây
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} profile`}
          description="Elearning is a platform for student to learn and get help from teacher"
          keywords="Elearning, Redux, Web Application"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default page;

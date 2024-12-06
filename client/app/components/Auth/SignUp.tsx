import { styles } from '@/app/style/styles';
import React, { FC, useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    AiFillFacebook,
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineGithub,
    AiOutlineGoogle,
  } from "react-icons/ai";
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    setRoute: (route: string) => void;
}

const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email !"),
  password: Yup.string().required("Please enter your password !").min(8),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm pasword doesn't match with password")
    .required("Please enter your confirm password !"),
  name: Yup.string().required("Please enter your full name").min(12),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();


  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfull !";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);
  
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirm: "" },
    validationSchema: schemaLogin,
    onSubmit: async ({ name, email, password }) => {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });
  //get data from localstorage when from verification -> sign up
  useEffect(() => {
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem("email") || "";
    const password = localStorage.getItem('password') || '';
    formik.setValues({ name, email, password, confirm: '' });
  }, []);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title} mb-10`}>Tham gia TP - Elearning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="name">
          Họ và tên
        </label>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Thomas Jonh...."
          className={`${
            errors.name && touched.name && "border-red-500"
          } w-full text-black dark:text-white bg-transparent border rounded-lg mt-4 px-2 py-3 font-Popins`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <label className={`${styles.label} !mt-2`} htmlFor="email">
          Địa chỉ email
        </label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="loginmail@gmail.com"
          className={`${
            errors.email && touched.email && "border-red-500"
          } w-full text-black dark:text-white bg-transparent border rounded-lg mt-4 px-2 py-3 font-Popins`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative">
          <label className={`${styles.label}`} htmlFor="password">
            Nhập mật khẩu
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Mật khẩu...."
            className={`${
              errors.password && touched.password && "border-red-500"
            } w-full text-black dark:text-white bg-transparent border rounded-lg mt-4 px-2 py-3 font-Popins`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 text-black dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 text-black dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5 relative">
          <label className={`${styles.label}`} htmlFor="confirm">
            Xác nhận mật khẩu
          </label>
          <input
            type={confirm ? "text" : "password"}
            name="confirm"
            value={values.confirm}
            onChange={handleChange}
            id="password"
            placeholder="Xác nhận mật khẩu...."
            className={`${
              errors.password && touched.password && "border-red-500"
            } w-full text-black dark:text-white bg-transparent border rounded-lg mt-4 px-2 py-3 font-Popins`}
          />
          {!confirm ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 text-black dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setConfirm(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 text-black dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setConfirm(false)}
            />
          )}
        </div>
        {errors.confirm && touched.confirm && (
          <span className="text-red-500 pt-2 block">{errors.confirm}</span>
        )}
        <div className="mb-6">
          <input type="submit" value="Đăng ký" className={`${styles.button}`} />
        </div>
        <div className="text-center font-Popins text-[20px] text-black dark:text-white">
          Hoặc
        </div>
        <div className="flex items-center justify-center my-3 p-2">
          <AiOutlineGoogle
            size={35}
            className="cursor-pointer mr-2 text-black dark:text-white hover:text-green-500 transition-all duration-300 hover:scale-125"
          />
          <AiFillFacebook
            size={35}
            className="cursor-pointer ml-4 mr-2 text-black dark:text-white hover:text-blue-500 transition-all duration-300 hover:scale-125"
          />
          <AiOutlineGithub
            size={35}
            className="cursor-pointer ml-4 mr-2 text-black dark:text-white hover:text-red-500 transition-all duration-300 hover:scale-125"
          />
        </div>
        <h5 className="text-center text-black dark:text-white pt-4 font-Popins text-[15px]">
          Đã có tài khoản ?{" "}
          <span
            onClick={() => setRoute("Login")}
            className="text-[#4548e2] cursor-pointer ml-4"
          >
            Đăng nhập
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
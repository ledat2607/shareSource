import React, { FC, useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGithub,
  AiOutlineGoogle,
} from "react-icons/ai";
import { styles } from '@/app/style/styles';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';


type Props = {
  setRoute: (route: string) => void;
  setOpen: (route: boolean) => void;
};

const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your valid email !"),
  password: Yup.string().required("Please enter your password !").min(8),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, data,error, isError }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schemaLogin,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });
  useEffect(() => {
   if(isSuccess){
    toast.success("Login successfull !");
    setOpen(false);
   }
   if(error){
    if ("data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
   }
  }, [isSuccess, error])
  
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title} mb-10`}>Login to LMS - Elearning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter your email
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
            Enter your password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password...."
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
        <div className="mb-6">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <div className="text-center font-Popins text-[20px] text-black dark:text-white">
          Or
        </div>
        <div className="flex items-center justify-center my-3 p-2">
          <AiOutlineGoogle
            onClick={() => signIn("google")}
            size={35}
            className="cursor-pointer mr-2 text-black dark:text-white hover:text-green-500 transition-all duration-300 hover:scale-125"
          />

          <AiOutlineGithub
            onClick={() => signIn("github")}
            size={35}
            className="cursor-pointer ml-4 mr-2 text-black dark:text-white hover:text-red-500 transition-all duration-300 hover:scale-125"
          />
        </div>
        <h5 className="text-center text-black dark:text-white pt-4 font-Popins text-[15px]">
          No have account ?{" "}
          <span
            onClick={() => setRoute("Sign-up")}
            className="text-[#4548e2] cursor-pointer ml-4"
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
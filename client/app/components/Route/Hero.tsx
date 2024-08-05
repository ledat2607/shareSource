'use client'
import React, { FC } from "react";
import { fadeIn } from '../variant';
import { motion } from "framer-motion";
import { BsArrowRight } from 'react-icons/bs';
import Image from "next/image";
import Link from "next/link";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, refetch } = useGetHeroDataQuery("Banner", {});

  return (
    <div className="w-full 1000px:flex 1000px:mt-[100px] relative mb-20">
      <div className="absolute -left-[100px] -top-[300px] blur-2xl 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[24vh] w-[50vw] hero-animation rounded-full"></div>
      <div className="1000px:w-[40%] 1100px:w-[55%] 800px:w-[60%] w-[40%] mx-auto flex justify-center mt-[50px] 1000px:pt-0 z-10">
        <motion.div
          variants={fadeIn("down", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="relative rounded-full border-gradient-animation"
        >
          <img
            width={500}
            height={500}
            src={data?.layoutData.banner.image.url}
            alt=""
            className="object-cover rounded-full 1000px:w-[500px] 1000px:h-[500px] w-full h-[170px]"
          />
        </motion.div>
      </div>
      <div className="1000px:w-[60%] w-[80%] 1000px:mt-20 flex flex-col mx-auto text-center 1000px:text-left mt-[20px]">
        <motion.h2
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="dark:text-white flex-initial capitalize items-center text-black text-[30px] w-[90%] 1000px:text-[50px] font-[600] font-Josefin 1000px:leading-[75px]"
        >
          {data?.layoutData.banner.title}
        </motion.h2>
        <br />
        <motion.p
          variants={fadeIn("right", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="dark:text-white text-black font-Popins w-[90%] font-[600] 1000px:text-[20px] text-[18px]"
        >
          {data?.layoutData.banner.subTitle}
        </motion.p>
        <motion.div
          variants={fadeIn("right", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="1500px:w-[65%] mt-8 flex items-center 1100px:w-[78%] w-[90%] bg-transparent"
        >
          <input
            type="search"
            className="w-full focus:ring-2 bg-gray-300 border-black focus:py-5 focus:ring-blue-500 focus:border-0 dark:border-white h-[40px] rounded-2xl px-3 py-5 dark:text-white text-black focus:outline-none border-2 border-transparent transition-colors duration-300"
            placeholder="Search here..."
          />
          <div className="w-[150px] h-[40px] cursor-pointer dark:text-black text-white duration-300 hover:translate-x-3 dark:bg-white bg-gray-500 ml-6 rounded-2xl flex items-center justify-center">
            <p>Search</p>
            <BsArrowRight className="ml-2" />
          </div>
        </motion.div>
        <br />
        <motion.div
          variants={fadeIn("left", 0.7)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-6 1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center"
        >
          <Image
            src={require("../../../public/assets/img1.jpg")}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <Image
            src={require("../../../public/assets/img1.jpg")}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover -ml-[20px] shadow-sm"
          />
          <Image
            src={require("../../../public/assets/img1.jpg")}
            alt=""
            className="w-[50px] h-[50px] rounded-full -ml-[20px] object-cover"
          />
          <p className="font-Josefin dark:text-[#62c559] 800px:text-[20px] text-[12px] text-black pl-4">
            100K+ People trust us.
          </p>
          <Link
            href={"/courses"}
            className="dark:text-[#62c559] ml-4 cursor-pointer  flex items-center hover:translate-x-4 duration-300 hover:dark:text-white hover:text-red-500"
          >
            <p className="hidden 800px:block"> View all courses</p>
            <BsArrowRight className="ml-2" title="View all courses" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

"use client"
import React from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { IoCheckmarkDone, IoCheckmarkOutline } from "react-icons/io5";
import Rating from "../../../utils/Rating";





type Props = {
  active: number;
  setActive: (active: number) => void;
  handleCreateCourse: any;
  courseContent: any;
  type: string;
};

const CourseReview: React.FC<Props> = ({
  active,
  setActive,
  handleCreateCourse,
  courseContent,
  type,
}) => {
  const PrevButton = () => {
    setActive(active - 1);
  };
  const estimatedPrice = typeof courseContent.estimatePrice === 'string'
  ? parseFloat(courseContent.estimatePrice)
  : courseContent.estimatePrice;

const discountPercent =
  ((estimatedPrice - courseContent.price) / estimatedPrice) * 100;
  const discountPercentPrice = discountPercent.toFixed();
  const CreateCourse = async () => {
    await handleCreateCourse();
  };
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto 800px:mt-24 mt-16">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseContent?.demoUrl}
            title={courseContent?.title}
          />
        </div>
      </div>
      <div className="flex items-center">
        <h1 className="pt-5 text-[30px] text-black dark:text-white">
          {courseContent?.price === 0 ? "Free" : courseContent.price + "$"}
        </h1>
        <h4 className="pt-5 text-[20px] line-through opacity-80 text-black dark:text-white ml-5">
          {courseContent?.estimatedPrice}
        </h4>
        <h5 className="pt-5 text-[15px] text-black dark:text-white ml-5">
          {discountPercentPrice} %
        </h5>
      </div>
      <div className="flex items-center">
        <div className="w-[180px] my-3 font-Popins bg-[crimson] cursor-not-allowed rounded-full py-3 flex items-center justify-center text-[18px] text-white">
          Mua ngay {courseContent?.price} $
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          name=""
          id=""
          placeholder="Dicsount code..."
          className="w-[70%] mt-5 bg-gray-200/80 dark:bg-slate-800 px-3 py-3 text-black dark:text-white outline-none rounded-2xl"
        />
        <div className="w-[150px] mt-5 rounded-2xl hover:translate-x-4 bg-gray-200/80 transition-all duration-500 cursor-pointer ml-3 px-3 py-3 dark:bg-slate-800 text-black dark:text-white flex justify-center items-center">
          Áp dụng
        </div>
      </div>
      <div className="w-[80%] flex items-center justify-between">
        <p className="pb-1 800px:mt-4 flex items-center text-black dark:text-white">
          <IoCheckmarkDone
            size={25}
            className="mr-3 text-black dark:text-white"
          />
          Bao gồm mã nguồn
        </p>
        <p className="pb-1 800px:mt-4 flex items-center text-black dark:text-white">
          <IoCheckmarkDone
            size={25}
            className="mr-3 text-black dark:text-white"
          />
          Truy cập không giới hạn
        </p>
        <p className="pb-1 800px:mt-4 flex items-center text-black dark:text-white">
          <IoCheckmarkDone
            size={25}
            className="mr-3 text-black dark:text-white"
          />
          Chứng chỉ hoàn thành
        </p>
        <p className="pb-1 800px:mt-4 flex items-center text-black dark:text-white">
          <IoCheckmarkDone
            size={25}
            className="mr-3 text-black dark:text-white"
          />
          Hỗ trợ 24/24
        </p>
      </div>
      <div className="w-[90%] ">
        <div className="w-full">
          <h1 className="text-[35px] mt-2 font-Popins font-[600] text-black dark:text-green-500">
            {courseContent?.name}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Rating rating={0} />
              <h5 className="text-black dark:text-white font-Josefin text-[18px]">
                0 đánh giá
              </h5>
            </div>
            <h5 className="text-black dark:text-white font-Josefin text-[18px]">
              0 học viên
            </h5>
          </div>
          <h1 className="text-[25px] text-black dark:text-green-500 mt-4 font-[600] font-Josefin">
            Bạn sẽ học được gì từ khóa học ?
          </h1>
          {courseContent?.benefits?.map((item: any, index: number) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkOutline
                  size={20}
                  className="text-black dark:text-white"
                />
              </div>
              <p className="ml-2 text-black dark:text-white">{item.title}</p>
            </div>
          ))}
          <h1 className="text-[25px] text-black dark:text-green-500 mt-4 font-[600] font-Josefin">
            Bạn cần chuẩn bị gì khi tham gia khóa học ?
          </h1>
          {courseContent?.prerequisites?.map((item: any, index: number) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkOutline
                  size={20}
                  className="text-black dark:text-white"
                />
              </div>
              <p className="ml-2 text-black dark:text-white">{item.title}</p>
            </div>
          ))}
          <div className="w-full">
            <h1 className="text-[25px] font-[600] text-black mt-4 dark:text-green-500">
              Chi tiết khóa học
            </h1>
            <p className="text-black text-[20px] dark:text-white font-Josefin">
              {courseContent.description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 flex justify-between">
        <div
          className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:-translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
          onClick={() => PrevButton()}
        >
          Quay lại
        </div>
        {type === "create" ? (
          <div
            className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
            onClick={() => CreateCourse()}
          >
            Tạo
          </div>
        ) : (
          <div
            className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
            onClick={() => CreateCourse()}
          >
            Chỉnh sửa
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReview;
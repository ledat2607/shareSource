import Rating from "@/app/utils/Rating";
import { useLoadUserQuery } from "@/redux/features/api/appSlice";
import { useUpdateCourseMutation } from "@/redux/features/user/userApi";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {
  item: any;
  isProfile?: boolean;
  index: number;
};

const CourseCard: React.FC<Props> = ({ item, isProfile }) => {
  const { theme } = useTheme();
  const { data, refetch } = useLoadUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const dataUser = data?.user;
  const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation();

  const handleUpdate = async (id: any) => {
    await updateCourse({ userId: dataUser._id, courseId: id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Update status course successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

 // Kiểm tra trạng thái của course
  const courseStatus = dataUser?.courses.find(
    (course: any) => course.courseId === item._id
  )?.status;

  return (
    <div className="relative">
      <Link
        href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
      >
        <div className="course-card w-full min-h-[40vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border rounded-lg p-3 shadow-sm dark:shadow-inner relative">
          <Image
            width={500}
            height={500}
            objectFit="cover"
            className="rounded-lg"
            src={item.thumbnail.url ? item.thumbnail.url : item.thumbnail}
            alt=""
          />
          <h1 className="font-Popins mt-2 text-[15px] text-black dark:text-[#fff]">
            {item.name}
          </h1>
          <div className="w-full flex items-center justify-between pt-2">
            <Rating rating={item.rating} />
            <h5
              className={`text-black dark:text-white ${
                isProfile && "hidden 800px:inline"
              }`}
            >
              {item.purchased} Students
            </h5>
          </div>
          <div className="w-full flex items-center justify-between pt-2">
            <div className="flex">
              <h3 className="text-black dark:text-white font-Josefin text-[20px] font-[700]">
                $ {item.price === 0 ? "Free" : item.price}
              </h3>
              <h5 className="pl-3 text-[20px] text-[crimson] line-through opacity-80 dark:text-white font-Josefin font-[700]">
                $ {item.estimatePrice ? item.estimatePrice : ""}
              </h5>
            </div>
            <div className="flex items-center pb-3">
              <AiOutlineUnorderedList
                size={20}
                fill={theme === "dark" ? "#fff" : "#000"}
              />
              <h5 className="text-black dark:text-white">
                {item.courseData.length} Lectures
              </h5>
            </div>
          </div>
        </div>
      </Link>
      {isProfile && (
        <div
          onClick={() => handleUpdate(item._id)}
          className={`w-[150px] absolute bottom-10 left-3 flex items-center justify-center text-white h-[30px] cursor-pointer rounded-2xl transition-all duration-300 ${
            courseStatus === "Complete"
              ? "bg-gray-500 opacity-80 cursor-not-allowed"
              : "bg-green-500 hover:translate-x-2"
          }`}
        >
          {courseStatus === "Complete" ? "Complete" : "Mark as Complete"}
        </div>
      )}
    </div>
  );
};

export default CourseCard;

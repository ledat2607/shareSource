import { useGetAllUserCoursesQuery } from "@/redux/features/courses/apiCourse";
import React from "react";
import CourseCard from "../Courses/CourseCard";

type Props = {
  user: {
    courses: { id: string }[];
  };
};

const ErrolCourse: React.FC<Props> = ({ user }) => {
  const { isLoading, data } = useGetAllUserCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  // Nếu đang tải dữ liệu, có thể hiển thị một thông báo hoặc spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const datacourse = data?.course || []; // Điều chỉnh dựa trên cấu trúc thực tế của data

  // Lấy danh sách ID từ user.courses
  const userCourseIds = user.courses.map((course: any) => course.courseId);

  // Tìm các course trong datacourse có ID trùng với các ID trong user.courses
  const commonCourses = datacourse.filter((dataCourse: any) =>
    userCourseIds.includes(dataCourse._id)
  );
  return (
    <div className="w-[90%] mt-10 m-auto">
      {commonCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-[20px] lg:grid-cols-3 lg:gap-[30px] xl:grid-cols-3 xl:gap-[30px] 1500px:grid-cols-3 1500px:gap-[30px]">
          {commonCourses.map((course: any, index: number) => (
            <CourseCard index={index} item={course} isProfile={true} />
          ))}
        </div>
      ) : (
        <p className="min-h-screen w-full flex justify-center items-center text-[20px] font-Josefin font-[700] text-black dark:text-white">
          No matching courses found.
        </p>
      )}
    </div>
  );
};

export default ErrolCourse;

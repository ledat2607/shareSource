import { useGetAllUserCoursesQuery } from '@/redux/features/courses/apiCourse';
import React, { useEffect, useState } from 'react'
import CourseCard from "./CourseCard";
type Props = {}

const Courses = (props: Props) => {
  const { data, refetch } = useGetAllUserCoursesQuery({});
  const [courseData, setCourseData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCourseData(data.course);
    }
  }, [data]);
  return (
    <div className="mt-40">
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center text-black dark:text-white font-Popins text-[25px] leading-3 sm:text-4xl 800px:!leading-[60px] font-[700]">
          Expand your Career
          <span className="text-gradient"> Opportunity</span>
          <br />
          <span className="gradient-text">Opportunity with our Courses</span>
        </h1>
        <div className="grid grid-cols-1 mt-10 gap-[20px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] 800px:ml-12 ml-0 border-0">
          {courseData &&
            courseData.map((item: any, index: number) => (
              <>
                <CourseCard item={item} index={index} isProfile={false} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
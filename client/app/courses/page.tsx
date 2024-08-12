"use client";
import { useGetAllUserCoursesQuery } from "@/redux/features/courses/apiCourse";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../style/styles";
import CourseCard from "../components/Courses/CourseCard";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {});
  const { data: categories } = useGetHeroDataQuery("Category");
  const categoriesData = categories?.layoutData.category;
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState([]);
  const [category, setCategory] = useState("ALL");

  console.log(course);


  useEffect(() => {
    if (data && data.course) {
      let filteredCourses = data.course;

      if (category !== "ALL") {
        filteredCourses = filteredCourses.filter(
          (item: any) => item.categories === category
        );
      }

      if (search) {
        filteredCourses = filteredCourses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCourse(filteredCourses);
    }
  }, [data, category, search]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] 800px:w-[80%] m-auto min-h-[70vh]">
            <Heading
              title="All course - Elearning"
              description=""
              keywords="programing"
            />
            <div className="w-full flex items-center flex-wrap">
              <div
                onClick={() => setCategory("ALL")}
                className={`h-[35px] ${
                  category === "ALL" ? "bg-[crimson]" : "bg-[#5058cb]"
                } m-3 px-3 rounded-2xl text-white font-[700] flex items-center justify-center font-Popins cursor-pointer`}
              >
                ALL
              </div>
              {categoriesData &&
                categoriesData?.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5058cb]"
                      } m-3 px-3 rounded-2xl text-white font-[700] flex items-center justify-center font-Popins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {course && course.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No course found"
                  : "No course found in this category. Please try another one !"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:grap-[30x] 1500px:grid-cols-4">
              {course &&
                course.map((item: any, index: number) => (
                  <CourseCard item={item} index={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

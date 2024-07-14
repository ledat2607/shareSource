"use client"
import React, { useEffect, useState } from 'react'
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CourseReview from "./CourseReview"
import { useCreateCourseMutation } from '@/redux/features/courses/apiCourse';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';


type Props = {}

const CreateCourse = (props: Props) => {
  const [createCourse, { isLoading, error, isSuccess }] =
    useCreateCourseMutation();
    useEffect(() => {
      if (isSuccess) {
        toast.success("Course create successfull!");
        redirect("/admin/all-courses");
      }
      if (error) {
        if ("data" in error) {
          const errMessage = error as any;
          toast.error(errMessage.data.message);
        }
      }
    }, [isLoading, isSuccess, error]);
    
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
      name: "",
      descriptions: "",
      price: "",
      estimatePrice: "",
      tags: "",
      level: "",
      demoUrl: "",
      thumbnail: "",
    });
    const [benefits, setBenifits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContent, setCourseContent] = useState([
      {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section 1",
        links: [{ title: "", url: "" }],
        suggestion: "",
      },
    ]);
    const [course, setCourse] = useState({});
    const handleSubmit = async()=>{
      const fomattedBenefits = benefits.map((benefit) => ({
        title: benefit.title,
      }));
      const fomattedPrerequisites = prerequisites.map((prerequisite) => ({
        title: prerequisite.title,
      }));
      const formattedCourseContent = courseContent.map((data) => ({
        videoUrl: data.videoUrl,
        title: data.title,
        description: data.description,
        videoSection: data.videoSection,
        links: data.links.map((link) => ({ title: link.title, url: link.url })),
        suggestion: data.suggestion,
      }));
      const data = {
        name: courseInfo.name,
        description: courseInfo.descriptions,
        price: courseInfo.price,
        estimatePrice: courseInfo.estimatePrice,
        tags: courseInfo.tags,
        thumbnail: courseInfo.thumbnail,
        level: courseInfo.level,
        demoUrl: courseInfo.demoUrl,
        totalVideos: courseContent.length,
        benefits: fomattedBenefits,
        prerequisites: fomattedPrerequisites,
        courseData: formattedCourseContent,
      };
      setCourse(data);
    }
    const handleCreateCourse = async(e:any)=>{
      if (!isLoading) {
        await createCourse({ data: course });
      }
    }
  return (
    <div className="w-full flex min-h-screen">
      <div className="800px:w-[80%] w-full">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenifits={setBenifits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContent}
            setCourseContentData={setCourseContent}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CourseReview
            active={active}
            setActive={setActive}
            handleCreateCourse={handleCreateCourse}
            courseContent={course}
          />
        )}
      </div>
      <div className="1100px:w-[20%] 1100px:block hidden mt-[112px] h-[100vh] fixed z-[-1] top-18 right-8">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
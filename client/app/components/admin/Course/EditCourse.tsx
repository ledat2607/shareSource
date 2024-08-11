"use client"
import React, { useEffect, useState } from 'react'
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CourseReview from "./CourseReview"
import {  useEditCourseMutation, useGetAllCourseQuery } from '@/redux/features/courses/apiCourse';
import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';


type Props = {
  id: string;
};

const EditCourse: React.FC<Props> = ({ id }) => {
  const { isLoading, data, refetch } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, { isLoading: editCourseLoading, isSuccess, error }] =
    useEditCourseMutation();
  const editCourseData = data && data?.allCourse?.find((i: any) => i._id === id);
    useEffect(() => {
      if (isSuccess) {
        toast.success("Update create successfull!");
        redirect("/admin/all-courses");
      }
      if (error) {
        if ("data" in error) {
          const errMessage = error as any;
          toast.error(errMessage.data.message);
        }
      }
    }, [editCourseLoading, isSuccess, error]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        descriptions: editCourseData.description,
        price: editCourseData.price,
        estimatePrice: editCourseData.estimatePrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        categories: editCourseData.categories,
        thumbnail: editCourseData.thumbnail,
      });
      setBenefit(editCourseData.benefit);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContent(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    descriptions: "",
    price: "",
    estimatePrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefit, setBenefit] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContent, setCourseContent] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section 1",
      videoLength: "",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [course, setCourse] = useState({});
  const handleSubmit = async () => {
    const fomattedBenefits = benefit.map((benefit) => ({
      title: benefit.title,
    }));
    const fomattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContent = courseContent.map((data) => ({
      videoUrl: data.videoUrl,
      title: data.title,
      description: data.description,
      videoLength: data.videoLength,
      videoSection: data.videoSection,
      links: data.links.map((link) => ({ title: link.title, url: link.url })),
      suggestion: data.suggestion,
    }));
    const data = {
      name: courseInfo.name,
      description: courseInfo.descriptions,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatePrice: courseInfo.estimatePrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContent.length,
      benefit: fomattedBenefits,
      prerequisites: fomattedPrerequisites,
      courseData: formattedCourseContent,
    };
    setCourse(data);
  };
  const handleCreateCourse = async (e: any) => {
    if (!editCourseLoading) {
      await editCourse({ id: editCourseData._id, data: course });
    }
  };
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
            benefit={benefit}
            setBenefit={setBenefit}
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
            type="edit"
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

export default EditCourse;
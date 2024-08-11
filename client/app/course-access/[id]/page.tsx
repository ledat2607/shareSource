'use client'
import CourseContent from '@/app/components/admin/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/appSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import CourseContentPage from "../../components/Courses/CourseContentPage"
type Props = {
  params: any;
};

const page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    useEffect(() => {
      if (data) {
        const isPurchased = data.user.courses.find(
          (item: any) => item.courseId === id
        );
        if (!isPurchased) {
          redirect("/");
        }
        if (error) {
          redirect("/");
        }
      }
    }, [data, error]);
    
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContentPage id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default page;
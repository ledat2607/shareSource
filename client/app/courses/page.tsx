"use client"
import { useGetAllUserCoursesQuery } from "@/redux/features/courses/apiCourse";
import { useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");
    const { data, isLoading } = useGetAllUserCoursesQuery(undefined, {});
  return <div>page</div>;
};

export default page;
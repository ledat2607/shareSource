import { useGetCourseQuery } from '@/redux/features/courses/apiCourse';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import CourseDetail from "./CourseDetail";
import Footer from '../Footer';
type Props = {
  id: string;
};

const CourseDetailPage: React.FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${data.course.name} - Elearning`}
            description=""
            keywords={data.course.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetail data={data.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailPage
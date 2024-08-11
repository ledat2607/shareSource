import { useGetCourseContenQuery } from '@/redux/features/courses/apiCourse';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from "./CourseContentMedia"
import Header from '../Header';
import CourseContentList from './CourseContentList';
type Props = {
  id: string;
  user: any;
};

const CourseContentPage = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContenQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const data = contentData?.content.courseData;
  const dataMedia = contentData?.content;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeVideo, setActiveVideo] = useState(0);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data?.[activeVideo]?.title}
              description="anything"
              keywords=""
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={dataMedia}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContentPage
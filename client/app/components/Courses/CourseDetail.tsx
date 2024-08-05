import Rating from '@/app/utils/Rating';
import React from 'react'
import { IoCheckboxOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

type Props = {
  data: any;
};

const CourseDetail: React.FC<Props> = ({ data }) => {
  const { user } = useSelector((state: any) => state.auth);
  const discountPercent =
    ((data.estimatePrice - data.price) / data.estimatePrice) * 100;
  const discountPercentPrice = discountPercent.toFixed(0);
  const isPurchased =
    user && user?.courses.find((item: any) => item._id === data._id);
  const handleOrder = () => {
    console.log(`ggg`);
  };
  return (
    <div className="w-[90%] 800px:w-[95%] m-auto py-5">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          <h1 className="text-[25px] font-Popins font-[600] text-black dark:text-white">
            {data.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Rating rating={data.rating} />
              <h5 className="text-black dark:text-white">
                {data?.reviews.length} Reviews
              </h5>
            </div>
            <h5 className="text-black dark:text-white">
              {data.purchased} Students
            </h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Popins font-[600] text-black dark:text-white">
            What will you learn from this course ?
          </h1>
          <div>
            {data?.benefit?.map((i: any, index: number) => (
              <div key={index} className="w-full flex 800px:items-center py-2">
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={25}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-4 text-black dark:text-white">{i.title}</p>
              </div>
            ))}
          </div>
          <br />
          <h1 className="text-[25px] font-Popins font-[600] text-black dark:text-white">
            What are the prerequisites for starting this course ?
          </h1>
          <div>
            {data?.prerequisites?.map((i: any, index: number) => (
              <div key={index} className="w-full flex 800px:items-center py-2">
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={25}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-4 text-black dark:text-white">{i.title}</p>
              </div>
            ))}
          </div>
          <br />
          <h1 className="text-[25px] font-Popins font-[600] text-black dark:text-white">
            Course Overview
          </h1>
          <br />
          <br />
          <div className="w-full">
            <h1 className="text-[25px] font-Popins font-[600] text-black dark:text-white">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line overflow-hidden text-black dark:text-white">
              {data.description}
            </p>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div className="800px:flex items-center">
              <Rating rating={data?.rating} />
              <div className="mb-2 800px:mb-[unset]">
                <h5 className="text-[25px] font-Popins text-black dark:text-white">
                  {Number.isInteger(data?.rating)
                    ? data.rating.toFixed(1)
                    : data.rating.toFixed(2)}{" "}
                  Couse Rating - {data.reviews.length} Reviews
                </h5>
              </div>
            </div>
          </div>
          <br />
          {(data?.reviews && [...data.reviews].reverse()).map(
            (item: any, index: number) => (
              <div className="w-full pb-4" key={index}>
                <div className="flex">
                  <div className="w-[50px] h-[50px]">
                    <div className="w-[50px] h-[50px] bg-slate-300 rounded-[50px] flex items-center justify-center cursor-pointer">
                      <h1 className="uppercase text-[18px] text-blue-500 dark:text-black">
                        {item?.user.name.slice(0, 2)}
                      </h1>
                    </div>
                  </div>
                  <div className="hidden 800px:block pl-2">
                    <div className="flex items-center">
                      <h5 className="text-[18px] text-black dark:text-white pr-5">
                        {item.user.name}
                      </h5>
                      <Rating rating={item.rating} />
                    </div>
                    <p className="text-black dark:text-white">{item.comment}</p>
                    <small className="text-black dark:text-white">
                      {format(item.created_At)}
                    </small>
                  </div>
                  <div className="pl-2 flex 800px:hidden items-center">
                    <h5 className="text-[18px] text-black dark:text-white">
                      {item.user.name}
                    </h5>
                    <Rating rating={item.rating} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
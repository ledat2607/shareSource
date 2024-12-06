import Rating from '@/app/utils/Rating';
import Image from 'next/image';
import React from 'react'
import { faker } from '@faker-js/faker';

type Props = {
  item: any;
  index?: number;
};

const ReviewCard: React.FC<Props> = ({ item, index }) => {
  console.log(item);
  return (
    <div className="course-card w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border rounded-lg p-3 shadow-sm dark:shadow-inner relative">
      <div className="w-[50] h-[50] flex">
        <Image
          src={faker.image.avatar()}
          alt=""
          width={50}
          height={50}
          objectFit="cover"
          className="rounded-full object-cover"
        />
        <div className="800px:flex justify-center w-full hidden">
          <div className="pl-4 flex justify-between w-full">
            <div className="flex items-center">
              <h5 className="text-[20px] text-black dark:text-white font-Josefin">
                {item.name}
              </h5>
              <h5 className="text-[15px] ml-4 text-black dark:text-white font-Josefin">
                {item.profession}
              </h5>
            </div>
            <Rating rating={item.ratings} />
          </div>
        </div>
        {/**For mobile */}
        <div className="800px:hidden justify-between w-full flex flex-col">
          <div className="pl-4 flex justify-between w-full">
            <h5 className="text-[20px] text-black dark:text-white font-Josefin">
              {item.name}
            </h5>
            <h5 className="text-[20px] text-black dark:text-white font-Josefin">
              {item.profession}
            </h5>
          </div>
          <Rating rating={5} />
        </div>
      </div>
      <h4 className="text-black w-full dark:text-white font-Josefin text-[20px] pl-4 max-h-[50px]">
        {item.comment}
      </h4>
    </div>
  );
};

export default ReviewCard;
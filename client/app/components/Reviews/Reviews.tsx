"use client"
import Image from 'next/image';
import React from 'react'
import img from "../../../public/assets/banner.png";
import { styles } from '@/app/style/styles';
import ReviewCard from "./ReviewCard";
type Props = {}
export const reviews = [
  {
    name: "Gena Petter",
    avatar:
      "https://i1.sndcdn.com/artworks-i0nLuYBs0dR2nsn4-AkxVlg-t500x500.jpg",
    profession: "Student | TDMU",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    ratings: 5,
  },
  {
    name: "Gena Petter",
    avatar:
      "https://thanhnien.mediacdn.vn/Uploaded/tuyenth/2022_08_11/9-4142.jpg",
    profession: "Singer | TDMU",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    ratings: 4,
  },
  {
    name: "Gena Petter",
    avatar:
      "https://thanhnien.mediacdn.vn/Uploaded/tuyenth/2022_08_11/9-4142.jpg",
    profession: "Singer | TDMU",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    ratings: 5,
  },
  {
    name: "Gena Petter",
    avatar:
      "https://thanhnien.mediacdn.vn/Uploaded/tuyenth/2022_08_11/9-4142.jpg",
    profession: "Singer | TDMU",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    ratings: 4,
  },
  {
    name: "Gena Petter",
    avatar:
      "https://thanhnien.mediacdn.vn/Uploaded/tuyenth/2022_08_11/9-4142.jpg",
    profession: "Singer | TDMU",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    ratings: 5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto mt-10">
      <h1 className="text-center text-black dark:text-white 800px:text-[50px] font-Popins font-[700]">
        Đánh giá
      </h1>
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image src={img} width={700} height={700} alt="" />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className="text-center text-black dark:text-white font-Popins text-[25px] leading-3 sm:text-4xl 800px:!leading-[60px] font-[700]">
            Sự phát triển của học viên là
            <span className="text-gradient"> Sức mạnh </span>
            <span className="mt-6">
              <span className="gradient-text">
                Xem họ đã có những đánh giá gì
              </span>
            </span>
          </h3>
          <p
            className={`${styles.label} mt-6 800px:mt-0 !text-center mb-8 800px:mb-0`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[30px] xl:grid-cols-2 xl:gap-[30px] mb-12 border-0 md:[&>*:nth-child(6)]:!mt-[-40px] md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(3)]:!ml-[60px] md:[&>*:nth-child(4)]:!ml-[-60px]">
        {reviews &&
          reviews.map((item: any, index: number) => (
            <ReviewCard item={item} index={index} />
          ))}
      </div>
    </div>
  );
}

export default Reviews;
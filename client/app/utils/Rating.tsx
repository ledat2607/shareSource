import { useTheme } from 'next-themes';
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

type Props = {
  rating: number;
};

const Rating: React.FC<Props> = ({ rating }) => {
  const { theme, setTheme } = useTheme();
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color={theme === "dark" ? "#FFFF00" : "#0000CD"}
          className="mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          color={theme === "dark" ? "#FFFF33" : "0000CD"}
          size={20}
          className="mr-2 cursor-pointer"
        />
      );
    }else{
        stars.push(
          <AiOutlineStar
            size={20}
            color={theme === "dark" ? "#FFFF33" : "#0000CD"}
            className="mr-2 cursor-pointer"
          />
        );
    }
  }
  return (
    <div className="flex ml-2 cursor-pointer 800px:ml-0">
      {stars}
    </div>
  );
};

export default Rating;
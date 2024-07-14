import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

type Props = {
  rating: number;
};

const Rating: React.FC<Props> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#FFFF00"
          className="mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          color="#FFFF33"
          size={20}
          className="mr-2 cursor-pointer"
        />
      );
    }else{
        stars.push(
          <AiOutlineStar
            size={20}
            color="#FFFF33"
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
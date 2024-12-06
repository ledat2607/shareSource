import React, {FC} from 'react'
import { IoCheckmarkDone } from "react-icons/io5";


type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
    const options = [
      "Thông tin khóa học",
      "Các yêu cầu",
      "Nội dung",
      "Xem lại",
    ];

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className="w-full flex py-5">
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            <IoCheckmarkDone className="text-[25px] text-white" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-[20px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
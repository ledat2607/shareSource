import { styles } from '@/app/style/styles';
import React from 'react'
import toast from 'react-hot-toast';
import { IoAdd } from "react-icons/io5";

type Props = {
  benefit: { title: string }[];
  setBenefit: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: React.FC<Props> = ({
  benefit,
  setBenefit,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleChangeBenifits = (index: number, value: any) => {
    const updateBenifit = [...benefit];
    updateBenifit[index].title = value;
    setBenefit(updateBenifit);
  };
  const handleAddBenifit = () => {
    setBenefit([...benefit, { title: "" }]);
  };
  const handleChangePrerequisites = (index: number, value: any) => {
    const updatePrerequisites = [...prerequisites];
    updatePrerequisites[index].title = value;
    setPrerequisites(updatePrerequisites);
  };
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleNextOption = () => {
    if (
      benefit[benefit.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill enough information to countinue !");
    }
  };
  return (
    <div className="w-[90%] 800px:w-[80%] mx-auto 800px:mt-24 mt-16">
      <div className="w-full">
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benifits for student in this course?
        </label>

        {benefit?.map((benifit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benifit"
            placeholder="You will be able to build a full stack application..."
            required
            value={benifit.title}
            className="px-3 mt-4 text-black dark:text-white w-[100%] py-3 rounded-2xl bg-gray-200/80 dark:bg-slate-800 p-2"
            onChange={(e) => handleChangeBenifits(index, e.target.value)}
          />
        ))}
        <div
          onClick={handleAddBenifit}
          className="mt-4 w-[40px] h-[40px] rounded-full cursor-pointer bg-slate-400 hover:bg-slate-200 dark:bg-slate-800 hover:dark:text-blue-600 text-black dark:text-white hover:text-blue-500 flex items-center justify-center transition-all duration-500"
        >
          <IoAdd size={25} />
        </div>
      </div>

      <div className="w-full">
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>

        {prerequisites?.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge about application..."
            required
            value={prerequisites.title}
            className="px-3 mt-4 text-black dark:text-white w-[100%] py-3 rounded-2xl bg-gray-200/80 dark:bg-slate-800 p-2"
            onChange={(e) => handleChangePrerequisites(index, e.target.value)}
          />
        ))}
        <div
          onClick={handleAddPrerequisites}
          className="mt-4 w-[40px] h-[40px] rounded-full cursor-pointer bg-slate-400 hover:bg-slate-200 dark:bg-slate-800 hover:dark:text-blue-600 text-black dark:text-white hover:text-blue-500 flex items-center justify-center transition-all duration-500"
        >
          <IoAdd size={25} />
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        <div
          onClick={() => prevButton()}
          className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:-translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
        >
          Previous
        </div>
        <div
          onClick={() => handleNextOption()}
          className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
import { styles } from '@/app/style/styles';
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";
import { fadeIn } from "../../variant";
import toast from 'react-hot-toast';
type Props = {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
};

const CourseContent: React.FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleSubmitCourseContent,
}) => {
    const [isCollaped, setIsCollaped] = useState(
      Array(courseContentData.length).fill(false)
    );
    const [activeSection, setActiveSection] = useState(1);
    const handleSubmit = (e:any)=>{
        e.preventDefault();
    }
    const handleCollaped = (index: number) => {
      const updateCollaped = [...isCollaped];
      updateCollaped[index] = !updateCollaped[index];
      setIsCollaped(updateCollaped);
    };
    const handleRemovelink = (index: number, linkIndex: number) => {
      const updateLink = [...courseContentData]
      updateLink[index]?.links.splice(linkIndex, 1);
      setCourseContentData(updateLink);
    };
   const handeAddLink = (index: number) => {
     const updateData = [...courseContentData];
     updateData[index].links.push({ title: "", url: "" });
     setCourseContentData(updateData);
   };
   const newContentHandled = (item:any)=>{
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill enough information !");
    }
    else{
      let newVideoSection = "";
      const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection
      if(lastVideoSection){
        newVideoSection = lastVideoSection;
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
   }
   const addSection = ()=>{
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === "" ||
      courseContentData[courseContentData.length - 1].description === ""
    ) {
      toast.error("Please fill enough information !!!");
    }else{
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        descriptions: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  }
  const PrevButton = ()=>{
    setActive(active - 1);
  }
  const NextButton = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === "" ||
      courseContentData[courseContentData.length - 1].description === ""
    ) {
      toast.error("Section can't be empty");
    }else{

      setActive(active + 1);
      handleSubmitCourseContent();
    }
  };
  return (
    <div className="w-[90%] 800px:w-[80%] mx-auto 800px:mt-24 mt-16">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSection =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSection ? "mt-10" : "mb-0"
                }`}
              >
                {showSection && (
                  <>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-max"
                        } font-Popins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updateContentData = [...courseContentData];
                          updateContentData[index].videoSection =
                            e.target.value;
                          setCourseContentData(updateContentData);
                        }}
                      />
                      <BsPencil className="cursor-pointer text-black dark:text-white" />
                    </div>
                  </>
                )}
                <div className="flex mt-2 w-full items-center justify-between my-0">
                  {isCollaped[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Popins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <p className="text-black dark:text-white font-[18px]">
                          Video title
                        </p>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      onClick={() => {
                        if (index > 0) {
                          const updateContentData = [...courseContentData];
                          updateContentData.splice(index, 1);
                          setCourseContentData(updateContentData);
                        }
                      }}
                      className={`dark:text-white text-black text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                    />
                    <MdOutlineKeyboardArrowDown
                      className="dark:text-white text-black"
                      fontSize="large"
                      style={{
                        transform: isCollaped[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollaped(index)}
                    />
                  </div>
                </div>
                {!isCollaped[index] && (
                  <>
                    <motion.div
                      variants={fadeIn("left", 0.2)}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="my-3 flex 1100px:flex-row flex-col justify-between"
                    >
                      <label className={`${styles.label}`}>Video title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                        placeholder="Project plan..."
                        className="px-3 py-3 rounded-xl outline-none p-2 800px:w-[80%] w-[100%] bg-gray-200/80 dark:bg-slate-800 text-black dark:text-white font-Josefin"
                      />
                    </motion.div>
                    <motion.div
                      variants={fadeIn("left", 0.2)}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="my-3 flex 1100px:flex-row flex-col justify-between"
                    >
                      <label className={`${styles.label}`}>Video url</label>
                      <input
                        type="text"
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoUrl = e.target.value;
                          setCourseContentData(updateData);
                        }}
                        placeholder="Video url..."
                        className="px-3 py-3 rounded-xl outline-none p-2 800px:w-[80%] w-[100%] bg-gray-200/80 dark:bg-slate-800 text-black dark:text-white font-Josefin"
                      />
                    </motion.div>
                    <motion.div
                      variants={fadeIn("left", 0.2)}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="my-3 flex 1100px:flex-row flex-col justify-between"
                    >
                      <label className={`${styles.label}`}>
                        Video Desciption
                      </label>
                      <textarea
                        cols={30}
                        rows={8}
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                        placeholder="Video description..."
                        className="px-3 py-3 rounded-xl outline-none p-2 800px:w-[80%] w-[100%] bg-gray-200/80 dark:bg-slate-800 text-black dark:text-white font-Josefin"
                      />
                    </motion.div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <motion.div
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="mb-3 flex items-center justify-between"
                      >
                        <div className="w-[40%] 800px:w-[20%] flex items-center">
                          <label className={`${styles.label}`}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } ml-3 text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemovelink(index, linkIndex)
                            }
                          />
                        </div>
                        <motion.div
                          variants={fadeIn("left", 0.2)}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="w-[80%] flex 1100px:flex-row flex-col justify-between"
                        >
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                            placeholder="Source code...(Link title)"
                            className="px-3 py-3 rounded-xl mt-3 outline-none p-2 1100px:w-[45%] 800px:w-[90%] w-[100%] bg-gray-200/80 dark:bg-slate-800 text-black dark:text-white font-Josefin"
                          />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                            placeholder="Source code url...(Link URL)"
                            className="px-3 py-3 mt-4 rounded-xl outline-none p-2 1100px:w-[45%] 800px:w-[90%] w-[100%] bg-gray-200/80 dark:bg-slate-800 text-black dark:text-white font-Josefin"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                    <div className="inline-block mb-4">
                      <motion.p
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        onClick={() => handeAddLink(index)}
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      >
                        <BsLink45Deg className="mr-2" /> Add link
                      </motion.p>
                    </div>
                  </>
                )}
                {index === courseContentData.length - 1 && (
                  <div className="mt-3">
                    <p
                      onClick={(e: any) => newContentHandled(item)}
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add new content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <div
          onClick={() => addSection()}
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new section
        </div>
        <div className="w-full flex items-center justify-between mt-5">
          <div
            onClick={() => PrevButton()}
            className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:-translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
          >
            Previous
          </div>
          <div
            onClick={() => NextButton()}
            className="w-[150px] h-[40px] flex items-center justify-center hover:border hover:bg-white hover:border-blue-500 hover:translate-x-4 transition-all duration-500 bg-[#37a39a] hover:text-[#37a39a] cursor-pointer rounded-full text-white"
          >
            Next
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
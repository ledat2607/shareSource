import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyReviewMutation, useAddReviewMutation, useGetCourseQuery } from "@/redux/features/courses/apiCourse";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  id,
  data,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [reviewRep, setReviewRep] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [reivewreplyActive, setReviewReplyActive] = useState(false);
  const isReviews = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const dataContent = data?.courseData;
  //Fetch Add question function
  const [addNewQuestion, { isSuccess, error, isLoading: questionCreating }] =
    useAddNewQuestionMutation();
  //Fetch Add answer function
  const [
    addAnswer,
    { isLoading, error: errorAddAnswer, isSuccess: addAnswerSuccess },
  ] = useAddAnswerInQuestionMutation();
  //Fetch Add review function
  const [
    addReview,
    { isLoading: reviewLoading, error: reviewError, isSuccess: reviewSuccess },
  ] = useAddReviewMutation();
  //Fetch Add reply in review function
  const [
    addReplyReview,
    { isLoading: reviewRepLoading, isSuccess: reviewRepSuccess },
  ] = useAddReplyReviewMutation();
  //add question
  const handleAddQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: dataContent[activeVideo]._id,
      });
    }
  };
  //Fetch Add question reply function
  const handleSubmitAnswer = () => {
    addAnswer({
      answer,
      courseId: id,
      contentId: dataContent[activeVideo]._id,
      questionId: questionId,
    });
  };
  //Fetch Add review function
  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review can't empty !!!");
    } else {
      addReview({ review, rating, courseId: id });
    }
  };
  //Refect
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      toast.success("Add new question successfull !!");
      refetch();
    }
    if (addAnswerSuccess) {
      setAnswer("");
      toast.success("Reply successfull !");
      refetch();
    }
    if (reviewSuccess) {
      setReview("");
      toast.success("Add Review successfull !");
      refetch();
    }
    if (reviewRepSuccess) {
      setReviewRep("");
      toast.success("Add Review Reply successfull !");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, addAnswerSuccess, reviewSuccess]);
  //Modal
  const handleActiveReview = (id: any) => {
    setReviewReplyActive((prevState) => (prevState === id ? null : id));
    setReviewId(id);
  };
  //fetch add reply for review
  const handleSubmitAnswerReview = () => {
    if (reviewRep.length === 0) {
      toast.error("Review can't empty !!!");
    } else {
      addReplyReview({ comment: reviewRep, courseId: id, reviewId });
    }
  };
  return (
    <div className="w-[90%] 800px:w-[85%] py-4 m-auto">
      <CoursePlayer
        title={dataContent[activeVideo].title}
        videoUrl={dataContent[activeVideo].videoUrl}
      />
      <div className="w-[90%] flex items-center justify-between py-3">
        <div
          className={`px-8 flex text-white items-center py-3 bg-blue-500 cursor-pointer rounded-2xl ${
            activeVideo === 0 && "!cursor-no-drop"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lession
        </div>
        <div
          className={`px-8 flex text-white items-center py-3 bg-blue-500 cursor-pointer rounded-2xl ${
            dataContent.length - 1 === activeVideo && "!cursor-no-drop"
          }`}
          onClick={() =>
            setActiveVideo(
              dataContent && dataContent.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lession
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="text-black dark:text-white font-Popins text-[30px] font-[600]">
        {dataContent[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-600 bg-opacity-20 backdrop-blur rounded-none shadow-inner">
        {["Overview", "Resources", "Q&A", "Review"].map((item, index) => (
          <h1
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "text-black dark:text-white"
            } `}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h1>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white font-Josefin">
          {dataContent[activeVideo].description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: any) => (
            <div key={index} className="mb-2 flex flex-col">
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                Source Title: {item.title && item.title + " "}
              </h2>
              <p className="text-black dark:text-white 800px:text-[20px]">
                Link source:
                <a
                  href={item.url}
                  className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                >
                  {item.url}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="w-full flex">
            <Image
              alt=""
              width={50}
              height={50}
              className="rounded-full object-contain w-[50px] h-[50px]"
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              }
            />
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className=" text-black dark:text-white bg-transparent ml-3 !bg-gray-200 dark:!bg-transparent border border-[#ffffff37] 800px:w-full p-2 rounded-2xl w-[95%] 800px:text-[18px] font-Popins"
              placeholder="Write your question..."
              rows={5}
              color="40"
            />
          </div>
          <div className="w-full mt-2 flex justify-end">
            <div
              className={`px-4 rounded-2xl py-3 bg-blue-500 text-black dark:text-white flex items-center justify-center hover:translate-x-2 transition-all duration-300 ${
                questionCreating && "cursor-not-allowed"
              }`}
              onClick={questionCreating ? () => {} : handleAddQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={dataContent}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleSubmitAnswer={handleSubmitAnswer}
              user={user}
              setQuestionId={setQuestionId}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full mb-10">
          <div className="w-full flex">
            {!isReviews && (
              <>
                <Image
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full mt-3 object-contain w-[50px] h-[50px]"
                  src={
                    user.avatar
                      ? user.avatar.url
                      : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  }
                />
                <div className="w-full flex flex-col">
                  <div className="w-full flex flex-col">
                    <h5 className="pl-5 text-[20px] font-[500] dark:text-white text-black">
                      Give a rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgba(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgba(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>

                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="text-black dark:text-white outline-none bg-transparent ml-3 border border-[#ffffff37] 800px:w-full p-2 rounded-2xl w-[95%] 800px:text-[18px] font-Popins"
                      placeholder="Write your review about this course..."
                      rows={5}
                      color="40"
                    />
                  </div>
                  <div className="w-full mt-2 flex justify-end">
                    <div
                      className={`px-4 rounded-2xl py-3 bg-blue-500 text-black dark:text-white flex items-center justify-center hover:translate-x-2 transition-all duration-300 ${
                        reviewLoading && "cursor-no-drop"
                      }`}
                      onClick={reviewLoading ? () => {} : handleReviewSubmit}
                    >
                      Submit
                    </div>
                  </div>
                  <br />
                  <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                </div>
              </>
            )}
          </div>
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="w-full mb-20">
            {(data.reviews && [...data.reviews].reverse()).map(
              (item: any, index: number) => (
                <div key={item._id} className="w-full my-5 ">
                  <div className="pl-2 flex items-center">
                    <Image
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-full object-contain w-[50px] h-[50px]"
                      src={
                        item.user.avatar
                          ? item.user.avatar.url
                          : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                      }
                    />
                    <div className="flex flex-col ml-3">
                      <h1 className="text-[20px] text-black dark:text-white flex items-center">
                        {item.user.name}{" "}
                        {item.user.role === "admin" && (
                          <VscVerifiedFilled className="text-[#8095f6] ml-2 text-[20px]" />
                        )}
                      </h1>
                      <Rating rating={item.rating} />
                      <p className="text-black dark:text-white">
                        {item.comment}
                      </p>
                      <small className="text-black dark:text-white">
                        {format(item.createdAt)}
                      </small>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <span
                      onClick={() => handleActiveReview(item._id)}
                      className="800px:pl-16 dark:text-[#fffff183] text-gray-700 cursor-pointer mr-2"
                    >
                      {reivewreplyActive === item._id
                        ? "Hide review"
                        : item.comentReplies.length !== 0
                        ? "All Review"
                        : "Add Reply"}
                    </span>
                    <div className="min-w-[100px] flex items-center">
                      <BiMessage
                        size={22}
                        className="cursor-pointer dark:text-white text-black"
                      />
                      <span className="ml-2 cursor-pointer text-black dark:text-white">
                        {item.comentReplies.length}
                      </span>
                    </div>
                  </div>
                  {reivewreplyActive === item._id && (
                    <div className="w-full flex flex-col">
                      {item.comentReplies.map((reply: any) => (
                        <div
                          key={reply._id}
                          className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                        >
                          <div>
                            <Image
                              alt=""
                              width={50}
                              height={50}
                              className="rounded-full object-contain w-[50px] h-[50px]"
                              src={
                                reply?.user.avatar
                                  ? reply?.user.avatar.url
                                  : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                              }
                            />
                          </div>
                          <div className="pl-2">
                            <h5 className="text-[20px] text-black dark:text-white flex items-center">
                              {reply.user.name}
                              {reply.user.role === "admin" && (
                                <VscVerifiedFilled className="text-[#8095f6] ml-2 text-[20px]" />
                              )}
                            </h5>
                            <p className="text-black dark:text-white">
                              {reply.comment}
                            </p>
                            <small className="text-gray-500">
                              {!reply.createdAt ? "" : format(reply.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter your reply..."
                          onChange={(e) => setReviewRep(e.target.value)}
                          value={reviewRep}
                          className="block text-black dark:text-white 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#fff] p-[5px] w-[95%]"
                        />
                        <button
                          disabled={reviewRep.trim() === ""}
                          onClick={handleSubmitAnswerReview}
                          type="submit"
                          className={`px-3 py-3 bg-blue-500 rounded-2xl absolute right-0 bottom-1 text-black dark:text-white ${
                            reviewRep.trim() === "" && "cursor-no-drop"
                          }`}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};


const CommentReply =({data, activeVideo, answer, setAnswer, handleSubmitAnswer, user, setQuestionId}:any)=>{
  return (
    <>
      <div className="w-full py-3">
        {data[activeVideo].question.map((i: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={i}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        ))}
      </div>
    </>
  );
}
const CommentItem =({key,data,activeVideo,item,index,answer,setAnswer,handleSubmitAnswer,setQuestionId}:any)=>{
  const [replyAvtice, setReplyActive] = useState(false);
  const handleActive = (id:any)=>{
    setReplyActive(!replyAvtice);
    setQuestionId(id);
  }
  return (
    <div className="my-4">
      <div className="flex mb-2">
        <div>
          <Image
            alt=""
            width={50}
            height={50}
            className="rounded-full object-contain w-[50px] h-[50px]"
            src={
              item?.user.avatar
                ? item?.user.avatar.url
                : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
            }
          />
        </div>
        <div className="pl-3">
          <h5 className="text-[20px] text-black dark:text-white">
            {item.user.name}
          </h5>
          <p className="text-[15px] font-Josefin text-black dark:text-white">
            {item.question}
          </p>
          <small className="text-gray-500">
            {!item.createdAt ? "" : format(item.createdAt)}
          </small>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex">
          <span
            onClick={() => handleActive(item._id)}
            className="800px:pl-16 dark:text-[#fffff183] text-gray-700 cursor-pointer mr-2"
          >
            {!replyAvtice
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide replies"}
          </span>
          <div className="min-w-[100px] flex items-center">
            <BiMessage
              size={22}
              className="cursor-pointer dark:text-white text-black"
            />
            <span className="ml-2 cursor-pointer text-black dark:text-white">
              {item.questionReplies.length}
            </span>
          </div>
        </div>
        {replyAvtice && (
          <div className="w-full flex flex-col">
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div>
                  <Image
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full object-contain w-[50px] h-[50px]"
                    src={
                      item?.user.avatar
                        ? item?.user.avatar.url
                        : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                    }
                  />
                </div>
                <div className="pl-2">
                  <h5 className="text-[20px] text-black dark:text-white flex items-center">
                    {item.user.name}
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#8095f6] ml-2 text-[20px]" />
                    )}
                  </h5>

                  <p className="text-black dark:text-white">{item.answer}</p>
                  <small className="text-gray-500">
                    {!item.createdAt ? "" : format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  className="block text-black dark:text-white 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#fff] p-[5px] w-[95%]"
                />
                <button
                  disabled={answer === " "}
                  onClick={handleSubmitAnswer}
                  type="submit"
                  className={`px-3 py-3  bg-blue-500 rounded-2xl absolute right-0 bottom-1 text-black dark:text-white ${
                    answer === "" && "cursor-no-drop"
                  }`}
                >
                  Submit
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseContentMedia;

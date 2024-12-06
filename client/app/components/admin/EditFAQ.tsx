import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { IoAddCircleOutline } from 'react-icons/io5';
import Loader from '../Loader/Loader';

type Props = {}

const EditFAQ = (props: Props) => {
  const { data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();
  const [questions, setQuestions] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setQuestions(data.layoutData.faq);
    }
    if (isSuccess) {
      toast.success("Update FAQ successfull !");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((preQuestions) =>
      preQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleChangeQuestion = (id: any, value: string) => {
    setQuestions((preQuestions) =>
      preQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleChangeAnwser = (id: any, value: string) => {
    setQuestions((preQuestions) =>
      preQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnChanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnChanged(data.layoutData.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleQuestion(q._id)}
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    >
                      <input
                        className="border-none rounded-2xl w-full p-2 dark:bg-slate-800 bg-gray-300 text-black dark:text-white"
                        value={q.question}
                        onChange={(e: any) =>
                          handleChangeQuestion(q._id, e.target.value)
                        }
                        placeholder="Thêm câu hỏi...."
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-4 pr-12">
                      <input
                        value={q.answer}
                        onChange={(e: any) =>
                          handleChangeAnwser(q._id, e.target.value)
                        }
                        placeholder="Thêm câu trả lời"
                        className="border-none rounded-2xl w-full p-2 dark:bg-slate-800 bg-gray-300 text-black dark:text-white"
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() =>
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter(
                                (item) => item?._id !== q._id
                              )
                            )
                          }
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <br />
            <IoAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />

            <div
              className={`hover:translate-x-2 transition-all duration-300 flex justify-center items-center cursor-pointer w-[100px] h-[40px] dark:text-white text-black bg-[#ccccccc3] ${
                areQuestionsUnChanged(data?.layoutData.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? "!cursor-not-allowed"
                  : "cursor-pointer !bg-[#42d383]"
              } rounded-2xl absolute bottom-12 right-12`}
              onClick={
                areQuestionsUnChanged(data?.layoutData.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? () => null
                  : handleEdit
              }
            >
              Save
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFAQ;
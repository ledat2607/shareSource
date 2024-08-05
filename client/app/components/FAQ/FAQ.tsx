import { styles } from '@/app/style/styles';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {}

const FAQ = (props: Props) => {
    const { data } = useGetHeroDataQuery("FAQ", {
      refetchOnMountOrArgChange: true,
    });
    const [activeQuestion,setActiveQuestion] = useState(null)
    const [questions, setQuestions] = useState<any[]>([]);
    useEffect(() => {
      if (data) {
        setQuestions(data.layoutData.faq);
      }
    }, [data]);
    const toggleQuestions = (id:any)=>{
        setActiveQuestion(activeQuestion === id ? null : id);
    }
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Frequently Question
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q) => (
              <div
                className={`${
                  q._id === questions[0]._id && "border-t"
                } border-gray-200 pt-6`}
                key={q._id}
              >
                <dt className="text-lg">
                  <button
                    onClick={() => toggleQuestions(q._id)}
                    className="flex items-center justify-between w-full text-left focus:outline-none"
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="w-6 h-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="w-6 h-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-2">
                    <p className="text-base font-Popins text-black dark:text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
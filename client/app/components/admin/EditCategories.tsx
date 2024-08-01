import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { styles } from '@/app/style/styles';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

type Props = {}

const EditCategories = (props: Props) => {
  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();
  const { data, refetch } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setCategories(data.layoutData.category);
    }
    if (isSuccess) {
      refetch();
      setTimeout(() => {
        toast.success("Update category successfull !!!");
      }, 1000);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    
  }, [data, isSuccess, error]);

  //handle change category add
  const handleCategoriesAdd = (id: any, value: string) => {
    console.log(id);
    setCategories((preCategory: any) =>
      preCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };
  //add new category
  const newCategories = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category not empty !!!");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };
  //Check different
  const areCategoriesUnChanged = (
    originalCategories: any[],
    newCategory: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategory);
  };

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((cat) => cat.title === "");
  };
  //Edit category
  const handleEditCategories = async () => {
    if(!areCategoriesUnChanged(data.layoutData.category,categories) && !isAnyCategoryEmpty(categories)){
      await editLayout({
        type: "Category",
        categories,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((cat: any, index: number) => {
              return (
                <div key={index} className="p-3">
                  <div className="flex items-center justify-center w-full">
                    <input
                      value={cat.title}
                      onChange={(e) =>
                        handleCategoriesAdd(cat._id, e.target.value)
                      }
                      className="w-[40%] dark:bg-slate-800 bg-gray-300 dark:text-white text-black px-2 py-3 rounded-2xl"
                      placeholder="Enter your title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[20px] ml-2 cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== cat._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategories}
            />
          </div>
          <div
            className={`hover:translate-x-2 transition-all duration-300 flex justify-center items-center cursor-pointer w-[100px] h-[40px] dark:text-white text-black bg-[#ccccccc3] ${
              areCategoriesUnChanged(data?.layoutData.category, categories) ||
              isAnyCategoryEmpty(categories)
                ? "!cursor-not-allowed"
                : "cursor-pointer !bg-[#42d383]"
            } rounded-2xl absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnChanged(data?.layoutData.category, categories) ||
              isAnyCategoryEmpty(categories)
                ? () => null
                : handleEditCategories
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
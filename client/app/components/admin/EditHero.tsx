import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setTitle(data?.layoutData.banner.title);
      setSubTitle(data?.layoutData.banner.subTitle);
      setImage(data?.layoutData.banner.image.url);
    }
    if (isSuccess) {
      toast.success("Update layout successfull !");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };
  return (
    <div className="mt-20">
      <div className="w-full 1000px:flex items-center">
        <div className="top-[100px] 1000px:top-[100px] 1500px:h-[700px] flex 1100px:justify-between 1100px:flex-row flex-col items-center 1500px:w-full 1100px:h-[500px] h-[50vh] w-[50vh] rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]">
          <div className="1000px:w-[30%] w-[70%] ml-3 hero-animation1 rounded-full flex items-center 1100px:justify-center pt-[70px] 1000px:pt-0 z-0">
            <div className="relative w-[100%] flex items-center 1100px:justify-end justify-center z-10">
              <img
                src={image}
                alt=""
                className="object-contain rounded-full w-full h-full"
              />

              <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-6 right-24 z-20"
              >
                <AiOutlineCamera
                  size={30}
                  className="dark:text-white text-black text-[18px] cursor-pointer z-[100000000]"
                />
              </label>
            </div>
          </div>
          <div className="1000px:w-[60%] w-[80%] flex flex-col 1100px:items-center items-start 1000px:mt-[0px] 1000px:text-left mt-[150px] z-[500]">
            <textarea
              className="dark:text-white text-black p-3 w-[80%] rounded-3xl bg-transparent 1500px:text-[70px] 1100px:text-[50px] border"
              placeholder="Improve your Online Learning Skill...."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4}
            />
            <br />
            <textarea
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="dark:text-white text-black font-Josefin font-[600] text-[18px] 1500px:!w-[80%] 1100px:!w-[47%] p-3 rounded-2xl bg-transparent border 1100px:items-center items-start"
              placeholder="Subtitle of your banner here...."
            />
            <br />
            <br />
            <br />
            <div
              className={`cursor-pointer flex justify-center items-center hover:translate-x-2 transition-all duration-300 !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#ccccccc3]
              ${
                data?.layoutData.banner.title !== title ||
                data?.layoutData.banner.subTitle !== subTitle ||
                data?.layoutData.banner.image.url !== image
                  ? "!cursor-pointer !bg-[#42d383]"
                  : "!cursor-not-allowed"
              } !rounded-xl absolute bottom-12 right-12`}
              onClick={
                data?.layoutData.banner.title !== title ||
                data?.layoutData.banner.subTitle !== subTitle ||
                data?.layoutData.banner.image.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;

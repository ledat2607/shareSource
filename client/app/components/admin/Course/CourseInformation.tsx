import { styles } from '@/app/style/styles';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: React.FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [categories,setCategories] = useState<any[]>([])
  useEffect(() => {
    if (data) {
      setCategories(data.layoutData.category);
    }
  }, [data]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e:any)=>{
    e.preventDefault()
    setDragging(true);
  }
  const handleDragLeave = (e:any)=>{
    e.preventDefault();
    setDragging(false);
  }
  const handleDrop = (e:any)=>{
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0];
    if(file){
      const reader = new FileReader()
      reader.onload = ()=>{
        setCourseInfo({...courseInfo,thumbnail:reader.result})
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto 800px:mt-24 mt-16">
      <form>
        <div>
          <label
            htmlFor=""
            className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
          >
            Tên khóa học
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Tên khóa học...."
            className={`mt-2 w-full px-3 py-3 rounded-2xl bg-gray-200/80 dark:bg-gray-800 text-black dark:text-white `}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label
            htmlFor=""
            className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
          >
            Mô tả
          </label>
          <textarea
            cols={20}
            rows={10}
            name=""
            id=""
            placeholder="Viết một vài mô tả về khóa học..."
            className="p-2 text-black dark:text-white bg-gray-200/80 dark:bg-gray-800 rounded-2xl mt-2"
            value={courseInfo.descriptions}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, descriptions: e.target.value })
            }
          ></textarea>
        </div>
        <div className="w-full flex 1100px:flex-row flex-col justify-between">
          <div className="800px:w-[50%] mt-2 flex items-center">
            <label
              htmlFor=""
              className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
            >
              Phí
            </label>
            <input
              type="number"
              name=""
              id=""
              placeholder="0.00..."
              className="p-2 text-black dark:text-white 800px:ml-4 ml-10 bg-gray-200/80 dark:bg-gray-800 rounded-2xl mt-2"
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
            />
          </div>
          <div className="800px:w-[50%] mt-2 flex items-center justify-end">
            <label
              htmlFor=""
              className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
            >
              Phí (Đã giảm)
            </label>
            <input
              type="number"
              name=""
              id=""
              placeholder="0.00..."
              className="p-2 text-black dark:text-white ml-4 bg-gray-200/80 dark:bg-gray-800 rounded-2xl mt-2"
              value={courseInfo.estimatePrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatePrice: e.target.value })
              }
            />
          </div>
        </div>
        <div className="w-full mt-3 flex justify-between">
          <div className="800px:w-[45%] w-[40%]">
            <label
              htmlFor=""
              className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
            >
              Các tag liên quan
            </label>
            <input
              type="text"
              name="tags"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="Tag liên quan...."
              className={`mt-2 w-full px-3 py-3 rounded-2xl bg-gray-200/80 dark:bg-gray-800 text-black dark:text-white `}
            />
          </div>
          <div className="800px:w-[45%] w-[55%]">
            <label
              htmlFor=""
              className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
            >
              Danh mục
            </label>
            <select
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
              name=""
              id=""
              className="w-full rounded-2xl px-3 py-3 mt-2 dark:bg-slate-800 dark:text-white text-black bg-gray-300"
            >
              <option value="">Choose category</option>
              {categories.map((i: any, index: number) => (
                <option value={i.title} key={index}>
                  {i.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full mt-3 flex justify-between">
          <div className="800px:w-[45%] w-[40%]">
            <label
              htmlFor=""
              className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
            >
              Độ khó
            </label>
            <input
              type="text"
              name="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="name"
              placeholder="Độ khó...."
              className={`mt-2 w-full px-3 py-3 rounded-2xl bg-gray-200/80 dark:bg-gray-800 text-black dark:text-white `}
            />
          </div>
          <div className="800px:w-[45%] w-[55%]">
            <label
              htmlFor=""
              className={`${styles.label} !text-[13px] 800px:!text-[18px]`}
            >
              Link demo
            </label>
            <input
              type="text"
              name="level"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id=""
              placeholder="Link demo...."
              className={`mt-2 w-full px-3 py-3 rounded-2xl bg-gray-200/80 dark:bg-gray-800 text-black dark:text-white `}
            />
          </div>
        </div>
        <div className="w-full mt-2">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`1100px:mt-4 w-[80%] p-4 m-auto rounded-2xl min-h-[7vh] dark:border-white border-[#00000026] border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo?.thumbnail ? (
              <img
                src={
                  courseInfo.thumbnail.url
                    ? courseInfo.thumbnail.url
                    : courseInfo.thumbnail
                }
                alt=""
                className="h-[10vh] object-contain"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div
          onClick={handleSubmit}
          className="1100px:mb-10 800px:w-[20%] w-[45%] hover:w-[25%] cursor-pointer hover:bg-white hover:border-blue-500 hover:border bg-[#37a39a] hover:text-blue-500 transition-all duration-500 hover:dark:text-gray-100 hover:dark:bg-gray-800 rounded-2xl px-2 py-3 mt-[5%] flex items-center justify-center m-auto"
        >
          Tiếp theo
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
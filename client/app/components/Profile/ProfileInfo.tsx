import React, { useEffect, useState } from 'react';
import avatarIcon from "../../../public/assets/avatar.jpg";
import { motion } from "framer-motion";
import { fadeIn, zoomIn } from "../variant";
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/appSlice';


type Props = {
  user: any;
  avatar: string | null;
};
const ProfileInfo: React.FC<Props> = ({ avatar, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>(undefined);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [birthDay, setBirthDay] = useState(user.birthDay || "");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });


  useEffect(() => {
    if (isSuccess || success) {
      toast.success("Update successful!");
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
  }, [isSuccess, error, success, updateError]);


  const handleImageClick = () => {
    const imgSrc = user?.avatar?.url || avatar || avatarIcon.src;
    setModalImage(imgSrc);
    setShowModal(true);
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
    if (birthDay !== "") {
      await editProfile({
        birthDay: birthDay,
      });
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setModalImage(undefined);
  };
  const handleImage = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = ()=>{
      if(fileReader.readyState ===2){
        const avatar = fileReader.result;
        updateAvatar({
          avatar,
        });
      }
    }
    fileReader.readAsDataURL(e.target.files[0]);
  };

 
  return (
    <motion.div
      variants={fadeIn("left", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="w-full flex flex-col items-center"
    >
      <div className="w-full mt-10 flex justify-center">
        <div className="relative">
          <img
            alt=""
            src={user?.avatar?.url || avatar || avatarIcon.src}
            className="w-[120px] h-[120px] rounded-full cursor-pointer object-contain border-[5px] border-[#37a39a]"
            onClick={handleImageClick}
          />
          <div className="absolute w-[40px] h-[40px] rounded-full right-0 top-20 bg-white border-[2px] border-teal-500 flex justify-center items-center">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
              accept="image/jpg,image/png,image/jpeg,image/webp"
            />
            <label htmlFor="image">
              <MdOutlinePhotoCameraFront
                size={25}
                className="cursor-pointer text-black hover:text-green-500 hover:transition-transform duration-300"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="800px:w-[50%] w-[90%] mx-auto flex flex-col">
        <label className="text-black dark:text-white font-Popins text-[20px]">
          Full name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-200 dark:bg-slate-800 p-2 mt-2 rounded-2xl text-black dark:text-white"
        />
      </div>
      <div className="800px:w-[50%] w-[90%] mt-3 mx-auto flex flex-col">
        <label className="text-black dark:text-white font-Popins text-[20px]">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-200 dark:bg-slate-800 p-2 mt-2 rounded-2xl text-black dark:text-white"
        />
      </div>
      <div className="800px:w-[50%] w-[90%] mt-3 mx-auto flex flex-col">
        <label className="text-black dark:text-white font-Popins text-[20px]">
          BirthDay
        </label>
        <input
          type="date"
          value={birthDay.slice(0, 10)}
          onChange={(e) => setBirthDay(e.target.value)}
          className="w-full bg-slate-200 dark:bg-slate-800 p-2 mt-2 rounded-2xl text-black dark:text-white"
        />
      </div>
      <input
        onClick={handleSubmit}
        type="submit"
        value="Update"
        className="px-7 py-4 bg-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-500 dark:bg-slate-800 rounded-2xl mt-9 cursor-pointer text-[20px] font-Josefin font-[600] text-white hover:px-12"
      />

      {showModal && modalImage && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          variants={zoomIn(0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg">
            <img
              alt=""
              src={modalImage}
              className="w-[200px] h-[200px] object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-1"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileInfo;

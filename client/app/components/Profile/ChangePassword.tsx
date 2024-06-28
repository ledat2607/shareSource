import { styles } from '@/app/style/styles';
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {motion} from "framer-motion"
import { fadeIn } from '../variant';
import toast from 'react-hot-toast';
type Props = {
  user: any;
};

const ChangePassword: React.FC<Props> = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmOld, setConfirmOld] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);
  const [confirmVis, setConfirmVis] = useState(false);
  const handleChangePassword = () => {
    toast.success("Update password successfull !");
  };

  return (
    <motion.div
      variants={fadeIn("left", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="w-full pt-10 flex flex-col items-center justify-center"
    >
      <div className="block text-[25px] 800px:text-[30px] font-Popins font-[600] text-black dark:text-white">
        Change password
      </div>
      <div className="w-full">
        <form
          aria-required
          onSubmit={handleChangePassword}
          className="flex flex-col items-center"
        >
          <div className="w-[95%] relative 800px:w-[80%] mt-5">
            <label className="block pb-2 dark:text-white text-black font-Josefin text-[15px] 800px:text-[18px]">
              Enter your old password
            </label>
            <input
              value={oldPassword}
              type={confirmOld ? "text" : "password"}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-gray-300 dark:bg-gray-800 rounded-2xl text-black dark:text-white"
              placeholder="Enter your old password..."
            />
            {confirmOld ? (
              <AiOutlineEye
                size={25}
                className="cursor-pointer absolute bottom-3 right-6"
                onClick={() => setConfirmOld(!confirmOld)}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                className="cursor-pointer absolute bottom-3 right-6"
                onClick={() => setConfirmOld(!confirmOld)}
              />
            )}
          </div>
          <div className="w-[95%] relative 800px:w-[80%] mt-5">
            <label className="block pb-2 dark:text-white text-black font-Josefin text-[15px] 800px:text-[18px]">
              Enter your new password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={confirmNew ? "text" : "password"}
              className="w-full mt-2 px-4 py-3 bg-gray-300 dark:bg-gray-800 rounded-2xl text-black dark:text-white"
              placeholder="Enter your new password..."
            />
            {confirmNew ? (
              <AiOutlineEye
                size={25}
                className="cursor-pointer absolute bottom-3 right-6"
                onClick={() => setConfirmNew(!confirmNew)}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                className="cursor-pointer absolute bottom-3 right-6"
                onClick={() => setConfirmNew(!confirmNew)}
              />
            )}
          </div>
          <div className="w-[95%] relative 800px:w-[80%] mt-5">
            <label className="block pb-2 dark:text-white text-black font-Josefin text-[15px] 800px:text-[18px]">
              Enter your confirm new password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={confirmVis ? "text" : "password"}
              className="w-full mt-2 px-4 py-3 bg-gray-300 dark:bg-gray-800 rounded-2xl text-black dark:text-white"
              placeholder="Enter your confirm new password..."
            />
            {confirmVis ? (
              <AiOutlineEye
                size={25}
                className="cursor-pointer absolute bottom-3 right-6"
                onClick={() => setConfirmVis(!confirmVis)}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                className="cursor-pointer absolute bottom-3 right-6"
                onClick={() => setConfirmVis(!confirmVis)}
              />
            )}
          </div>
          <input
            type="submit"
            value="Update password"
            className="px-4 py-3 rounded-2xl bg-gray-300 dark:bg-slate-800 text-[18px] dark:text-white hover:dark:text-green-500 hover:dark:bg-slate-700 hover:text-white hover:px-8 transition-all duration-500 font-Josefin font-[600] mt-4 hover:cursor-pointer hover:bg-blue-500"
          />
        </form>
      </div>
    </motion.div>
  );
};

export default ChangePassword;
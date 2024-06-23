import React, { FC, useEffect, useRef, useState } from 'react'
import { BsArrowBarLeft } from 'react-icons/bs';
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoReloadOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';


type Props = {
  setRoute: (route: string) => void;
};
type VerifiNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};



const Verifycation: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Active account successfull !");
      setRoute("Login");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log(`An error occured`, error);
      }
    }
  }, [isSuccess, error]);

  const [invalidError, setInvalidError] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifiNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  ///input varify code
  const handleChangeInput = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyCode = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyCode);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  //confirm verify code
  const handleConfirm = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_code: verificationNumber, // Đúng tên biến là activation_code
      activation_token: token,
    });

    console.log(verificationNumber);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center-center">
      <h1 className="text-center text-[25px] font-[600] font-Josefin text-black dark:text-white">
        Verifycation
      </h1>
      <div className="mt-5 w-[80px] h-[80px] rounded-full bg-blue-500 flex items-center justify-center">
        <VscWorkspaceTrusted size={40} />
      </div>
      <div className="w-[100%] m-auto mt-5 flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`w-[55px] h-[55px] rounded-2xl bg-transparent border-2 text-black dark:text-white text-center font-Josefin text-[20px] font-[700] ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            }`}
            placeholder=""
            minLength={1}
            value={verifyNumber[key as keyof VerifiNumber]}
            onChange={(e) => handleChangeInput(index, e.target.value)}
          />
        ))}
        <div className="w-[30px] cursor-pointer hover:text-white hover:dark:text-black hover:dark:bg-white transition-all duration-300 flex items-center justify-center rounded-full h-[30px] bg-blue-400">
          <IoReloadOutline title="Resend verify code" />
        </div>
      </div>
      <div className="mt-5 w-full flex items-center justify-between">
        <div className="px-3 py-3 bg-blue-300 hover:bg-blue-500 text-black dark:text-white cursor-pointer transition-all duration-300 rounded-full">
          <BsArrowBarLeft size={20} onClick={() => setRoute("Sign-up")} />
        </div>

        <div
          onClick={handleConfirm}
          className="px-3 py-3 bg-blue-400 text-black dark:text-white dark:hover:bg-gray-300 hover:dark:text-gray-600 dark:bg-gray-900 rounded-2xl cursor-pointer hover:translate-x-3 transition-all duration-500 text-[15px] font-Popins font-[600]"
        >
          Confrim
        </div>
      </div>
    </div>
  );
};

export default Verifycation;
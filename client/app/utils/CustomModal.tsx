import React, { FC } from 'react'
import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from '../components/variant';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};

const MotionBox = motion(Box);

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  activeItem,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MotionBox
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="absolute 800px:top-[5%] 800px:left-[40%] top-[4%] left-5 shadow-2xl -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-[90%] bg-gray-200 dark:bg-slate-800 rounded-xl p-4 outline-none"
      >
        <Component setOpen={setOpen} setRoute={setRoute} />
      </MotionBox>
    </Modal>
  );
};

export default CustomModal;

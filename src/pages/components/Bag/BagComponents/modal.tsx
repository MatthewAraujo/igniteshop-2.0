import { motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import Bag from "./bag";
const dropIn = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 50,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
  },
};

export const Modal = ({ handleClose }) => (
  <Backdrop onClick={handleClose}>
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="flex h-[100vh] w-[400px] flex-col items-center justify-start  bg-gray800"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Bag />
    </motion.div>
  </Backdrop>
);

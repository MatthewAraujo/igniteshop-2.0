import { motion } from "framer-motion";
export const Backdrop = ({ children, onClick }) => (
  <motion.div
    className="absolute right-0 top-0 flex h-full w-full items-end justify-end bg-[#000000e1]"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

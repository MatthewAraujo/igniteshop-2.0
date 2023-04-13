import { motion } from "framer-motion";

export const Layout = ({ children }) => (
  <motion.div
    initial={{ x: 1000, opacity: 0 }}
    animate={{ x: 400, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

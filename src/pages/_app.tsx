import "@/styles/globals.css";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Modal } from "./components/Bag/BagComponents/modal";
import { CartContextProvider } from "@/contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
    console.log("open");
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <CartContextProvider>
      <div className="flex min-h-screen flex-col items-start justify-center">
        <header className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-8">
          <Link href="/">
            <Image width={130} height={52} src="/logo.svg" alt="logo" />
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative box-border cursor-pointer  rounded-md bg-gray800 p-2"
            onClick={isModalOpen ? handleCloseModal : handleOpenModal}
          >
            <ShoppingCartSimple size={32} color="#8D8D99" />
          </motion.button>
        </header>
        <AnimatePresence mode="wait" initial={true} onExitComplete={() => null}>
          <Component {...pageProps} />
          {isModalOpen && <Modal handleClose={handleCloseModal} />}
        </AnimatePresence>
      </div>
    </CartContextProvider>
  );
}

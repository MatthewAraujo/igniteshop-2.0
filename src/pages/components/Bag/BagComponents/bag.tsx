import { useCart } from "@/hooks/useCart";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Bag() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const quantity = cartItems.length;
  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl: checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-4 pb-8 pl-8 pr-8 pt-12">
      <h1 className="mb-4 text-2xl font-bold">Sacola de Compras</h1>
      {quantity <= 0 ? (
        <div className="flex w-full  flex-col items-center justify-center ">
          <p className="text-gray300">Sua sacola está vazia</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="flex gap-6" key={item.id}>
              <div className="h-[90px] w-[90px]  rounded-lg bg-gradient-to-r from-[#1ea483] to-[#7465d4]">
                <Image
                  src={item.imageUrl}
                  alt="logo"
                  width={520}
                  height={480}
                />
              </div>
              <div className="flex flex-col justify-center gap-1 ">
                <p className="text-gray300">{item.name}</p>
                <strong>{item.price}</strong>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-4 text-green300"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="mt-auto ">
        <div className="mb-2 flex justify-between">
          <p className="text-gray300">Quantidade</p>
          <strong className="text-gray300">{quantity} itens</strong>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-gray100">Valor total</p>
          <strong>{formattedCartTotal}</strong>
        </div>

        <button
          onClick={handleCheckout}
          disabled={quantity <= 0 || isCreatingCheckoutSession}
          className=" mt-8 w-full rounded-lg bg-green500 p-5 font-bold text-white hover:bg-green300 hover:transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Bag() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-4 pb-8 pl-8 pr-8 pt-12">
      <h1 className="mb-4 text-2xl font-bold">Sacola de Compras</h1>
      <div className="flex gap-6">
        <div className="h-[90px] w-[90px]  rounded-lg bg-gradient-to-r from-[#1ea483] to-[#7465d4]">
          <Image src="/1.png" alt="logo" width={520} height={480} />
        </div>
        <div className="flex flex-col justify-center gap-1 ">
          <p className="text-gray300">Camiseta Betond The Limits</p>
          <strong>R$ 79,90</strong>
          <button className="w-4 text-green300">Remover</button>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="h-[90px] w-[90px]  rounded-lg bg-gradient-to-r from-[#1ea483] to-[#7465d4]">
          <Image src="/1.png" alt="logo" width={520} height={480} />
        </div>
        <div className="flex flex-col justify-center gap-1 ">
          <p className="text-gray300">Camiseta Betond The Limits</p>
          <strong>R$ 79,90</strong>
          <button className="w-4 text-green300">Remover</button>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="h-[90px] w-[90px]  rounded-lg bg-gradient-to-r from-[#1ea483] to-[#7465d4]">
          <Image src="/1.png" alt="logo" width={520} height={480} />
        </div>
        <div className="flex flex-col justify-center gap-1 ">
          <p className="text-gray300">Camiseta Betond The Limits</p>
          <strong>R$ 79,90</strong>
          <button className="w-4 text-green300">Remover</button>
        </div>
      </div>
      <div className="mt-auto ">
        <div className="mb-2 flex justify-between">
          <p className="text-gray300">Quantidade</p>
          <strong className="text-gray300">3 itens</strong>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-gray100">Valor total</p>
          <strong>R$ 0,00</strong>
        </div>

        <button className=" mt-8 w-full rounded-lg bg-green500 p-5 font-bold text-white hover:bg-green300 hover:transition-all disabled:cursor-not-allowed disabled:opacity-50">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

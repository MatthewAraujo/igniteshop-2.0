import { stripe } from "@/lib/stripe";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { Layout } from "../../lib/layout";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <Layout>
        <main
          key={product.id}
          className="mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16 "
        >
          <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient-to-r from-[#1ea483] to-[#7465d4] p-1">
            <Image
              src={product.imageUrl}
              alt="logo"
              width={520}
              height={480}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl text-gray300">{product.name}</h1>
            <span className="my-4 block text-3xl text-green300">
              {product.price}
            </span>
            <p className="my-10 text-xl leading-relaxed text-gray300">
              {product.description}
            </p>
            <button
              onClick={handleBuyProduct}
              disabled={isCreatingCheckoutSession}
              className="my-auto rounded-lg bg-green500 p-5 font-bold text-white hover:bg-green300 hover:transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              Colocar na sacola
            </button>
          </div>
        </main>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_NeVVTRXEgROhfE" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};

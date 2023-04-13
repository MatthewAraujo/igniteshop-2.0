import Image from "next/image";
import Link from "next/link";

import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { ShoppingBag } from "@phosphor-icons/react";
import Head from "next/head";
import { WheelControls } from "../lib/sliderKeen";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  WheelControls;

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 2.5,
        spacing: 48,
      },
      loop: false,
      rubberband: false,
      vertical: false,
    },
    [WheelControls]
  );

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <div
        ref={sliderRef}
        className="keen-slider ml-auto flex min-h-[656px] w-full max-w-[calc(100vw-((100vw-1180px)/2))]"
      >
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="keen-slider__slide group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#1ea483] to-[#7465d4]"
            >
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image
                  src={product.imageUrl}
                  alt="logo"
                  width={520}
                  height={480}
                  className="object-cover"
                />
              </Link>

              <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-lg bg-[rgba(0,0,0,0.6)] p-8 opacity-100 transition delay-75 ease-out group-hover:translate-y-[0%]">
                <div>
                  <strong className="block text-lg">{product.name}</strong>
                  <span className="text-xl font-bold text-green300">
                    {product.price}
                  </span>
                </div>
                <div>
                  <button className=" rounded-md bg-green300 p-2 text-white">
                    <ShoppingBag size={32} />
                  </button>
                </div>
              </footer>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

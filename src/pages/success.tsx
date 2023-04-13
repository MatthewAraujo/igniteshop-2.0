import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}
export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="mx-auto flex h-[656px] flex-col items-center justify-center text-center">
        <div className="flex h-[140px] w-full max-w-[140px] items-center justify-center rounded-full bg-gradient-to-r  from-[#1ea483] to-[#7465d4] p-1">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={120}
            height={110}
            className="object-cover "
          />
        </div>
        <h1 className="text-3xl text-gray100">Compra Efetuada</h1>
        <p className="my-8 max-w-[560px] text-2xl text-gray300 ">
          Uhuul <strong>{customerName}</strong> sua compra foi efetuada com
          sucesso
        </p>
        <Link
          href="/"
          className="my-16 block text-2xl font-bold text-green500 hover:text-green300"
        >
          Voltar ao catálogo
        </Link>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};

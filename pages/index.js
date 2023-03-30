import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};
export default Home;

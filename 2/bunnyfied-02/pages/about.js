import Head from "next/head";
import About from "../components/home/About";

export default function about() {
  return (
    <>
      <Head>
        <title>Bunnyfied Labs</title>
      </Head>
      <About />
    </>
  );
}

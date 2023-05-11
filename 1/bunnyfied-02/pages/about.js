import Head from "next/head";
import About from "../components/About";

export default function about() {
  const name = "DONTKILLME";
  return (
    <>
      <Head>
        <title>Bunnyfied Labs</title>
      </Head>
      <About name={name} description="Blockchain Developer" />
    </>
  );
}

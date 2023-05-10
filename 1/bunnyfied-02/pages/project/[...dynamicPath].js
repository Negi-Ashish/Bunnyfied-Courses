import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router.query.dynamicPath);
  return (
    <>
      <Head>
        <title>Bunnyfied Labs</title>
      </Head>
      <main>
        <h1> We are inside the Project Folder.</h1>

        <h1>{router.query.dynamicPath}</h1>
      </main>
    </>
  );
}

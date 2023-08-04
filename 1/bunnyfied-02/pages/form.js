import Head from "next/head";
import Form from "../components/Form.js";
import ChakraForm from "../components/ChakraUIForm.js";

export default function form() {
  return (
    <>
      <Head>
        <title>Bunnyfied Labs</title>
      </Head>
      {/* <Form /> */}
      <ChakraForm />
    </>
  );
}

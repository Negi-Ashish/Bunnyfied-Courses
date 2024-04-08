import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Navbar } from "../components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <Flex direction="column" flex="1">
        <Head>
          <title>Bunnyfied Labs</title>
        </Head>
        <Navbar />
        <Main />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

import React, { useState } from "react";
import CardComponent from "../components/CardComponent";
import EcommerceComponent from "../components/EcommerceComponent";
import HorizontalCard from "../components/HorizontalCard";
import PostUIComponent from "../components/PostUIComponent";
import { ChakraProvider, Button, extendTheme } from "@chakra-ui/react";

const cards = () => {
  const [cardState, setCardState] = useState(1);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "orange.400", // replace with the desired background color
          margin: 10,
        },
      },
    },
  });

  function handelCard() {
    setCardState(cardState + 1);
    if (cardState > 4) {
      setCardState(2);
    }
  }

  console.log("cardState", cardState);

  return (
    <ChakraProvider theme={theme}>
      {(cardState == 1 || cardState > 4) && <CardComponent />}
      {cardState == 2 && <EcommerceComponent />}
      {cardState == 3 && <HorizontalCard />}
      {cardState == 4 && <PostUIComponent />}
      <Button
        style={{
          marginLeft: "35%",
          marginTop: "5px",
        }}
        onClick={handelCard}
      >
        NEXT
      </Button>
    </ChakraProvider>
  );
};

export default cards;

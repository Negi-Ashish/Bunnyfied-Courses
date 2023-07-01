import React, { useState } from "react";
import RadioCard from "../components/RadioCard";
import { Box } from "@chakra-ui/react";

export default function radioButton() {
  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  return (
    <Box as="container" display="grid" justifyContent="center" marginTop={200}>
      <RadioCard setRadioValue={handleRadioChange} />
      <Box
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        marginTop="10px"
        display="inline-block"
      >
        Selected Value: {radioValue}
      </Box>
    </Box>
  );
}

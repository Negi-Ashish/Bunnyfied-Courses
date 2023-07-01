import {
  Box,
  useRadio,
  useRadioGroup,
  HStack,
  ChakraProvider,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function RadioCard({ setRadioValue }) {
  const options = ["BUNNYFIED", "LABS", "PVT LTD"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "BUNNYFIED",
    onChange: handleRadio,
  });

  const group = getRootProps();

  useEffect(() => {
    if (setRadioValue) {
      setRadioValue("BUNNYFIED");
    }
  }, []);

  function handleRadio(value) {
    setRadioValue(value);
  }

  return (
    <ChakraProvider>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          const { getInputProps, getCheckboxProps } = useRadio(radio);

          const inputProps = getInputProps();
          const checkboxProps = getCheckboxProps();

          return (
            <Box as="label" key={value}>
              <input {...inputProps} />
              <Box
                {...checkboxProps}
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
              >
                {value}
              </Box>
            </Box>
          );
        })}
      </HStack>
    </ChakraProvider>
  );
}

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  RadioGroup,
  HStack,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ChakraProvider,
  Select,
  Box,
  Button,
  extendTheme,
} from "@chakra-ui/react";

import { useState } from "react";

const ChakraForm = () => {
  const [values, setValues] = useState({
    email: "",
    favoriteCharacter: "",
    firstName: "",
    country: "",
    amount: 20,
  });

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

  const handleChange = (e) => {
    const { firstName, value } = e.target;
    setValues({
      ...values,
      [firstName]: value,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <FormControl>
        <Box as="hr" height={1} bg={"red"} mt={5} mb={5} />
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={values.email} onChange={handleChange} />
        <FormHelperText>We'll never share your email.</FormHelperText>

        <Box as="hr" height={1} bg={"red"} mt={5} mb={5} />

        <FormLabel as="legend">Favorite Naruto Character</FormLabel>
        <RadioGroup defaultValue={values.favoriteCharacter}>
          <HStack spacing="24px">
            <Radio value="Sasuke">Sasuke</Radio>
            <Radio value="Nagato">Nagato</Radio>
            <Radio value="Itachi">Itachi</Radio>
            <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
          </HStack>
        </RadioGroup>
        <FormHelperText>Select only if you're a fan.</FormHelperText>

        <Box as="hr" height={1} bg={"red"} mt={5} mb={5} />

        <FormLabel>First name</FormLabel>
        <Input
          placeholder="First name"
          value={values.firstName}
          onChange={handleChange}
        />

        <Box as="hr" height={1} bg={"red"} mt={5} mb={5} />

        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select country"
          value={values.country}
          onChange={handleChange}
        >
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>

        <Box as="hr" height={1} bg={"red"} mt={5} mb={5} />

        <FormLabel>Amount</FormLabel>
        <NumberInput
          max={50}
          min={10}
          value={values.amount}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Box as="hr" height={1} bg={"red"} mt={5} mb={5} />

        <Button type="submit">Submit</Button>
      </FormControl>
    </ChakraProvider>
  );
};

export default ChakraForm;

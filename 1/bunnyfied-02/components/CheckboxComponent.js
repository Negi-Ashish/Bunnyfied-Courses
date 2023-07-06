import {
  Checkbox,
  CheckboxGroup,
  Stack,
  ChakraProvider,
  extendTheme,
  Box,
} from "@chakra-ui/react";

const CheckboxComponent = () => {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "red.400", // replace with the desired background color
          margin: 10,
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Checkbox defaultChecked>Checkbox</Checkbox>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack spacing={5} direction="row">
        <Checkbox isDisabled>isDisabled</Checkbox>
        <Checkbox isDisabled defaultChecked>
          isDisabled
        </Checkbox>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack spacing={5} direction="row">
        <Checkbox colorScheme="red" defaultChecked>
          Red
        </Checkbox>
        <Checkbox colorScheme="green" defaultChecked>
          Green
        </Checkbox>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        <Checkbox size="sm" colorScheme="red">
          Checkbox-sm
        </Checkbox>
        <Checkbox size="md" colorScheme="green" defaultChecked>
          Checkbox-md
        </Checkbox>
        <Checkbox size="lg" colorScheme="orange" defaultChecked>
          Checkbox-lg
        </Checkbox>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Checkbox isInvalid>isInvalid</Checkbox>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Checkbox spacing="1rem">1rem Space</Checkbox>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Checkbox iconColor="red.400" iconSize="1rem">
        iconColor
      </Checkbox>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          <Checkbox value="naruto">Naruto</Checkbox>
          <Checkbox value="sasuke">Sasuke</Checkbox>
          <Checkbox value="kakashi">Kakashi</Checkbox>
        </Stack>
      </CheckboxGroup>
    </ChakraProvider>
  );
};

export default CheckboxComponent;

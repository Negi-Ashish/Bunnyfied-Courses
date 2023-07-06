import {
  Button,
  Stack,
  Box,
  Wrap,
  WrapItem,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { MdBuild, MdCall } from "react-icons/md";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

const ChakraUIButtonComponent = () => {
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
  return (
    <ChakraProvider theme={theme}>
      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
          Button-xs
        </Button>
        <Button colorScheme="teal" size="sm">
          Button-sm
        </Button>
        <Button colorScheme="teal" size="md">
          Button-md
        </Button>
        <Button colorScheme="teal" size="lg">
          Button-lg
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" variant="solid">
          Solid
        </Button>
        <Button colorScheme="teal" variant="outline">
          Outline
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Ghost
        </Button>
        <Button colorScheme="teal" variant="link">
          Link
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Wrap spacing={4}>
        <WrapItem>
          <Button colorScheme="gray">Gray</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="red">Red</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange">Orange</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="yellow">Yellow</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="green">Green</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="teal">Teal</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="blue">Blue</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="cyan">Cyan</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="purple">Purple</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="pink">Pink</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="linkedin">Linkedin</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="facebook">Facebook</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="messenger">Messenger</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="whatsapp">Whatsapp</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="twitter">Twitter</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="telegram">Telegram</Button>
        </WrapItem>
      </Wrap>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack direction="row" spacing={4}>
        <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
          Email
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
        >
          Call us
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack direction="row" spacing={4}>
        <Button leftIcon={<MdBuild />} colorScheme="pink" variant="solid">
          Settings
        </Button>
        <Button rightIcon={<MdCall />} colorScheme="blue" variant="outline">
          Call us
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack direction="row" spacing={4}>
        <Button isLoading colorScheme="teal" variant="solid">
          Email
        </Button>
        <Button
          isLoading
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
        >
          Submit
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Button
        isLoading
        colorScheme="blue"
        spinner={<BeatLoader size={8} color="white" />}
      >
        Click me
      </Button>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack direction="row" spacing={4} align="center">
        <Button
          isLoading
          loadingText="Loading"
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="start"
        >
          Submit
        </Button>
        <Button
          isLoading
          loadingText="Loading"
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="end"
        >
          Continue
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
          Twitter
        </Button>
      </Stack>

      <Box as="hr" bg={"red"} mt={5} mb={5} />

      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="green.500"
      >
        Button
      </Button>
    </ChakraProvider>
  );
};

export default ChakraUIButtonComponent;

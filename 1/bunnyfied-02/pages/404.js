import { Box, Heading, Text, Image, ChakraProvider } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bg="#07183b"
        color="#FFFFFF"
        fontFamily="Arial, sans-serif"
        textAlign="center"
        flexDirection="column"
      >
        <Image src="/img/5.png" alt="404 Image" mb={8} />
        <Box>
          <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
            Oops! Page Not Found
          </Heading>
          <Text fontSize="lg" fontWeight="medium" mb={6}>
            We're sorry, but the page you're looking for doesn't exist.
          </Text>
          <Text fontSize="sm">
            Please check the URL or go back to the{" "}
            <Box as="a" href="/" color="#FFFFFF" textDecoration="underline">
              homepage
            </Box>
            .
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default NotFoundPage;

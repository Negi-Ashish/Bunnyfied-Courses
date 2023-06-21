import { Box, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const { statusCode } = router.query;

  return (
    <ChakraProvider>
      <Box
        p={8}
        textAlign="center"
        bg="orange"
        boxShadow="md"
        borderRadius="md"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" size="xl" mb={4} fontWeight="bold" color="red.500">
          {statusCode ? `An error ${statusCode} occurred` : "An error occurred"}
        </Heading>
        <Text fontSize="lg" mb={6}>
          We apologize for the inconvenience. Please try again later.
        </Text>
        <Text fontSize="sm">
          If you require further assistance, please contact our support team at{" "}
          <Box as="a" href="mailto:support@example.com" color="blue.500">
            info@bunnyfiedlabs.com
          </Box>
          .
        </Text>
      </Box>
    </ChakraProvider>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;

import {
  Stack,
  Alert,
  AlertIcon,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

function AlertsComponent() {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "yellow.200", // replace with the desired background color
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Stack spacing={3}>
        <Alert status="error">
          <AlertIcon />
          There was an error.
        </Alert>

        <Alert status="success">
          <AlertIcon />
          Data uploaded Success!
        </Alert>

        <Alert status="warning">
          <AlertIcon />
          Are you of the legal age?
        </Alert>

        <Alert status="info">
          <AlertIcon />
          Bunnyfiedlabs internship program is live!
        </Alert>

        <Alert status="success" variant="subtle">
          <AlertIcon />
          You are successfully enrolled.
        </Alert>

        <Alert status="success" variant="solid">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>

        <Alert status="error" variant="left-accent">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>

        <Alert status="error" variant="top-accent">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      </Stack>
    </ChakraProvider>
  );
}

export default AlertsComponent;

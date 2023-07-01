import {
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
function AlertComponent() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  return isVisible ? (
    <ChakraProvider>
      <Alert status="success">
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Congratulations on acquiring the knowledge to create a personalized
            alert by integrating various components successfully.
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    </ChakraProvider>
  ) : (
    <ChakraProvider>
      <Button onClick={onOpen}>Display Alert</Button>
    </ChakraProvider>
  );
}

export default AlertComponent;

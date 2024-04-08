import { Container, Flex, Box } from "@chakra-ui/react";
import { PositionHolder } from "./PositionHolder";

export const Main = (props) => {
  return (
    <Box as="main" role="main" direction="column" flex="1" {...props}>
      <Container>
        <PositionHolder minH="2xl" bg="darkorange">
          Bunnyfied Labs: Here we will design the Main Body of the website.
        </PositionHolder>
      </Container>
    </Box>
  );
};

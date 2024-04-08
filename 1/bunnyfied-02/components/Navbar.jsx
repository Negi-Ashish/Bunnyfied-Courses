import { Box, Container } from "@chakra-ui/react";
import { PositionHolder } from "./PositionHolder";

export const Navbar = () => {
  return (
    <Box as="nav" role="navigation" bg="orange">
      <Container>
        <PositionHolder minH="20">
          Bunnyfied Labs: Here we will design the Navbar
        </PositionHolder>
      </Container>
    </Box>
  );
};

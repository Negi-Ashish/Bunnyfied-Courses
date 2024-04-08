import { Box, Container } from "@chakra-ui/react";
import { PositionHolder } from "./PositionHolder";

export const Footer = (props) => {
  return (
    <Box as="footer" role="contentinfo" bg="yellow" {...props}>
      <Container>
        <PositionHolder minH="20">
          Bunnyfied Labs: Here we will design the Footer of the company.
        </PositionHolder>
      </Container>
    </Box>
  );
};

import { Box } from "@chakra-ui/react";

export const PositionHolder = (props) => {
  return (
    <Box
      role="presentation"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      {...props}
    />
  );
};

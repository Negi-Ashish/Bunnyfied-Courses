import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  Text,
  StackDivider,
} from "@chakra-ui/react";

const CardComponent = () => {
  return (
    <Card
      style={{
        backgroundColor: "grey",
        marginTop: "10%",
        marginLeft: "35%",
        maxWidth: "500px",
      }}
    >
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              BUNNYFIEDLABS
            </Heading>
            <Text pt="2" fontSize="sm">
              WE are a web3 based startup looking to excel in blockchain
              technology
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              CEO
            </Heading>
            <Text pt="2" fontSize="sm">
              Ashish Negi is the current CEO of Bunnyfied Labs.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              News
            </Heading>
            <Text pt="2" fontSize="sm">
              BUNNYFIEDLABS Certification and Internship program are in progress
              to take part click on the below link to register.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardComponent;

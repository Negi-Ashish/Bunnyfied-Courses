import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const HorizontalCard = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      style={{
        backgroundColor: "grey",
        marginTop: "10%",
        marginLeft: "35%",
        maxWidth: "500px",
      }}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="/img/thumbnail_ErrorHandeling_3.png"
        alt="HorizontalCard"
      />

      <Stack>
        <CardBody>
          <Heading size="md">Bunnyfied Labs</Heading>

          <Text py="2">
            We will be creating a Social Media Management System once you
            complete the certification program.
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default HorizontalCard;

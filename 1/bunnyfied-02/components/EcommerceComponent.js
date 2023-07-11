import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const EcommerceComponent = () => {
  return (
    <Card
      style={{
        backgroundColor: "grey",
        marginTop: "10%",
        marginLeft: "35%",
      }}
      maxW="sm"
    >
      <CardBody>
        <Image
          src="/img/thumbnail_dropdown.png"
          alt="trial image"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">BunnyfiedLabs Laptops</Heading>
          <Text>
            I am not selling Laptops, I am just here as part of Ashish Negi's
            Journey of becoming a successful Entrepreneur
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $10000000
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default EcommerceComponent;

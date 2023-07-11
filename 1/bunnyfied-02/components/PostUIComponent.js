import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Image,
  Flex,
  Avatar,
  Heading,
  IconButton,
  Box,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
// import pine from "../public/img/pine.png";
const PostUIComponent = () => {
  return (
    <Card
      maxW="md"
      style={{
        backgroundColor: "grey",
        marginTop: "10%",
        marginLeft: "35%",
      }}
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src={"/img/pine.png"} />

            <Box>
              <Heading size="sm">Ashish Negi</Heading>
              <Text>CEO Bunnyfied Labs</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to to just teach my friends how we can make a
          instagram like post UI using the exisitng card component.
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src="/img/thumbnail_Alert_1.png"
        alt="Chakra UI"
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostUIComponent;
